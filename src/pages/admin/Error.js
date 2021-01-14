import React from 'react';
import Hero from "../../components/admin/Hero";
import Banner from "../../components/admin/Banner";
import {Link} from 'react-router-dom';

export default function Error() {
    return <Hero>
        <Banner title="404" subtitle="Page not found">
            <Link to="/" className="btn-primary">
                return home
            </Link>
        </Banner>
    </Hero>;
}

