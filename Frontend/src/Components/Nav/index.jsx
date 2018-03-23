import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './nav.css'

class Nav extends Component {
    render() {
        return (
            <div className="container Nav">
                <header className="App-header">
                    <Link to='/'><img id="Logo" src='/Images/Logo/lolologo.png' alt="sorry" /></Link>
                </header>

            </div>
        );
    }
}

export default Nav;