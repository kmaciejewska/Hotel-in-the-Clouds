import React from 'react';
import {Link} from 'react-router-dom';
import defaultImg from '../../images/room-1.jpeg';
import PropTypes from "prop-types";

export default function Room({room}) {
   const {name,image,price} = room;
    return(
       <article className="room">
           <div className="img-container">
               <img src={image || defaultImg} alt ="single room"/>
               <div className="price-top">
                   <h6>${price}</h6>
                   <p> per night</p>
               </div>
               <Link to={`/rooms/${name}`} className="btn-primary room-link">
                   Features
               </Link>
           </div>
           <p className="room-info">
               {name}
               </p>
       </article>

    );
}

Room.propTypes = {
    room:PropTypes.shape(
        {
            name:PropTypes.string.isRequired,
            image:PropTypes.string.isRequired,
            price:PropTypes.number.isRequired,
        }
    )
};