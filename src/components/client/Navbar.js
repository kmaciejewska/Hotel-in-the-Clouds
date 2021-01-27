import React, { Component } from "react";
import logo from "../../images/logo2.svg";
import { FaAlignRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/contextU";

export default class Navbar extends Component {
  state = { isOpen: false };
  //static contextType = UserContext;

  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    //const {logged} = this.context;
    return (
      <UserContext.Consumer>
        {(UserContext) => {
          const { logged, handleLogoutClick, handleViewClick, name } = UserContext;
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
                <ul
                  className={
                    this.state.isOpen ? "nav-links show-nav" : "nav-links"
                  }
                >
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/rooms">Rooms</Link>
                  </li>
                </ul>

                <div className="nav-login">
                  {logged ? (
                    <div>
                      <button
                        type="button"
                        id="logout"
                        className="nav-login-btn"
                        onClick={handleLogoutClick}
                      >
                        Log out
                      </button>
                    </div>
                  ) : (
                    <Link to={`/login`} className="nav-login-btn">
                      Log in
                    </Link>
                  )}
                </div>
                <div>
                  {logged && (
                    <div>
                      Welcome {name}
                      <Link to={`/profile`} className="nav-login-btn">
                        <button type="button" className="nav-login-btn" onClick={handleViewClick}>
                          View Account
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </nav>
          );
        }}
      </UserContext.Consumer>
    );
  }
}
