import React, {Component } from  'react'
import img from "../images/profil.jpg";

const UserContext = React.createContext(); 

class UserProvider extends Component {
   state={
       name: "Karolina",
       lastname:"Maciejewska" ,
       picture: img,
       logged:false
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
}

export {
    UserContext,UserProvider
  }
  