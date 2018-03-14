import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './nav.css'

class Nav extends Component {
    render() {
        return (
            <div className="container-fluid Nav">
                <header className="App-header">
                    <Link exact path to='/'><img id="Logo" src='/Images/Logo/ketchup.jpg' alt="sorry" /></Link><h1 className="App-title">KETCHUP ON THYME</h1>
                </header>

            </div>
        );
    }
}

export default Nav;