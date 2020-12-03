import React, { Component } from 'react';
import './Home.css';
import Game from './Game';
import Instr from './Instr';

const Home = (props) => {
  if(props.isPlaying) {
    return (
      <div className="App">
        <Game />
      </div>
    );
  }
  else {
    return (
      <div className="App">
        <Instr />
      </div>
    )
  }
}

export default Home;
