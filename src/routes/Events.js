import React, { useContext } from "react";
import Spinner from "../components/Spinner";
import EventContext from "../store/event-context";
import styles from "./Events.module.css";

const Events = () => {
  const { events, filteredEvents, setFilteredEvents, setModalEvent } =
    useContext(EventContext);

  return events === null ? (
    <Spinner />
  ) : (
    <div className={styles["events-wrapper"]}>
      {filteredEvents !== null && (
        <button
          type="button"
          onClick={() => setFilteredEvents(null)}
          className={styles["events-button"]}
        >
          Remove filter
        </button>
      )}
      <div className={styles["event-card-container"]}>
        {(filteredEvents !== null ? filteredEvents : events).map(
          (event, index) => {
            return (
              <div
                className={styles["event-card"]}
                key={index}
                onClick={() => setModalEvent(event)}
              >
                <img
                  src={event.poster}
                  alt=""
                  className={styles["event-image"]}
                />
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Events;
