import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './owner.css'
import axios from 'axios'

class Owner extends Component {
    state = {
        owTotalTables: 0,
        owOccupiedTables: 0,
        owTotalCapacity: 0,
        owCurrentCapacity: 0
    }

    componentWillMount() {
        axios.post("http://localhost:8080/ownerFilter", {
            id: this.props.match.params.restId
        })
            .then((response) => {
                let tableCounter = 0
                let occupiedCounter = 0

                let ownerCapacityJSX = response.data.map((table, i) => {
                    return table.total_pax
                })
                let ownerOccupiedJSX = response.data.map((table, i) => {
                    return table.current_pax
                })
                response.data.forEach((table, i) => {
                    if (table.current_pax !== 0) {
                        occupiedCounter++
                    }
                    return tableCounter++
                })

                this.setState({
                    owTotalCapacity: ownerCapacityJSX.reduce((acc, cur) => {
                        return acc + cur
                    }, 0),
                    owCurrentCapacity: ownerOccupiedJSX.reduce((acc, cur) => {
                        return acc + cur
                    }, 0),
                    owTotalTables: tableCounter,
                    owOccupiedTables: occupiedCounter
                })
            })
    }

    render() {
        const { restId } = this.props.match.params
        const capPercent = Math.ceil((this.state.owCurrentCapacity / this.state.owTotalCapacity) * 100)

        return (
            <div className="owner">
                <header className="Owner-header col-12">
                    <h2 className="Owner-title">Owner Page, {restId}</h2>
                </header>
                
                <p className="ownerInfo">Your restaurant is currently {capPercent}% full</p>
                <p className="ownerInfo">Total tables: {this.state.owTotalTables}</p>
                <p className="ownerInfo">Tables occupied: {this.state.owOccupiedTables}</p>
                <p className="ownerInfo">Total capacity: {this.state.owTotalCapacity}</p>
                <p className="ownerInfo">Current capacity: {this.state.owCurrentCapacity}</p>
                <button onClick={this.props.makeRest}>make new restaurant</button>
                <button onClick={this.props.makeTable}>get the table!</button>

                <Link to={`/ops/${restId}`}><button>Go to ops</button></Link>
            </div>
        );
    }
}

export default Owner;
