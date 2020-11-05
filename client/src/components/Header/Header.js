import React from "react";
import "./Header.css";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  return (
    <div className="topnav">
      {/* Logo */}
      <img src="https://i.imgur.com/nhjOSV3.png"></img>
      <p id="title">WashOut!</p>
      <p id="secret">You found a secret page!</p>
      <p id="something">Sorry we couldn't find the page you were looking for, but please enjoy this special game instead</p>

      {/* Page Links */}
        <Navbar className="nav-style" variant="light">
            <Button variant="light" size="lg">PLAY</Button>
            <Nav className="mr-auto">
            </Nav>
            <h5 inline className="head3">Current Score: <span className="currScore"> 000 </span>High Score: <span className="hiScore"> 000</span></h5>
        </Navbar>
    </div>
  );
};

export default Header;
