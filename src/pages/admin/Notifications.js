import React from 'react';
import Hero from "../../components/admin/Hero";
import Banner from "../../components/admin/Banner";
import {Link} from 'react-router-dom';
import Notification from "../../components/admin/Notification";

export default function Notifications() {
    return (
      <>
        <Hero hero="statisticsHero">
            <Banner title="Notifications">
                <Link to="/admin/home" className="btn-primary">
                    return home
                </Link>
            </Banner>
        </Hero>
        <Notification/>
      </>
    );
}