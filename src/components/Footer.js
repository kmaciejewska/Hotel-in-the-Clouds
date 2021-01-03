import React, { Component } from 'react'
import { FaLinkedin, FaFacebookSquare } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { SiYoutube } from "react-icons/si";


export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('The value is: ' + this.state.value);
        event.preventDefault();
    }
    render() {
        return (
            <div className="footer" >
                <div >
                    <h3>Phone Support</h3>
                    <h4>+123456789</h4>
                </div>
                <div>
                    <h3>
                        Follow us
                    </h3>
                    <h3>
                        <FaFacebookSquare />  <RiInstagramFill /> <SiYoutube />   <FaLinkedin />
                    </h3>

                </div>
                <div >
                    <h3>Our Newsletter</h3>
                    <form onSubmit={this.handleSubmit}>
                        <label className="submit">
                            <textarea value={this.state.value} onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        )
    }
}
