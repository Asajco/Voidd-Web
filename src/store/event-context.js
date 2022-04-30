import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { doc, runTransaction, getDocs, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firestore, storage } from "../firebase";
import { eventConverter } from "../utils/firebase-converters";
import { useNavigate } from "react-router-dom";

import useAuth from "./auth-context";

const EventContext = React.createContext();

export const EventContextProvider = (props) => {
  const [events, setEvents] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState(null);
  const [modalEvent, setModalEvent] = useState(null);
  const [processingTicket, setProcessingTicket] = useState(false);
  const authCtx = useAuth();
  const navigate = useNavigate();

  const getEvents = async () => {
    const querySnapshot = await getDocs(
      collection(firestore, "events").withConverter(eventConverter)
    );

    setEvents(
      querySnapshot.docs.map((document) => {
        return document.data();
      })
    );
  };

  useEffect(() => {
    getEvents();
  }, []);

  const ticketBuyHandler = async (eventReference) => {
    
    if(authCtx.isLoggedIn === false) {
      navigate("/signin");
      return 
    }
    
    setProcessingTicket(true);
    
    const ticketId = uuid();
    navigate("/tickets", { state: { ticketId: ticketId } });

    const userId = authCtx.userData.uid;
    const requestURL = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${userId}%2B${ticketId}`;

    const reponse = await fetch(requestURL);
    const qrCodeblob = await reponse.blob();

    const storageReference = ref(storage, `/qrCodes/${ticketId}.png`);
    const result = await uploadBytes(storageReference, qrCodeblob);
    const qrCodeUrl = await getDownloadURL(result.ref);

    try {
      await runTransaction(firestore, async (transaction) => {
        const eventData = (await transaction.get(eventReference)).data();

        if (eventData.remainingTickets > 0) {
          transaction.set(doc(firestore, `users/${userId}/tickets`, ticketId), {
            event: eventReference,
            qrCode: qrCodeUrl,
            valid: true,
          });

          transaction.update(eventReference, {
            remainingTickets: eventData.remainingTickets - 1,
          });
        } else {
          return Promise.reject("Ticket is no longer available!");
        }
      });
    } catch (error) {
      //handle error
    } finally {
      setProcessingTicket(false);
      //reload events 
      getEvents();
    }
  };

  return (
    <EventContext.Provider
      value={{
        events: events,
        filteredEvents: filteredEvents,
        setFilteredEvents: setFilteredEvents,
        modalEvent: modalEvent,
        setModalEvent: setModalEvent,
        onTicketBuy: ticketBuyHandler,
        processingTicket : processingTicket,
        reloadEvents: getEvents,
      }}
    >
      {props.children}
    </EventContext.Provider>
  );
};

export default EventContext;
