const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

const BOOKING_TABLE = "Booking-4ihkwg33pjf75if6e73i2qpqxu-devy";
const BOOKING_TYPE = "Booking";
const ROOM_BOOKING_TABLE = "RoomBooking-4ihkwg33pjf75if6e73i2qpqxu-devy";
const ROOM_BOOKING_TYPE = "RoomBooking";


const createBooking = async (payload) => {
  const { booking_id, username, email, dateFrom, dateTo, total } = payload;
  var params = {
    TableName: BOOKING_TABLE,
    Item: {
      id: booking_id,
      __typename: BOOKING_TYPE,
      customer: email,
      user: username,
      dateFrom: dateFrom,
      dateTo: dateTo,
      total: total,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    }
  };
  console.log(params);
  await documentClient.put(params).promise();
};

const createRoomBooking = async (payload) => {
  let roomBookings = [];
  for (i = 0; i < payload.cart.length; i++) {
    const cartItem = payload.cart[i];
    roomBookings.push({
      PutRequest: {
        Item: {
          id: uuidv4(),
          __typename: ROOM_BOOKING_TYPE,
          room_id: cartItem.id,
          booking_id: payload.booking_id,
          customer: payload.email,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      }
    });
  }
  let params = {
    RequestItems: {}
  };
  params["RequestItems"][ROOM_BOOKING_TABLE] = roomBookings;
  console.log(params);
  await documentClient.batchWrite(params).promise();
};

/*
 * Get booking details from processPayment lambda
 * Create a booking
 * Link rooms to the booking - Users can see the past bookings and admins can view bookings by user
 * Email the invoice (Will be added later)
 */
exports.handler = async (event) => {
  try {
    let payload = event.prev.result;
    payload.booking_id = uuidv4();

    // create a new booking
    await createBooking(payload);

    // links rooms with the booking
    await createRoomBooking(payload);

    // Note - function to email the invoice to the user

    return "SUCCESS";
  } catch (err) {
    console.log(err);
    return new Error(err);
  }
};