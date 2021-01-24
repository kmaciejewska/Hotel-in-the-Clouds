import React from "react";
import { withUserConsumer } from "../../context/contextU";
import Loading from "./Loading";
import BookingsList from "./BookingsList";

function BookingContainer({ context }) {
  const { loading, bookings } = context;
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <BookingsList bookings={bookings} />
    </>
  );
}

export default withUserConsumer(BookingContainer);