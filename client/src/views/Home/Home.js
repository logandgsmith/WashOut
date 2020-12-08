import React, { Component } from 'react';
import './Home.css';
import Game from './Game';
import Instr from './Instr';
import EndScrn from './EndScrn'
import EndScrnW from './EndScrnW'
import {FacebookShareButton,FacebookMessengerShareButton,TwitterShareButton} from "react-share";
import {FacebookIcon,TwitterIcon} from "react-share"




const Home = (props) => {

  

  let url = "https://washout.herokuapp.com/WashOut"
  // Start the game
  if(props.isPlaying) {
    return (
      <div className="App">
        <Game handleGameOver={props.handleGameOver} isPlaying={props.isPlaying} />
      </div>
    );
  }

  // Print instructions at start of game
  else if(!props.hasStarted) {
    return (
      <div className="App"> 
        <Instr />
        
          <FacebookShareButton
            url={url}
            appid = {384310982877471}
            quote={"I scored well on the new game WashOut!\
             Care to try?"}
            className="share-button"
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>

          <TwitterShareButton
          url={url}
          title={"Come play the new game Washout!"}
          >
            <TwitterIcon size={32} round />

          </TwitterShareButton>

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
