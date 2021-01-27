import React, { Component } from "react";
import { API, graphqlOperation } from "aws-amplify";
import img from "../images/profil.jpg";
import { getBooking, listBookings } from "../api/custom";
import awsmobile from "../aws-exports";
import Amplify, { Auth } from "aws-amplify";
import items from "../dataBookings";
import { DataStore } from "@aws-amplify/datastore";

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

      var i = 0;
      while (i < bookings.length) {
        if (bookings[i].user != this.state.name) {
          bookings.splice(i, 1);
        } else {
          ++i;
        }
      }

      this.setState({
        bookings,
        loading: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    Auth.currentSession()
      .then((cognitoUser) => {
        const {
          idToken: { payload },
        } = cognitoUser;

        this.setState({ name: payload["cognito:username"] });
        this.setState({ logged: true });
        //console.log(this.state.name);
      })
      .catch((err) => console.log(err));

    this.fetchBookings();
  }

  /*getRoom = (slug) => {
    let tempBookings = [...this.state.bookings];
    const booking = tempBookings.find((booking) => booking.slug === slug);
    return booking;
  };*/

  handleLoginClick = (username) => {
    console.log("login in context");
    this.setState({ name: username });
    this.setState({ logged: true });
    this.fetchBookings();
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
    this.setState({ logged: false });
  };

  handleViewClick = () => {
    this.fetchBookings();
  };

  render() {
    return (
      // Pass user state as value to context.Provider so it can be consumed by context.Consumer
      <UserContext.Provider
        value={{
          ...this.state,
          handleLoginClick: this.handleLoginClick,
          handleLogoutClick: this.handleLogoutClick,
          handleViewClick: this.handleViewClick
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
