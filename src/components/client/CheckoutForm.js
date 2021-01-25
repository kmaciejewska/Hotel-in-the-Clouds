import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { RoomContext } from "../../context/context";
import { UserContext } from "../../context/contextU";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Link } from 'react-router-dom'

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4"
      }
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a"
    }
  }
};

const CheckoutForm = (props) => {

  const {checkout} = useContext(RoomContext);
  const {logged} = useContext(UserContext);
  const {total, dateFrom, dateTo, room} = props;
  const {id, image, name, type, price, capacity, description, cleaniness, breakfast, pets} = room;
  const cart = {id, image, name, type, price, capacity, description, cleaniness, breakfast, pets};

  console.log(cart);
  const [orderDetails, setOrderDetails] = useState({cart, dateFrom, dateTo, total, token: null});
  
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  console.log(total);
  //console.log(cart);

  useEffect(() => {
    if (orderDetails.token) {
      checkout(orderDetails);
      //clearCart();
      //history.push("/");
    }
  }, [orderDetails]);

  // Handle real-time validation errors from the card Element.
  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  // Handle form submission.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      // Inform the user if there was an error.
      setError(result.error.message);
    } else {
      setError(null);
      // Send the token to your server.
      const token = result.token;
      setOrderDetails({ ...orderDetails, token: token.id });
    }
  };

  return (
    <div>
      { logged ? (
          <form onSubmit={handleSubmit}>
          <div className="checkout-form">
            <div className="stripe-section">
              <label htmlFor="stripe-element"> Credit or debit card </label>
              <CardElement id="stripe-element" options={CARD_ELEMENT_OPTIONS} onChange={handleChange} />
            </div>
            <div className="card-errors" role="alert">
              {error}
            </div>
          </div>
          <button type="submit" className="btn">
            Submit Payment
          </button>
        </form>
      ) : (
        <Link to="/login" className="booking-buttonleft">login</Link>
      )}
    </div>
  );
};

export default CheckoutForm;