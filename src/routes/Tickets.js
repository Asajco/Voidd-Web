import { collection, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { ticketEventInfoConverter } from "../utils/firebase-converters";
import Spinner from "../components/Spinner";
import TicketCard from "../components/TicketCard";
import { firestore } from "../firebase";
import useAuth from "../store/auth-context";
import styles from "./Tickets.module.css";



const Tickets = () => {
  const [tickets, setTickets] = useState(null);
  const authCtx = useAuth();
  const { state } = useLocation();
  const {
    userData: { uid: userId },
  } = authCtx;

  useEffect(() => {
      var boughtTicket = document.getElementById("bought-ticket");
      if (boughtTicket) {
        window.scrollTo({ top: boughtTicket.offsetTop - 65});
        boughtTicket.classList.add(styles["highlighted-ticket"])
      }
  
    },[tickets])

  useEffect(() => {
    const getTickets = async () => {
      const querySnapshot = await getDocs(
        collection(firestore, `users/${userId}/tickets`)
      );

      const tickets = await Promise.all(
        querySnapshot.docs.map(async (document) => {
          const ticketData = document.data();
          const relatedEvent = (
            await getDoc(
              ticketData.event.withConverter(ticketEventInfoConverter)
            )
          ).data();

          ticketData.event = relatedEvent;
          ticketData.id = document.id
          return ticketData;
        })
      );

      tickets.sort((ticketX, ticketY) => {
        const currentDate = Date.now();
        return  Math.abs(currentDate - ticketX.event.date) - Math.abs(currentDate - ticketY.event.date);
      });

      const ticketsJSX = tickets.map((ticketData, index) => {
        return (
          <li {...  (state?.ticketId === ticketData.id) ? { id : "bought-ticket"} : {}} key={index}>
            <TicketCard
              relatedEvent={ticketData.event}
              qrCode={ticketData.qrCode}
              valid={ticketData.valid}
            />
          </li>
        );
      });

      setTickets(ticketsJSX);
    };

    getTickets();
  }, [userId, state]);

  return tickets === null ? (
    <Spinner />
  ) : (
    <div className={styles["tickets-container"]}>
      <ul>{tickets}</ul>
    </div>
  );
};

export default Tickets;
