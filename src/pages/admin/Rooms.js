import React from "react";
import Hero from "../../components/admin/Hero";
import Banner from "../../components/admin/Banner";
import Scheduler from "../../components/admin/Scheduler";
import RoomsStatus from "../../components/admin/RoomsStatus";
import {Link} from 'react-router-dom';


const Rooms = () => {
    return (
    <>
    <Hero hero="roomsHero">
        <Banner title="Hotel Rooms">
            <Link to="/admin/home" className="btn-primary">
                return home
            </Link>
        </Banner>
    </Hero>
    <Scheduler/>
    <RoomsStatus/>
    </>
    )
}

export default Rooms;
