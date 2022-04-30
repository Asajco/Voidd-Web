import React, { useRef, useEffect, useContext, Fragment } from "react";
import EventContext from "../../store/event-context";

import { formatDate } from "../../utils/firebase-converters";
import closeIcon from "../../assets/icons/close.svg";
import styles from "./EventModal.module.css";

const EventModal = () => {
  const modalRef = useRef();
  const { modalEvent, setModalEvent, onTicketBuy } = useContext(EventContext);

  const closeModal = () => {
    if (modalRef.current.hasAttribute("closing") === false) {
      modalRef.current.setAttribute("closing", "");
      modalRef.current.addEventListener(
        "animationend",
        () => {
          modalRef.current.removeAttribute("closing");
          modalRef.current.close();
          setModalEvent(null);
        },
        { once: true }
      );
    }
  };

  const checkForClosing = (event) => {
    if (event.target.nodeName === "DIALOG") {
      closeModal();
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeModal();
    }
  };

  useEffect(() => {
    if (modalEvent !== null) {
      modalRef.current.showModal();
    }
  }, [modalEvent]);

  return modalEvent !== null ? (
    <dialog
      onKeyDown={handleKeyPress}
      className={styles["modal"]}
      ref={modalRef}
      onClick={checkForClosing}
    >
      <div className={styles["modal-content"]}>
        <h2 className={styles["modal-title"]}>{modalEvent.title}</h2>
        <p className={styles["modal-description"]}>{modalEvent.description}</p>
        <div className={styles["modal-main-info"]}>
          <div className={styles["modal-poster-wrapper"]}>
            <img
              className={styles["modal-poster"]}
              src={modalEvent.poster}
              alt=""
            />
          </div>
          <div className={styles["modal-info"]}>
            <p className={styles.location}>{modalEvent.location}</p>
            <p className={styles.date}>{formatDate(modalEvent.date)}</p>
            <p className={styles.genre}>Genre: {modalEvent.genre}</p>
            <p className={styles.price}>Price: {modalEvent.price + "€"}</p>
            <p
              className={
                modalEvent.remainingTickets > 0 ? styles["sold-out"] : ""
              }
            >
              {modalEvent.remainingTickets > 0
                ? `Tickets left: ${modalEvent.remainingTickets}`
                : "Sold out!"}
            </p>
            <div className={styles["modal-buy-ticket"]}>
              {modalEvent.remainingTickets > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    onTicketBuy(modalEvent.ref);
                    setModalEvent(null);
                  }}
                >
                  Buy ticket
                </button>
              )}
            </div>
          </div>
        </div>
        <button
          className={styles["close-button"]}
          type="button"
          onClick={closeModal}
        >
          <img src={closeIcon} alt="" />
        </button>
      </div>
    </dialog>
  ) : (
    <Fragment />
  );
};

export default EventModal;
