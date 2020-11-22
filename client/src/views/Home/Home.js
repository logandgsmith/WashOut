import React, { Component } from 'react';
import './Home.css';
import Game from './Game';
import Instr from './Instr'


class Home extends Component {
    render() {
      return (
        <div className = "row">
              <Instr/>
              <Game/>
        </div>
      );
    }
  }

export default Home;
