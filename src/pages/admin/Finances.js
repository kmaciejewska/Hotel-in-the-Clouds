import React from 'react';
import Hero from "../../components/admin/Hero";
import Banner from "../../components/admin/Banner";
import Budget from "../../components/admin/Budget";
import {Link} from 'react-router-dom';

export default function Finances() {
    return (
      <>
        <Hero hero="budgetHero">
            <Banner title="Finances">
                <Link to="/admin/home" className="btn-primary">
                    return home
                </Link>
            </Banner>
        </Hero>
        <Budget/>
      </>
    );

}