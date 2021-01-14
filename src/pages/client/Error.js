
import React from "react";
import Hero from "../../components/client/Hero";
import Banner from "../../components/client/Banner";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <Hero>
      <Banner title="404" subtitle="page not found">
        <Link to="/" className="btn-primary">
          return home
        </Link>
      </Banner>
    </Hero>
  );
};

export default Error;
