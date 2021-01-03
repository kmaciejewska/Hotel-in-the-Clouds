import React from 'react';
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import Budget from "../components/Budget";
import {Link} from 'react-router-dom';

export default function Finances() {
    return (
      <>
        <Hero hero="budgetHero">
            <Banner title="Finances">
                <Link to="/" className="btn-primary">
                    return home
                </Link>
            </Banner>
        </Hero>
        <Budget/>
      </>
    );

}