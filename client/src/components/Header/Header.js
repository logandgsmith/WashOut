import React, {Component} from "react";
import "./Header.css";
import { Nav, Navbar, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/logo.png"

class Header extends Component {  
  render(){
    return (
      <div className="topnav" >
        {/* Logo */}
        <a href="https://www.laundr.io/"><img src={logo} /></a>
        <p id="title">WashOut!</p>
        <p id="apology">Sorry we couldn't find the page you were looking for, but please enjoy this special game instead</p>

        {/* Page Links */}
          <Navbar className="nav-style" variant="light">
              <Button variant="light" size="lg" onClick={this.props.startGame}>PLAY</Button>
              <Nav className="mr-auto">
              </Nav>
    <h5 inline className="head3" >Current Score: <span className="currScore"> {this.props.score} </span>High Score: <span className="hiScore"> {this.props.hiScore}</span></h5>
          </Navbar>
      </div>
    );
  }
};

export default Header;
