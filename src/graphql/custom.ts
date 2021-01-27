export const listBookings = `
  query ListBookings {
    listBookings {
      items {
        dateFrom
        dateTo
        total
        
      }
    }
  }
`;