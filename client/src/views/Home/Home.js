import React from 'react';
import './Home.css';
import Game from './Game';
import Instr from './Instr';
import EndScrn from './EndScrn';
import EndScrnW from './EndScrnW';


const Home = (props) => {
  // Start the game
  if(props.isPlaying) {
    return (
      <div className="App">
        <Game score={props.score}
              hiScore={props.hiScore}
              handleGameOver={props.handleGameOver}
              handleScoreUpdate={props.handleScoreUpdate}
              handleNewHiScore={props.handleNewHiScore}
              isPlaying={props.isPlaying} />
      </div>
    );
  }

  // Print instructions at start of game
  else if(!props.hasStarted) {
    return (
      <div className="App"> 
        <Instr isPlaying={props.isPlaying} />
      </div>

    )
  }

  // Game Over -- WIN!
  else if(props.hasWon){
    return (
      <div className="App">
        <EndScrnW />
      </div>
    )
  }

// Game Over -- LOSE!
  else {
    return (
      <div className="App">
        <EndScrn />
      </div>
    )
  }

  
}

export default Home;
