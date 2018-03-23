import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import './ownerNav.css'

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
      return <div className="indvButton"><a className="ownerButton waves-effect btn"><i class="material-icons left">local_dining</i><Link to={`/owner/${restaurant.id}/`}>{restaurant.name}</Link></a></div >
    })

    return (
      <div className="ownerNav">
        <h3>Choose Your Restaurant</h3>
        
          {restaurantsJSX}
        
      </div>
    )
  }
}

export default OwnerNav;
