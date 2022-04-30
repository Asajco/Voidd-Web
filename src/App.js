import React from "react";
import ReactDOM from "react-dom";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer.js";
import NavBar from "./components/navigation-bar/NavBar";
import { EventContextProvider } from "./store/event-context.js";
import EventModal from "./components/events/EventModal.js";

import styles from "./App.module.css";
import ScrollToTop from "./components/ScrollToTop.js";

const App = () => {
  return (
    <EventContextProvider>
      <ScrollToTop/>
      <NavBar />
      <div className={styles["main-content-container"]}>
        <Outlet />
      </div>
      <Footer />
      {ReactDOM.createPortal(
        <EventModal />,
        document.getElementById("modal-root")
      )}
    </EventContextProvider>
  );
};

export default App;
