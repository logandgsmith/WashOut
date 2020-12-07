import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home"
import Header from "./components/Header/Header"
import './App.css';


const App = () => {
  const [state, setState] = React.useState({
    hasStarted: false,
    isPlaying: false,
    hasWon: false,
  })

  // Start or Stop the game when PLAY is clicked.
  let handlePlayClicked = () => {
    const _state = {...state};
    let hasStarted = _state.hasStarted;
    let isPlaying = _state.isPlaying;
    let hasWon = _state.hasWon;
    hasStarted = true;
    isPlaying = true;
    hasWon = false;
    setState({..._state, hasStarted, isPlaying, hasWon});
  }

  let handleGameOver = (hasWonGame) => {
    const _state = {...state};
    let isPlaying = _state.isPlaying;
    let hasWon = _state.hasWon;
    isPlaying = false;
    hasWon = hasWonGame;
    setState({..._state, isPlaying, hasWon});
  }

  return (
    <div>
      <Header startGame={handlePlayClicked}/>
      <Switch>
        <Route exact path="/WashOut">
          <Home isPlaying={state.isPlaying} 
                hasStarted={state.hasStarted}
                hasWon={state.hasWon} 
                handleGameOver={handleGameOver} />
        </Route>
        <Route exact path="/">
          <Redirect to="/WashOut" />
        </Route>
        <Route>
          <Redirect to="/WashOut" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
