import React, { Component } from 'react';
import './owner.css'

class Owner extends Component {
    render() {
        return (
            <div className="owner">
                <header className="Owner-header col-12">
                    <h2 className="Owner-title">Owner Page</h2>
                </header>

                Your restaurant is currently __% full
                <br/>
                Total tables: {this.props.totalTables}
                Tables occupied: {this.props.tablesOccupied}

                Total capacity: 50
                Current capacity: 37

            </div>
        );
    }
}

export default Owner;
