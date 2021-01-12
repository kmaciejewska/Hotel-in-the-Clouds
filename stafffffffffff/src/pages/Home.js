import React from 'react'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import {Link} from 'react-router-dom'
export default function Home() {
    return<Hero>
        <Banner title="Bookings schedule"subtitle="check the calendar for bookings">
          <Link to='/bookings' className="btn-primary">
              go to bookings</Link>  
        </Banner>
        <div></div>
        <Banner title="Room service"subtitle="keep up to date with cutomers needs">
          <Link to='/house-kipping' className="btn-primary">
              go to housekeeping</Link>  
        </Banner>
    </Hero>;
}

