import React, { Component } from 'react';
import './owner.css'
import axios from 'axios'

class Owner extends Component {
    state = {
        oTotalTables: 0,
        oOccupiedTables: 0,
        oTotalCapacity: 0,
        oCurrentCapacity: 0
    }

    componentWillMount() {
    axios.post("http://localhost:8080/restFilter", {
        id: this.props.match.params.restId
    })
        .then((response)=>{
            let tableCounter = 0
            let occupiedCounter = 0

            let ownerCapacityJSX = response.data.map((table, i)=>{
                return table.total_pax
            })
            let ownerOccupiedJSX = response.data.map((table, i) => {
                return table.current_pax
            })
            response.data.forEach((table, i)=>{
                if (table.current_pax !== 0) {
                    occupiedCounter++
                }
                return tableCounter ++
            })

            this.setState({
                oTotalCapacity: ownerCapacityJSX.reduce((acc, cur)=>{
                    return acc + cur
                },0),
                oCurrentCapacity: ownerOccupiedJSX.reduce((acc, cur) => {
                    return acc + cur
                }, 0),
                oTotalTables: tableCounter,
                oOccupiedTables: occupiedCounter
            })
        })
    }

    render() {
        const { restId } = this.props.match.params
        const capPercent = Math.ceil((this.state.oCurrentCapacity/this.state.oTotalCapacity) * 100)

        return (
            <div className="owner">
                <header className="Owner-header col-12">
                    <h2 className="Owner-title">Owner Page, {restId}</h2>
                </header>

                Your restaurant is currently {capPercent}% full
                <br />
                Total tables: {this.state.oTotalTables}
                Tables occupied: {this.state.oOccupiedTables}

                Total capacity: {this.state.oTotalCapacity}
                Current capacity: {this.state.oCurrentCapacity}
                <br />
                <button onClick={this.props.makeRest}>make new restaurant</button>
                <button onClick={this.props.makeTable}>get the table!</button>

            </div>
        );
    }
}

export default Owner;
