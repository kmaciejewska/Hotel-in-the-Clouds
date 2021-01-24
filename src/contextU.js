import React, {Component } from  'react'
import img from "./images/profil.jpg";
import items from "./dataBookings";

const UserContext = React.createContext(); 

class UserProvider extends Component {
   state={
       name: "Karolina",
       lastname:"Maciejewska" ,
       picture: img,
       logged:false,
       bookings:[],
      loading :false,
   }

   componentDidMount() {
  
    let bookings = this.formatData(items);
    
    this.setState({
      bookings,  
      loading: false,

    });
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