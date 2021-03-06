
import React from 'react'
import Hero from '../../components//staff/Hero'
import Banner from '../../components//staff/Banner'
import {Link} from 'react-router-dom'

function Error() {
    return (
        <section className="error">
        <Hero> 
        <Banner title="Error 404"subtitle="page not found">
            <Link to='/' className="btn-primary">
            go to home page</Link>  
        </Banner>
      </Hero>
      </section>
    )
}
export default Error
