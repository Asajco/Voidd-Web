import React, { Fragment, useEffect, useRef, useState } from "react";

import Event from "./Event";
import styles from "./EventList.module.css";
import leftArrow from "../../assets/images/left-arrow.svg";
import rightArrow from "../../assets/images/right-arrow.svg";

const EventList = (props) => {
  const eventListRef = useRef();
  const firstRender = useRef(true);
  const [eventCardWidth, setEventCardWidth] = useState();
  const [eventCardIndex, setEventCardIndex] = useState(0);

  const GetEventCardWidth = () =>
    eventListRef.current.children[0].getBoundingClientRect().width;

  useEffect(() => {
    const eventCards = Array.from(eventListRef.current.children);

    const updateEventCardWith = () => {
      setEventCardWidth(GetEventCardWidth);
    };

    if (firstRender.current === true) {
      updateEventCardWith();
      firstRender.current = false;
    }

    eventCards.forEach((eventCard, index) => {
      eventCard.style.left = index * eventCardWidth + "px";
    });

    eventListRef.current.style.transition = "transform 0ms";
    eventListRef.current.style.transform =
      "translateX(-" + eventCardWidth * eventCardIndex + "px)";

    window.addEventListener("resize", updateEventCardWith);

    return () => window.removeEventListener("resize", updateEventCardWith);
  }, [eventCardWidth]);

  useEffect(() => {
    const eventCardWidth = GetEventCardWidth();
    const shift = eventCardIndex * eventCardWidth;
    eventListRef.current.style.transition = null;
    eventListRef.current.style.transform = "translateX(-" + shift + "px)";
  }, [eventCardIndex]);

  const events = props.events.map((event, index) => {
    return (
      <li key={index}>
        <Event
          title={event.title}
          description={event.description}
          genre={event.genre}
          image={event.poster}
          price={event.price}
          remainingTickets={event.remainingTickets}
          location={event.location}
          date={event.date}
          capacity={event.capacity}
          eventRef ={event.ref}
        />
      </li>
    );
  });

  const SlideToPreviousEvent = () => {
    setEventCardIndex((currentIndex) => --currentIndex);
  };

  const SlideToNextEvent = () => {
    setEventCardIndex((currentIndex) => ++currentIndex);
  };

  return (
    <Fragment>
      <h2 className={styles.title}>{props.title}</h2>
      <div className={styles.events}>
        <button
          className={`${styles["btn-prev-event"]} ${
            eventCardIndex === 0 ? styles["btn-hidden"] : ""
          }`}
          onClick={SlideToPreviousEvent}
          type="button"
        >
          <img src={leftArrow} alt=""></img>
        </button>
        <div className={styles["event-container"]}>
          <ul ref={eventListRef}>{events}</ul>
        </div>
        <button
          className={`${styles["btn-next-event"]} ${
            eventCardIndex === events.length - 1 ? styles["btn-hidden"] : ""
          }`}
          onClick={SlideToNextEvent}
          type="button"
        >
          <img src={rightArrow} alt=""></img>
        </button>
      </div>
    </Fragment>
  );
};

export default EventList;
