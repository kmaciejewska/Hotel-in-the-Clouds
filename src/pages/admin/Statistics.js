import React from 'react';
import Hero from "../../components/admin/Hero";
import Banner from "../../components/admin/Banner";
import BarChart from "../../components/admin/BarChart";
import LineChart from "../../components/admin/LineChart";
import PieChart from "../../components/admin/PieChart";
import {Link} from 'react-router-dom';

export default function Statistics() {
    return (
      <>
        <Hero hero="statisticsHero">
            <Banner title="Hotel statistics">
                <Link to="/admin/home" className="btn-primary">
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