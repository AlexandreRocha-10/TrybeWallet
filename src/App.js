import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import NewLogin from './pages/NewLogin';
import Wallet from './pages/Wallet';
import './App.css';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/trybewallet" component={ NewLogin } />
        <Route path="/carteira" component={ Wallet } />
      </Switch>
    );
  }
}

export default App;
