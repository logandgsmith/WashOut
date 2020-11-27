import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home"
import Header from "./components/Header/Header"
import './App.css';


const App = () => {
  const [state, setState] = React.useState({
    isPlaying : false,
  })

  // Start or Stop the game when PLAY is clicked.
  let handlePlayClicked = () => {
    const _state = {...state};
    let isPlaying = _state.isPlaying;
    isPlaying = true;
    setState({..._state, isPlaying})
  }

  return (
    <div>
      <Header startGame={handlePlayClicked}/>
      <Switch>
        <Route exact path="/WashOut">
          <Home isPlaying={state.isPlaying} />
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
