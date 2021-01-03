import React from 'react';
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import {Link} from 'react-router-dom';
import Notification from "../components/Notification";

export default function Notifications() {
    return (
      <>
        <Hero hero="statisticsHero">
            <Banner title="Notifications">
                <Link to="/" className="btn-primary">
                    return home
                </Link>
            </Banner>
        </Hero>
        <Notification/>
      </>
    );
}