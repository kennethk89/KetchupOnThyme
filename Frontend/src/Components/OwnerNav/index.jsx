import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

class OwnerNav extends Component {
  state = {
    restaurants: []
  }

  componentWillMount() {
    axios.get("http://localhost:8080/getRestaurants")
      .then((response) => {
        this.setState({
          restaurants: response.data
        })
        console.log(this.state.restaurants)
      })
  }

  render() {
    let restaurantsJSX = this.state.restaurants.map((restaurant, i) => {
      return <div><Link to={`/owner/${restaurant.id}/`}>{restaurant.name}</Link></div>
    })
    
    return (

      <div className="owner">
        {restaurantsJSX}
      </div>
    )
  }
}

export default OwnerNav;
