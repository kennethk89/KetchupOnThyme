import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import './user.css'
import axios from 'axios'

const style = {
    width: '100%',
    height: '70%'
}

class User extends Component {
    state = {
        searchLocation: '',
        coordinates_lat: 49.2827,
        coordinates_lng: -123.1207,
        yelpRes: {},
        searchAddress0: ' ',
        searchAddress1: ' ',
        searchAddress2: ' ',
        allRestaurants: [],
        restaurantNames: [],
        totalCapacity: 0,
        currentCapacity: 0,
        totalTables: 0,
        occupiedTables: 0
    }

    searchBar = (e) => {
        this.setState({
            searchLocation: e.target.value
        })
    }

    handleSearch = (searchLocation) => {

        console.log(this.state.allRestaurants)
        if (this.state.restaurantNames.includes(searchLocation) === true) {
            console.log('hi there')
            axios.post("http://localhost:8080/getTables", {
                name: searchLocation
            })
                .then((response) => {
                    console.log(response.data)

                //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    let tableCounter = 0
                    let occupiedCounter = 0

                    let capacityJSX = response.data.map((table, i) => {
                        return table.total_pax
                    })
                    let occupiedJSX = response.data.map((table, i) => {
                        return table.current_pax
                    })
                    response.data.forEach((table, i) => {
                        if (table.current_pax !== 0) {
                            occupiedCounter++
                        }
                        return tableCounter++
                    })

                    this.setState({
                        totalCapacity: capacityJSX.reduce((acc, cur) => {
                            return acc + cur
                        }, 0),
                        currentCapacity: occupiedJSX.reduce((acc, cur) => {
                            return acc + cur
                        }, 0),
                        totalTables: tableCounter,
                        occupiedTables: occupiedCounter
                    })
                //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

                })

        } else {
            axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.coordinates_lat},${this.state.coordinates_lng}&radius=50000&keyword=${searchLocation}&key=AIzaSyA2I6XCDGejIIrmrgMA0mLwKGOYQbGC-pg`)
                .then((res) => {
                    axios.post('http://localhost:8080/yelpSearch', {
                        searchLocation: searchLocation,
                    })
                        .then((response) => {
                            console.log(response.data)
                            this.setState({
                                yelpRes: response.data,
                                coordinates_lat: response.data.coordinates.latitude,
                                coordinates_lng: response.data.coordinates.longitude,
                                searchAddress0: response.data.location.display_address[0], searchAddress1: response.data.location.display_address[1],
                                searchAddress2: response.data.location.display_address[2]
                            })
                        })
                    this.setState({
                        searchLocation: ''
                    })
                })

        }


        // axios.get('http://localhost:8080/getRestaurants')
        // .then((res)=>{
        //     res.data.map((restaurant)=>{
        //         console.log(restaurant.name)
        //         console.log(searchLocation)
        //         // (restaurant.name===searchLocation)? console.log('hi') :
        //         // console.log('bye')
        //     })
        // }) 




        // (searchLocation==="yo") ? console.log('hi baby') :
        // console.log('get lost')



    }

    componentWillMount() {
        axios.get('http://localhost:8080/getRestaurants')
            .then((res) => {
                let namesJSX = res.data.map((store, i) => {
                    return store.name
                })
                this.setState({
                    restaurantNames: namesJSX,
                    allRestaurants: res.data
                })
            })
    }

    render() {
        return (
            <div className="User">
                <div className="row">
                    <div className="col s12 m12 l12">
                        <h2 className="User-title">User Page</h2>
                    </div>

                    <label>Search for Restaurants</label>

                    <input type="text" value={this.state.searchLocation} onChange={this.searchBar} onKeyDown={(e) => { if (e.keyCode === 13) this.handleSearch(this.state.searchLocation) }}>
                    </input>

                    <div className="gMap col s12 m6 l6">
                        <Map google={this.props.google}
                            style={style}
                            center={{
                                lat: this.state.coordinates_lat,
                                lng: this.state.coordinates_lng
                            }}>

                            {/* <Marker
                                name={'Your position'}
                                position={{ lat: 49.28306734995162, lng: -123.11726121971797 }}
                                 /> */}

                            <Marker
                                name={'Dolores park'}
                                position={{ lat: this.state.coordinates_lat, lng: this.state.coordinates_lng }} />
                        </Map>
                    </div>

                    <div className="apiBox col s12 m6 l6">
                        <div className="apiData col s12 m12 l12">
                            <h4>{this.state.yelpRes.name}</h4>
                            Rating: <p className="yelpInfo">{this.state.yelpRes.rating}</p>

                            Price: <p className="yelpInfo">{this.state.yelpRes.price}</p>

                            Call: <p className="yelpInfo">{this.state.yelpRes.display_phone}</p>

                            Address: <p className="yelpInfo">{this.state.searchAddress0}</p>
                            <p className="yelpInfo">{this.state.searchAddress1}</p>
                            <p className="yelpInfo">{this.state.searchAddress2}</p>
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
