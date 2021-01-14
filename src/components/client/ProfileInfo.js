import React, { Component } from 'react'
import { UserContext, UserProvider } from '../../context/contextU'

export default class ProfileInfo extends Component {
    render() {
        
        return (
        <UserContext.Consumer>{(UserContext) => {
            const { logged, handleLoginClick, handleLogoutClick, picture, name } = UserContext;
        return (<div>
            {logged &&
            < div className="profile-info">
               
               <div className="profile-image">
                <img src={picture} alt="single room" />
                  </div> 
            </div>}
            </div>
        )
      }}</UserContext.Consumer>
      );
    }
  }