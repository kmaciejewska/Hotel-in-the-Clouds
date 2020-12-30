import React from 'react';
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import {Link} from 'react-router-dom';
import Services from "../components/Services";

export default function Home() {
   return (
    <>
    <Hero>
        <Banner title="Cloud Empire" subtitle="Manage Your Hotel In The Clouds">
            <Link to="/rooms" className="btn-primary">
                Manage rooms
            </Link>
        </Banner>
    </Hero>
    <Services/>
    
    </>
   );
}

   