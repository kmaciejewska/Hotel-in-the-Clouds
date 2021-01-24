import React, { Component } from "react";
import { API, graphqlOperation } from "aws-amplify";
import img from "../images/profil.jpg";
import { listBookings } from "../api/queries";
import awsmobile from "../aws-exports";
import Amplify, { Auth } from "aws-amplify";

Amplify.configure(awsmobile);
Auth.configure(awsmobile);
API.configure(awsmobile);

const UserContext = React.createContext();

class UserProvider extends Component {
  state = {
    name: "Karolina",
    lastname: "",
    picture: img,
    logged: false,
    bookings: [],
    loading: true,
  };

  //getData from Database
  fetchBookings = async () => {
    try {
      // Switch authMode to AMAZON_COGNITO_USER_POOLS for non-public access
      const { data } = await API.graphql({
        query: listBookings,
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });

      let bookings = data.listBookings.items;
      console.log(bookings);

      this.setState({
        bookings,
      });
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    this.fetchBookings();
  }

  formatData(items) {
    let tempItems = items.map((item) => {
      let id = item.sys.id;
      let rooms = item.fields.rooms.map((room) => room.fields.roomid);
      let booking = { ...item.fields, rooms: rooms, id };
      return booking;
    });
    return tempItems;
  }

  getRoom = (slug) => {
    let tempBookings = [...this.state.bookings];
    const booking = tempBookings.find((booking) => booking.slug === slug);
    return booking;
  };

  handleLoginClick = (username) => {
    console.log("login in context");
    this.setState({ name: username });
    this.setState({ logged: true });
  };

  signOut = async () => {
    try {
      await Auth.signOut({ global: true });
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  handleLogoutClick = () => {
    this.signOut();
    this.setState({logged : false});
  };

  render() {
    return (
      // Pass user state as value to context.Provider so it can be consumed by context.Consumer
      <UserContext.Provider
        value={{
          ...this.state,
          handleLoginClick: this.handleLoginClick,
          handleLogoutClick: this.handleLogoutClick,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
const UserConsumer = UserContext.Consumer;

export { UserContext, UserConsumer, UserProvider };

export function withUserConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <UserConsumer>
        {(value) => <Component {...props} context={value} />}
      </UserConsumer>
    );
  };
}
