import React, { Component } from 'react';
import './Home.css';
import Game from './Game';
import Instr from './Instr';
import EndScrn from './EndScrn'
import EndScrnW from './EndScrnW'

const Home = (props) => {
  if(props.isPlaying) {
    return (
      <div className="App">
        <Game />
      </div>
    );
  }
//******************************FIXME**********************************
  //elsif win, print win screen
//   else if(props.hampWin){
//     <div className="App">
//       <EndScrnW/>
//     </div>
//   }

//   //elsif lose, print lose screen
//   else if(props.hampLose){
//   <div className="App">
//     <EndScrn/>
//   </div>
// }
//***************************************************************** 


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
