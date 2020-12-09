import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import './App.css';


const App = () => {
  const [state, setState] = React.useState({
    hasStarted: false,
    isPlaying: false,
    hasWon: false,
    score: 0,
    hiScore: 0
  })

  // Add the points param to the score and update it for all components
  let handleScoreUpdate = (points) => {
    const _state = {...state};
    let score = _state.score;
    score += points;
    if(score > 999) score = 999;
    else if(score < 0) score = 0;
    setState({..._state, score});
  }

  // Set the hiScore value to the newScore param for all components
  let handleNewHiScore = (newScore) => {
    const _state = {...state};
    let hiScore = _state.hiScore;
    hiScore = newScore;
    setState({..._state, hiScore});
  }

  // Start or Stop the game when PLAY is clicked.
  let handlePlayClicked = () => {
    const _state = {...state};
    let hasStarted = _state.hasStarted;
    let isPlaying = _state.isPlaying;
    let hasWon = _state.hasWon;
    let score = _state.score;
    hasStarted = true;
    isPlaying = true;
    hasWon = false;
    score = 0;
    setState({..._state, hasStarted, isPlaying, hasWon, score});
  }

  // Check if the game is won or lost and update values for components
  let handleGameOver = (hasWonGame) => {
    const _state = {...state};
    let isPlaying = _state.isPlaying;
    let hasWon = _state.hasWon;
    isPlaying = false;
    hasWon = hasWonGame;
    setState({..._state, isPlaying, hasWon});
  }

  // This will render the 3 components in a row Header->A Route(Home)->Footer
  return (
    <div>
      {/* The top navbar for the site */}
      <Header startGame={handlePlayClicked}
              score={state.score}
              hiScore={state.hiScore} />

      {/* Route all routes to WashOut... Can add other routes */}
      <Switch>
        <Route exact path="/WashOut">
          <Home isPlaying={state.isPlaying} 
                hasStarted={state.hasStarted}
                hasWon={state.hasWon}
                score={state.score}
                hiScore={state.hiScore} 
                handleGameOver={handleGameOver}
                handleScoreUpdate={handleScoreUpdate}
                handleNewHiScore={handleNewHiScore} />
        </Route>

        <Route>
          <Redirect to="/WashOut" />
        </Route>
      </Switch>

      {/* Social Media Buttons */}
      <Footer hiScore={state.hiScore} />
    </div>
  );
}

export default App;
