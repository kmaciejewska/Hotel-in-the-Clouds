import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import Scheduler from "../components/Scheduler";
import RoomsStatus from "../components/RoomsStatus";
import {Link} from 'react-router-dom';


const Rooms = () => {
    return (
    <>
    <Hero hero="roomsHero">
        <Banner title="Hotel Rooms">
            <Link to="/" className="btn-primary">
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
