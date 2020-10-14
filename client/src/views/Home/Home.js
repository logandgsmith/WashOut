import React, { Component } from 'react';
import './Home.css';
import Game from './Game';


class Home extends Component {
    render() {
      return (
        <div className="App">
          <Game/>
        </div>
      );
    }
  }

export default Home;
