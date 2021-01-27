import React, { Component } from 'react'
import ProfileInfo from '../../components/client/ProfileInfo'
import BookingContainer from '../../components/client/BookingsContainer'
import Amplify, { Auth } from "aws-amplify";
import config from "../../aws-exports";

Amplify.configure(config);
Auth.configure(config);

export default class Profile extends Component  {
    render() {
        return (
            <>
              <div className="rest-info">
                   <h3 className="title-bookings">My Bookings</h3>
                   <BookingContainer/>
            </div>     
            </>
        );
    }
}
