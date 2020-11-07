import React from "react";
import "./Header.css";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  var score = 0
  function loadScore(){
    var vloc = localStorage.getItem("vLoc");
    score = Number(vloc);
    return score;
  }
  return (
    <div className="topnav" onLoad={setInterval(loadScore(),1000)}>
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
            <h5 inline className="head3" >Current Score: <span className="currScore"> {score} </span>High Score: <span className="hiScore"> 0</span></h5>
        </Navbar>
    </div>
  );
};

export default Header;
