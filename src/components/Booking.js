import React, { useContext , useState } from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment'
import defaultImg from '../images/room-1.jpeg';
import PropTypes from "prop-types";
import {RoomContext} from '../context'

export default function Booking({booking}) {

   const { id,dateFrom, dateTo, total, rooms} = booking;
   const {getRoomID} = useContext(RoomContext);
    const room = getRoomID(rooms[0]);
    const {name,slug,images,price} = room;
    var dateF = new Date(dateFrom); 
    var dateT = new Date(dateTo); 
    var date = new Date().getDate();
    var res = new Date(dateF).getTime() > new Date(date).getTime()

    return(
       <article className="room">
           <div className="img-container">
           <img src={images[0] || defaultImg} alt ="single room"/>
               <h3>{id}</h3>
               <div className="price-top">
                   <h6>${total}</h6>
               </div>      
           </div>
           <p className="room-info">
            
               <h5>{moment(dateF).format('DD-MM-YYYY')}</h5>
               </p>
       </article>

    );
}

Booking.propTypes = {
    booking:PropTypes.shape(
        {
            name:PropTypes.string.isRequired,
            string:PropTypes.string.isRequired,
        }
    )
};