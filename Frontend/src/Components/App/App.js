import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Ops from '../Ops'
import User from '../User'
import Nav from '../Nav'
import Home from '../Home'
import Owner from '../Owner'
import faker from 'faker'
import axios from 'axios'

class App extends Component {
  state = {
    totalTables: 0,
    occupiedTables: 0,
    totalCapacity: 0,
    currentCapacity: 0
  }

  makeRest = () => {
    axios.post("http://localhost:8080/createRestaurant", {
      name: (faker.fake("{{company.companyName}}")),
      address: (faker.fake("{{address.streetAddress}}, {{address.city}}, {{address.zipCode}}")),
      hours: '11am-9pm'
    })
      .then((response) => {
        console.log(response)
      })
  }

  makeTable = () => {
    axios.post("http://localhost:8080/createTable", {
      Restaurant_id: Math.ceil(Math.random() * 5),
      total_pax: 6,
      current_pax: Math.ceil(Math.random() * 6)
    })
      .then((response) => {
        console.log(response)
      })
  }

  componentWillMount() {
    axios.get("http://localhost:8080")
      .then((response) => {
        console.log(response.data)

        let tableCounter = 0
        let occupiedCounter = 0

        let totalCapacityJSX = response.data.map((table, i) => {
          return table.total_pax
        })
        let currentCapacityJSX = response.data.map((table, i) => {
          return table.current_pax
        })
        response.data.forEach((table, i) => {
          if (table.current_pax !== 0) {
            occupiedCounter++
          }
          return tableCounter++
        })

        this.setState({
          totalCapacity: totalCapacityJSX.reduce((acc, cur) => {
            return acc + cur
          }, 0),
          currentCapacity: currentCapacityJSX.reduce((acc, cur) => {
            return acc + cur
          }, 0),
          totalTables: tableCounter,
          occupiedTables: occupiedCounter
        })
      })
  }


  render() {
    return (
      <div className="App">
        <Nav />
        <div className= "container">
          <Switch>
            <Route exact path='/' render={() => {
              return <Home />
            }} />
            <Route path='/user' render={() => {
              return <User />
            }} />
            <Route path='/ops/:restId' render={(props) => {
              return <Ops {...props} />
            }} />
            <Route path='/owner/:restId' render={(props) => {
              return <Owner {...props}
                            makeRest={this.makeRest}
                            makeTable={this.makeTable} />
            }} />

          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
