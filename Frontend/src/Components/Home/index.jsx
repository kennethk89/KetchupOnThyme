import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './home.css'

class Home extends Component {
    render() {
        return (
            <div className="container-fluid Home">
                <header className="Home-header">
                    <h2 className="Home-title">Home Page</h2>
                    <p>
                        Hi there, select your user profile:
                    </p>
                    <button><Link to='/user'>User</Link></button>
                    <button><Link to='/ops'>Operations</Link></button>
                    <button><Link to='/owner'>Owner</Link></button>
                </header>
            </div>
        );
    }
}

export default Home;