import React, { Component } from 'react';
import './Home.css';
import Game from './Game';

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
        {/*TODO: ADD SOMETHING WHEN THE GAME ISN'T PLAYING*/}
      </div>
    )
  }
}

export default Home;
