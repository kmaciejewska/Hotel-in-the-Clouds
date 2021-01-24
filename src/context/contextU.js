import React, {Component } from  'react'
import { API, graphqlOperation } from 'aws-amplify';
import img from "../images/profil.jpg";
import { listBookings } from '../api/queries';
import awsmobile from '../aws-exports';

API.configure(awsmobile);

const UserContext = React.createContext(); 

class UserProvider extends Component {
   state={
       name: "Karolina",
       lastname:"Maciejewska" ,
       picture: img,
       logged:false,
       bookings:[],
       loading : true,
   }

   //getData from Database
  fetchBookings = async () => {
    try {
      // Switch authMode to API_KEY for public access
      const { data } = await API.graphql({
        query: listBookings,
        authMode: "API_KEY"
      });

      let bookings = data.listBookings.items;
      console.log(bookings);
      
      this.setState({
               bookings
              });
      
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    this.fetchBookings();
  }


  formatData(items) {
    let tempItems = items.map(item => {
      let id = item.sys.id
      let rooms = item.fields.rooms.map(room => room.fields.roomid);
      let booking = {...item.fields,rooms:rooms,id };
      return booking;
    });
    return tempItems;
  }

  getRoom = (slug) => {
    let tempBookings = [...this.state.bookings];
    const booking = tempBookings.find((booking)=>booking.slug ===slug);
    return booking;
  };

  handleLoginClick =() => {
      console.log("login in context")
    this.setState({logged : true});
  };
  handleLogoutClick =() => {
    console.log("login in context")
  this.setState({logged : false});
};

  render() {
    return (
      // Pass user state as value to context.Provider so it can be consumed by context.Consumer
      <UserContext.Provider value={ {...this.state,
        handleLoginClick: this.handleLoginClick,
        handleLogoutClick: this.handleLogoutClick
      }
    }>
      {this.props.children}
      </UserContext.Provider>
    );
  }
 } const UserConsumer = UserContext.Consumer;

export {
    UserContext,UserConsumer,UserProvider
  }
  
export function withUserConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <UserConsumer>
        {value => <Component {...props} context={value} />}
      </UserConsumer>
    );
  };
}