import React from 'react';
import Hero from "../../components/admin/Hero";
import Banner from "../../components/admin/Banner";
import {Link} from 'react-router-dom';
import Review from "../../components/admin/Review";

export default function Reviews() {
    return (
      <>
        <Hero hero="reviewsHero">
            <Banner title="Hotel Reviews">
                <Link to="/admin/home" className="btn-primary">
                    return home
                </Link>
            </Banner>
        </Hero>
        <Review/>
      </>
    );
}