import React, { Component } from 'react'
import { RoomContext } from '../context'
import { Link } from 'react-router-dom'

//library used to calculate time
import moment from 'moment'
//library use to pick date from claendar
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import defaultBcg from '../images/room-3.jpeg'


export default class BookNow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            slug: this.props.match.params.slug,
            defaultBcg,
            startDate: new Date(),
            endDate: new Date(),

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
        return endDate.diff(startDate, "days");
    }



    static contextType = RoomContext;
    render() {
        const { getRoom } = this.context;
        const room = getRoom(this.state.slug);
        const { startDate, endDate } = this.state;
        const daysLeft = this.calculateDaysLeft(startDate, endDate);
        if (!room) {
            return (<div className="error">
                <h3>no such room could be found...</h3>
                <Link to='/rooms' className="btn-primary">
                    back to rooms
          </Link>
            </div>
            );
        }
        const { name, description, capacity, size, price, breakfast, pets, images } = room;
        const [mainImg, ...defaultBcg] = images;
        

        return (
            <>
                <div className='booking-form'>
                    <h3>
                        Booking
                </h3>
                    <section >
                        <div className="room-info1">
                            <article className="booking-img">
                                <img src={mainImg || defaultBcg} alt="selected room" />
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
                         <Link to="/checkout/"className="booking-buttonright">Book Now</Link>
                        </div>
                    </section>

                </div>
            </>
        );
    }
}
