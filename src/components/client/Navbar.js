import React, { Component } from "react";
import logo from "../../images/logo2.svg";
import { FaAlignRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/contextU";

export default class Navbar extends Component {
  state = { isOpen: false };
  //static contextType = UserContext;

  /*handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };*/

  render() {
    //const {logged} = this.context;
    return (
            <nav className="navbar">
              <div className="nav-center">
                <div className="nav-header">
                  <Link to="/">
                    <img src={logo} alt="Cloud Empire" />
                  </Link>
                  <button
                    type="button"
                    className="nav-btn"
                    onClick={this.handleToggle}
                  >
                    <FaAlignRight className="nav-icon" />
                  </button>
                </div>
                
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/rooms">Rooms</Link>
                  </li>
               
              </div>
            </nav>
          );
        
      
  }
}
