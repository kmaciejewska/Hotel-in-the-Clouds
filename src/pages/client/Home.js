import React from "react";
import Hero from "../../components/client/Hero";
import Banner from "../../components/client/Banner";
import { Link } from "react-router-dom";
import Services from "../../components/client/Services";
import FeaturedRooms from "../../components/client/FeaturedRooms";

export default function Home() {
  return (
    <>
      <Hero>
        <Banner
          title="luxurious rooms"
          subtitle="spend your night in the clouds"
        >
          <Link to="/rooms" className="btn-primary">
            our rooms
          </Link>
        </Banner>
      </Hero>
      <Services />
      <FeaturedRooms />
    </>
  );
}
