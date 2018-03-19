import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import './user.css'
import axios from 'axios'

const style = {
    width: '35%',
    height: '70%'
}

class User extends Component {
    state = {
        searchLocation: '',
        coordinates: {
            lat: 49.2827,
            lng: -123.1207
        }
    }

    searchBar = (e) => {
        this.setState({
            searchLocation: e.target.value
        })
    }


    handleSearch = (searchLocation) => {

        axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.coordinates.lat},${this.state.coordinates.lng}&radius=50000&keyword=${searchLocation}&key=AIzaSyA2I6XCDGejIIrmrgMA0mLwKGOYQbGC-pg`)
            .then((res) => {
                console.log(res.data.results[0].geometry.location)

                this.setState({
                    coordinates: res.data.results[0].geometry.location,
                    searchLocation: ''
                })
            })
    }


    render() {
        console.log(this.state.coordinates)
        return (
            <div className="User">

                <div className="row">
                    <header className="col s12 m12 l12">
                        <h2 className="User-title">User Page</h2>
                    </header>

                    <label>Search for Restaurants</label>
                    <input type="text" value={this.state.searchLocation} onChange={this.searchBar} onKeyDown={(e) => { if (e.keyCode === 13) this.handleSearch(this.state.searchLocation) }}>
                    </input>

                    <div className="gMap col s12 m6 l6">
                        <Map google={this.props.google}
                            style={style}
                            center={{
                                lat: this.state.coordinates.lat,
                                lng: this.state.coordinates.lng
                            }}>
                            {/* <Marker
                                title={'The marker`s title will appear as a tooltip.'}
                                name={'SOMA'}
                                position={this.state.coordinates} /> */}
                            <Marker
                                name={'Dolores park'}
                                position={this.state.coordinates} />
                        </Map>
                    </div>

                    <div className="apiBox col s12 m6 l6">
                        <div className="apiData col s12 m12 l12">
                            Google's rating:___ <br />
                            Yelp's rating:___ <br />
                            Zomato's rating:___
                        </div>

                        <div className="restoData col s12 m12 l12">
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

export default GoogleApiWrapper({
    apiKey: ('AIzaSyA2I6XCDGejIIrmrgMA0mLwKGOYQbGC-pg')
})(User)
