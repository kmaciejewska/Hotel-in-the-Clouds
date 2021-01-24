import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "../../components/client/CheckoutForm";

const Checkout = () => {
    const stripePromise = loadStripe('pk_test_51I58aTI3sLQDWoOaR1m5BvUVIuYjm5wf4g9fEnXDDypC1EVQGCPI8jdhyJh7zdUuA6UwPEP176KOsHxjPdqHJPRV00DBFYFn7v');
    return (
        <div className='bookingc-form'>
        <section className="checkout-wrapper">
                <Elements stripe={stripePromise}>
                    <section>
                        <h2>Time to Checkout?</h2>
                        <CheckoutForm />
                    </section>
                </Elements>
        </section>
        </div>
    )
}

export default Checkout;