import React, { Component } from 'react'
import { RoomContext } from '../../context/context'
import { Link } from 'react-router-dom'

//library used to calculate time
import moment from 'moment'
//library use to pick date from claendar
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import defaultBcg from '../../images/room-3.jpeg'


export default class BookNow extends Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            
            name: this.props.match.params.name,
            defaultBcg,
            startDate:Date.now(),
            endDate: Date.now(),

        };
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);
    }

  

    handleChangeStart(date) {
        this.setState({
            startDate: date
        });
    }
    handleChangeEnd(date) {
        this.setState({
            endDate: date
        });
    }

    calculateDaysLeft(startDate, endDate) {
        if (!moment.isMoment(startDate)) startDate = moment(startDate);
        if (!moment.isMoment(endDate)) endDate = moment(endDate);
        if (endDate.diff(startDate, "days") === 0) {
            return 1;
        }
        return endDate.diff(startDate, "days") + 1;
    }

    static contextType = RoomContext;
    render() {
        const { getRoom } = this.context;
        const room = getRoom(this.state.name);
        const { startDate, endDate } = this.state;
        const daysLeft = this.calculateDaysLeft(startDate, endDate);
        const start = new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "long",
            day: "2-digit"
          }).format(startDate);
        const end = new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "long",
            day: "2-digit"
          }).format(endDate);
        //const start = startDate.toLocaleString();
        //const end = endDate.toLocaleString();
        if (!room) {
            return (<div className="error">
                <h3>no such room could be found...</h3>
                <Link to='/rooms' className="btn-primary">
                    back to rooms
          </Link>
            </div>
            );
        }
        const { name, description, capacity, size, price, breakfast, pets, image } = room;
        

        return (
            <>
                <div className='booking-form'>
                    <h3>
                        Booking
                </h3>
                    <section >
                        <div className="room-info1">
                            <article className="booking-img">
                                <img src={image || defaultBcg} alt="selected room" />
                            </article>
                            <article className="info1">
                                <h3>info</h3>
                                <h6>Room Tyype : {name}</h6>
                                <h6>price : ${price}</h6>
                                <h6>size : {size} SQFT</h6>
                                <h6>
                                    max capacity :
                {capacity > 1 ? `${capacity} people` : `${capacity} person`}
                                </h6>
                                <h6>{pets ? "pets allowed" : "no pets allowed"}</h6>
                                <h6>{breakfast && "free breakfast included"}</h6>
                            </article>
                        </div>
                    </section>

                    <section className="from-date">
                        <div >
                            <label htmlFor="Fromdate" >From Date   </label>
                            <DatePicker selected={this.state.startDate} onChange={this.handleChangeStart} />
                        </div>
                        <div >
                            <label htmlFor="Todate" >To Date   </label>
                            <DatePicker selected={this.state.endDate} onChange={this.handleChangeEnd} />
                        </div>
                    </section>
                    <section className="price">
                        <div >
                            Price per day : <span>Rs {price}</span>
                        </div><div>
                            Total Price to be paid : <span >Rs {daysLeft * price}</span>
                        </div>
                    </section>

                    <section >
                        <div>
                        <Link to="/rooms" className="booking-buttonleft"> return to rooms</Link>
                        <Link to={{pathname:"/checkout", aboutProps:{name:room, cena:daysLeft * price, dateFrom:start, dateTo:end}}} 
                        className="booking-buttonright">Book Now</Link>
                        </div>
                    </section>

                </div>
            </>
        );
    }
}
