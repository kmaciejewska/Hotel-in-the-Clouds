import React from 'react';
import Hero from "../../components/admin/Hero";
import Banner from "../../components/admin/Banner";
import Payment from "../../components/admin/Payment";
import {Link} from 'react-router-dom';

export default function Payments() {
    return (
      <>
        <Hero hero="paymentsHero">
            <Banner title="Payments processing">
                <Link to="/admin/home" className="btn-primary">
                    return home
                </Link>
            </Banner>
        </Hero>
        <Payment/>
      </>
    );
}