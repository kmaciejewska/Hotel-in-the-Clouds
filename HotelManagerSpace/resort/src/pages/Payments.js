import React from 'react';
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import Payment from "../components/Payment";
import {Link} from 'react-router-dom';

export default function Payments() {
    return (
      <>
        <Hero hero="paymentsHero">
            <Banner title="Payments processing">
                <Link to="/" className="btn-primary">
                    return home
                </Link>
            </Banner>
        </Hero>
        <Payment/>
      </>
    );
}