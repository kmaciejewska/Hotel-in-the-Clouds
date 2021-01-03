import React from 'react';
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import {Link} from 'react-router-dom';

export default function Statistics() {
    return (
      <>
        <Hero hero="statisticsHero">
            <Banner title="Hotel statistics">
                <Link to="/" className="btn-primary">
                    return home
                </Link>
            </Banner>
        </Hero>
        <BarChart/>
        <LineChart/>
        <PieChart/>
      </>
    );
}