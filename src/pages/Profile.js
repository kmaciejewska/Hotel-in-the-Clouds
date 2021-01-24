import React, { Component } from 'react'
import ProfileInfo from '../components/ProfileInfo'
import BookingContainer from '../components/BookingsContainer'

export default class Profile extends Component {
    render() {
        return (
            <>
              <ProfileInfo />
              <div className="rest-info">
                   <h3 className="title-bookings">My Bookings</h3>
                   <BookingContainer/>
            </div>     
            </>
        );
    }
}
