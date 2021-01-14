import React from 'react';
import Hero from "../../components/admin/Hero";
import Banner from "../../components/admin/Banner";
import {Link} from 'react-router-dom';
import Services from "../../components/admin/Services";

export default function Home() {
   return (
    <>
    <Hero>
        <Banner title="Cloud Empire" subtitle="Manage Your Hotel In The Clouds">
            <Link to="/admin/rooms" className="btn-primary">
                Manage rooms
            </Link>
        </Banner>
    </Hero>
    <Services/>
    
    </>
   );
}

   