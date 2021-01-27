export const listBookings = `
  query ListBookings {
    listBookings {
      items {
        id
        user
        dateFrom
        dateTo
        total
        rooms {
          items {
            room {
              id
              type
            }
          }
        }
        createdAt
        updatedAt
      }
    }
  }
`;