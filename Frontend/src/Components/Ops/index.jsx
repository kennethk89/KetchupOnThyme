import React, { Component } from 'react';

class Ops extends Component {
    render() {
        const { restId } = this.props.match.params
        return (
            <div className="Ops">
                <header className="Ops-header">
                    <h2 className="Ops-title">Operations Page</h2>
                    <h5>Restaurant's Name, {restId}</h5>
                </header>

                <div className="restoInfo">
                    Total tables: {this.props.totalTables}
                    Tables occupied: {this.props.occupiedTables}

                    Total capacity: {this.props.totalCapacity}
                    Current capacity: {this.props.currentCapacity}
                </div>

                <div>
                    Table 1
                    Size: 8
                    Seated: 8
                </div>

                <div>
                    Table 2
                    Size: 8
                    Seated: 7
                </div>

                <div>
                    Table 3
                    Size: 8
                    Seated: 0
                </div>

                <div>
                    Table 4
                    Size: 4
                    Seated: 4
                </div>

                <div>
                    Table 5
                    Size: 4
                    Seated: 3
                </div>

                <div>
                    Table 6
                    Size: 4
                    Seated: 4
                </div>

                <div>
                    Table 7
                    Size: 4
                    Seated: 4
                </div>

                <div>
                    Table 8
                    Size: 2
                    Seated: 0
                </div>

                <div>
                    Table 9
                    Size: 2
                    Seated: 2
                </div>

                <div>
                    Table 10
                    Size: 2
                    Seated: 1
                </div>

                <div>
                    Table 11
                    Size: 2
                    Seated: 2
                </div>

                <div>
                    Table 12
                    Size: 2
                    Seated: 2
                </div>

            </div>
        );
    }
}

export default Ops;