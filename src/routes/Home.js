import React, { Fragment, useEffect, useState, useContext } from "react";

import styles from "./Home.module.css";
import EventList from "../components/events/EventList";
import Spinner from "../components/Spinner";
import EventContext from "../store/event-context";

const Home = () => {
  const { events } = useContext(EventContext);
  const [upcomingEvents, setUpcomingEvents] = useState(null);
  const [trendingEvents, setTrendingEvents] = useState(null);

  useEffect(() => {
    if (events !== null) {
      setUpcomingEvents(
        // need to create copy of events so it's not overwritten by trending sort
        [...events].sort((eventX, eventY) => eventX.date - eventY.date)
      );

      setTrendingEvents(
        events.sort((eventX, eventY) => eventX.trending - eventY.trending)
      );
    }
  }, [events]);

  return upcomingEvents === null || trendingEvents === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className={styles["img-header"]} />
      <div className={styles["upcoming-events"]}>
        <EventList title="Upcoming events" events={upcomingEvents} />
      </div>
      <div className={styles["trending-events"]}>
        <EventList title="Trending events" events={trendingEvents} />
      </div>
    </Fragment>
  );
};

export default Home;
