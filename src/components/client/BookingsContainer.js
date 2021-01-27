import React from "react";
import { withUserConsumer } from "../../context/contextU";
import Loading from "./Loading";
import BookingsList from "./BookingsList";

function BookingContainer({ context }) {
  const { loading, bookings, logged } = context;
  if (loading) {
    return <Loading />;
  } else if (!logged) {
    return (
      <div className="empty-search">
        <h3>You must be signed in to view bookings</h3>
      </div>
    )
  }
  return (
    <>
      <BookingsList bookings={bookings} />
    </>
  );
}

export default withUserConsumer(BookingContainer);