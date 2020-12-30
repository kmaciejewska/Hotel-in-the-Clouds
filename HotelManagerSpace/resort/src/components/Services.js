import React, { Component } from 'react';
import {FaGrin, FaChartLine, FaCreditCard, FaClipboardList} from "react-icons/fa";
import Title from "./Title";
import {Link} from 'react-router-dom';

export default class Services extends Component {
    state={
        services:[
            {
                icon:<FaGrin/>, 
                title:"Reviews and ratings",
                info: "View reviews and ratings from hotel clients about food, services and room cleanliness.",
                btnCaption: "VIEW",
                link: "/reviews"
            }, 
            {
                icon:<FaChartLine/>, 
                title:"Hotel statictics",
                info: "View information about bookings for the day, week or month and control hotel profit.",
                btnCaption: "ANALYSE",
                link: "/statistics"
            },
            {
                icon:<FaCreditCard/>, 
                title:"Payment processing",
                info: "Control payments from hotel clients and add the amount due to the bill of the guests after ordering some services by them.",
                btnCaption: "MANAGE",
                link: "/payments"
            },
            {
                icon:<FaClipboardList/>, 
                title:"Control finance",
                info: "Control the history of incomings and expenses of the hotel. View calculated budget to assess if hotel is prosperous.",
                btnCaption: "Control",
                link: "/finances"
            }
        ]
    }
    render() {
        return (
        <section className="services">
            <Title title="services"/>
            <div className="services-center">
                {this.state.services.map((item, index) => {
                    return (
                        <article key={index} className="service">
                            <span>{item.icon}</span>
                            <h6>{item.title}</h6>
                            <p>{item.info}</p>
                            
                            <Link key={index} to={item.link} className="btn-primary">
                                {item.btnCaption}
                            </Link>
                        </article>
                    );
                    })
                }
            
            </div>
        </section>
        );
    }
}