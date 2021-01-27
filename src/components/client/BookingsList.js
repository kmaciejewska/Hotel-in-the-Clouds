
import React from "react";
import Booking from "./Booking";
const BookingsList = ({ bookings }) => {
  if (bookings.length === 0) {
    return (
      <div className="empty-search">
        <h3>You have no booking</h3>
      </div>
    );
  }
  return (
    <section className="bookingslist">
      <div className="bookingslist-center">
        {bookings.map(item => {
          return <Booking key={item.id} booking={item} />;
        })}
      </div>
    </section>
  );
};

export default BookingsList;