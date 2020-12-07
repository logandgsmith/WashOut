import React, { Component } from 'react';
import './Home.css';
import Game from './Game';
import Instr from './Instr';
import EndScrn from './EndScrn'
import EndScrnW from './EndScrnW'

const Home = (props) => {

  // Start the game
  if(props.isPlaying) {
    return (
      <div className="App">
        <Game handleGameOver={props.handleGameOver} isPlaying={props.isPlaying} />
      </div>
    );
  }
//******************************FIXME**********************************
  // Game Over -- WIN!
  else if(props.hasWon){
    return (
      <div className="App">
        <EndScrnW />
      </div>
    )
  }

// Game Over -- LOSE!
  else if(!props.hasWon){
    return (
      <div className="App">
        <EndScrn />
      </div>
    )
  }

  //print instructions at start of game
  else {
    return (
      <div className="App">
        <Instr />
      </div>
    )
  }
}

export default Home;
