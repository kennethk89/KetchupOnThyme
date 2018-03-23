import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './home.css'

class Home extends Component {
    render() {
        return (
            <div className="container-fluid Home">
                <header className="Home-header">
                <div className ="hero">
                    <p className="Home-intro">Ketchup on Thyme is a data-centric, web application that provide users with live data on the occupancy of a restaurant at any given time. To make this work, customers and restaurants would have to be using the same application and the app’s data would be created and destroyed by restaurant hosts as customers enter or leave the restaurant.</p>

                    <h3 className="Home-intro">Get Started!</h3>
                        <Link to='/user'><a class="user-button waves-effect waves-light btn-large"><i class="material-icons left">face</i>User</a></Link>
                        
                        <span>             </span>

                        <Link to='/owner'><a class="owner-button waves-effect waves-light btn-large"><i class="material-icons right">local_atm</i>Owner</a></Link>

                </div>
                </header>
            </div>
        );
    }
}

export default Home;