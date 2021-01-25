/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const processBooking = /* GraphQL */ `
  mutation ProcessBooking($input: ProcessBookingInput!) {
    processBooking(input: $input)
  }
`;
export const createRoom = /* GraphQL */ `
  mutation CreateRoom(
    $input: CreateRoomInput!
    $condition: ModelRoomConditionInput
  ) {
    createRoom(input: $input, condition: $condition) {
      id
      name
      type
      description
      price
      capacity
      pets
      image
      featured
      breakfast
      cleaniness
      bookings {
        items {
          id
          room_id
          booking_id
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateRoom = /* GraphQL */ `
  mutation UpdateRoom(
    $input: UpdateRoomInput!
    $condition: ModelRoomConditionInput
  ) {
    updateRoom(input: $input, condition: $condition) {
      id
      name
      type
      description
      price
      capacity
      pets
      image
      featured
      breakfast
      cleaniness
      bookings {
        items {
          id
          room_id
          booking_id
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteRoom = /* GraphQL */ `
  mutation DeleteRoom(
    $input: DeleteRoomInput!
    $condition: ModelRoomConditionInput
  ) {
    deleteRoom(input: $input, condition: $condition) {
      id
      name
      type
      description
      price
      capacity
      pets
      image
      featured
      breakfast
      cleaniness
      bookings {
        items {
          id
          room_id
          booking_id
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createRoomBooking = /* GraphQL */ `
  mutation CreateRoomBooking(
    $input: CreateRoomBookingInput!
    $condition: ModelRoomBookingConditionInput
  ) {
    createRoomBooking(input: $input, condition: $condition) {
      id
      room_id
      booking_id
      booking {
        id
        user
        dateFrom
        dateTo
        total
        rooms {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      room {
        id
        name
        type
        description
        price
        capacity
        pets
        image
        featured
        breakfast
        cleaniness
        bookings {
          nextToken
        }
        createdAt
        updatedAt
      }
    }
  }
`;
export const updateRoomBooking = /* GraphQL */ `
  mutation UpdateRoomBooking(
    $input: UpdateRoomBookingInput!
    $condition: ModelRoomBookingConditionInput
  ) {
    updateRoomBooking(input: $input, condition: $condition) {
      id
      room_id
      booking_id
      booking {
        id
        user
        dateFrom
        dateTo
        total
        rooms {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      room {
        id
        name
        type
        description
        price
        capacity
        pets
        image
        featured
        breakfast
        cleaniness
        bookings {
          nextToken
        }
        createdAt
        updatedAt
      }
    }
  }
`;
export const deleteRoomBooking = /* GraphQL */ `
  mutation DeleteRoomBooking(
    $input: DeleteRoomBookingInput!
    $condition: ModelRoomBookingConditionInput
  ) {
    deleteRoomBooking(input: $input, condition: $condition) {
      id
      room_id
      booking_id
      booking {
        id
        user
        dateFrom
        dateTo
        total
        rooms {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      room {
        id
        name
        type
        description
        price
        capacity
        pets
        image
        featured
        breakfast
        cleaniness
        bookings {
          nextToken
        }
        createdAt
        updatedAt
      }
    }
  }
`;
export const createBooking = /* GraphQL */ `
  mutation CreateBooking(
    $input: CreateBookingInput!
    $condition: ModelBookingConditionInput
  ) {
    createBooking(input: $input, condition: $condition) {
      id
      user
      dateFrom
      dateTo
      total
      rooms {
        items {
          id
          room_id
          booking_id
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateBooking = /* GraphQL */ `
  mutation UpdateBooking(
    $input: UpdateBookingInput!
    $condition: ModelBookingConditionInput
  ) {
    updateBooking(input: $input, condition: $condition) {
      id
      user
      dateFrom
      dateTo
      total
      rooms {
        items {
          id
          room_id
          booking_id
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteBooking = /* GraphQL */ `
  mutation DeleteBooking(
    $input: DeleteBookingInput!
    $condition: ModelBookingConditionInput
  ) {
    deleteBooking(input: $input, condition: $condition) {
      id
      user
      dateFrom
      dateTo
      total
      rooms {
        items {
          id
          room_id
          booking_id
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
