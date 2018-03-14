import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Ops from '../Ops'
import User from '../User'
import Nav from '../Nav'
import Home from '../Home'
import Owner from '../Owner'

class App extends Component {
  state={
    totalTables: 12,
    tablesOccupied: 10
  }

  render() {
    return (
      <div className="App">
        <Nav />
        <div>
          <Switch>
            <Route exact path='/' render={() => {
              return <Home />
            }} />
            <Route path='/user' render={() => {
              return <User />
            }} />
            <Route path='/ops' render={() => {
              return <Ops totalTables={this.state.totalTables}
                          tablesOccupied={this.state.tablesOccupied} />
            }} />
            <Route path='/owner' render={() => {
              return <Owner totalTables={this.state.totalTables}
                            tablesOccupied={this.state.tablesOccupied} />
            }} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
