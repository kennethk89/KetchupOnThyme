import React, { Component } from 'react';
import './user.css'

class User extends Component {
    render() {
        return (
            <div className="Container User">

                <div className="row">
                    <header className="User-header col-12">
                        <h2 className="User-title">User Page</h2>
                    </header>

                    <div className="gMap col-lg-6 col-md-6 col-sm-12">
                        Map goes here
                    </div>

                    <div className="apiBox col-lg-6 col-md-6 col-sm-12">
                        <div className="apiData col-12">
                            Google's rating:___ <br />
                            Yelp's rating:___ <br />
                            Zomato's rating:___
                        </div>
                        
                        <div className="restoData col-12">
                            Current status: (full / almost full / taking customers)<br />
                            ___ tables of ___ available,<br />
                            ___ tables of ___ available,<br />
                            ___ tables of ___ available,<br />
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

export default User;
