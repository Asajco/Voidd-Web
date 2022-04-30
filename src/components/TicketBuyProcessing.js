import React, { useContext } from "react";
import { Outlet } from "react-router-dom";

import EventContext from "../store/event-context";
import Spinner from "./Spinner";

const TicketBuyProcessing = () => {
  const { processingTicket } = useContext(EventContext);

  if (processingTicket === true) {
    return <Spinner loadingDescription="Processing ticket..."/>;
  }
  return <Outlet />;
};

export default TicketBuyProcessing;
