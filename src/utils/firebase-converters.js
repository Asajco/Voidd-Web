import { Timestamp, } from "firebase/firestore";

export const formatDate = (date) => {

  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const formattedDate = date.toLocaleDateString("en-US", dateOptions);
  const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

  return formattedDate + " " + formattedTime;
};

export const eventConverter = {
  toFirestore(event) {
    return {
      title: event.title,
      description: event.description,
      location: event.location,
      date: Timestamp.fromMillis(Date.parse(event.date)),
      genre: event.genre,
      poster: event.poster,
      price: parseInt(event.price),
      capacity: parseInt(event.capacity),
      remainingTickets: parseInt(event.capacity),
    };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      title: data.title,
      description: data.description,
      location: data.location,
      date: data.date.toDate(),
      genre: data.genre,
      poster: data.poster,
      price: data.price,
      capacity: data.capacity,
      remainingTickets: data.remainingTickets,
      ref: snapshot.ref,
      // trending is percentage of remaining capacity
      trending: data.remainingTickets / data.capacity
    };
  },
};

export const ticketEventInfoConverter = {
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      title: data.title,
      location: data.location,
      date: data.date.toDate(),
    };
  },
};

