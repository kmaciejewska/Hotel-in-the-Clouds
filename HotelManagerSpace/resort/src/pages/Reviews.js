import React from 'react';
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import {Link} from 'react-router-dom';
import Review from "../components/Review";

export default function Reviews() {
    return (
      <>
        <Hero hero="reviewsHero">
            <Banner title="Hotel Reviews">
                <Link to="/" className="btn-primary">
                    return home
                </Link>
            </Banner>
        </Hero>
        <Review/>
      </>
    );
}