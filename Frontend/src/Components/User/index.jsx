import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import './user.css'
import axios from 'axios'

const style = {
    width: '43%',
    height: '70%'
}

class User extends Component {
    state = {
        searchLocation: '',
        coordinates: {
            lat: 49.2827,
            lng: -123.1207
        },
        yelpRating: 0,
        
    }

    searchBar = (e) => {
        this.setState({
            searchLocation: e.target.value
        })
    }

    handleSearch = (searchLocation) => {
        console.log(searchLocation)
        axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.coordinates.lat},${this.state.coordinates.lng}&radius=50000&keyword=${searchLocation}&key=AIzaSyA2I6XCDGejIIrmrgMA0mLwKGOYQbGC-pg`)
            .then((res) => {
                axios.post('http://localhost:8080/yelpSearch', {
                    searchLocation: searchLocation,
                    coordinates: res.data.results[0].geometry.location
                })
                .then((response)=>{
                    this.setState({
                        yelpRating: response.data
                    })
                })
                this.setState({
                    coordinates: res.data.results[0].geometry.location,
                    searchLocation: ''
                })
            })
    }

    render() {
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

                            <Marker
                                name={'Your position'}
                                position={{ lat: 49.28306734995162, lng: -123.11726121971797 }}
                                 />

                            <Marker
                                name={'Dolores park'}
                                position={this.state.coordinates} />
                        </Map>
                    </div>

                    <div className="apiBox col s12 m6 l6">
                        <div className="apiData col s12 m12 l12">
                            Google's rating:___ <br />
                            Yelp's rating: {this.state.yelpRating} <br />
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
