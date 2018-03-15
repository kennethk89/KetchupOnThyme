import React, { Component } from 'react';
import './owner.css'

class Owner extends Component {
    render() {
        const { restId } = this.props.match.params
        const capPercent = Math.ceil((this.props.currentCapacity/this.props.totalCapacity) * 100)

        return (
            <div className="owner">
                <header className="Owner-header col-12">
                    <h2 className="Owner-title">Owner Page, {restId}</h2>
                </header>

                Your restaurant is currently {capPercent}% full
                <br />
                Total tables: {this.props.totalTables}
                Tables occupied: {this.props.occupiedTables}

                Total capacity: {this.props.totalCapacity}
                Current capacity: {this.props.currentCapacity}
                <br />
                <button onClick={this.props.makeRest}>make new restaurant</button>
                <button onClick={this.props.makeTable}>get the table!</button>

            </div>
        );
    }
}

export default Owner;
