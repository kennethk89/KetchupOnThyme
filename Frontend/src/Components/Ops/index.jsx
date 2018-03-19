import React, { Component } from 'react';
import axios from 'axios'
import './ops.css'

class Ops extends Component {
  state = {
    opTotalTables: 0,
    opOccupiedTables: 0,
    opTotalCapacity: 0,
    opCurrentCapacity: 0,
    restaurantName: 'Restaurant Name',
    tableInfo: []
  }

  componentWillMount() {
    axios.post("http://localhost:8080/opFilter", {
      id: this.props.match.params.restId
    })
      .then((response) => {
        console.log(response.data)
        let tableCounter = 0
        let occupiedCounter = 0

        let opCapacityJSX = response.data.map((table, i) => {
          return table.total_pax
        })
        let opOccupiedJSX = response.data.map((table, i) => {
          return table.current_pax
        })
        response.data.forEach((table, i) => {
          if (table.current_pax !== 0) {
            occupiedCounter++
          }
          return tableCounter++
        })

        this.setState({
          opTotalCapacity: opCapacityJSX.reduce((acc, cur) => {
            return acc + cur
          }, 0),
          opCurrentCapacity: opOccupiedJSX.reduce((acc, cur) => {
            return acc + cur
          }, 0),
          opTotalTables: tableCounter,
          opOccupiedTables: occupiedCounter,
          restaurantName: response.data[0].name,
          tableInfo: response.data
        })
      })
  }

  updateTable = (x,y) => {
    console.log('update table')
    console.log(`updated pax: ${x}, table id: ${y}`)
    //backend functions
    axios.put("http://localhost:8080/update", {
      updatedPax: x,
      tableId: y
    })
      // .then((response) => {
      //   this.setState({
      //     toDos: response.data
      //   })
      // })
  }

  clearTable = (y) => {
    console.log('clear table')
    console.log(`table id: ${y}`)
    //reset the table pax to zero
  }

  render() {
    const { restId } = this.props.match.params
    return (
      <div className="Ops">
        <header className="Ops-header">
          <h2 className="Ops-title">Operations Page</h2>
          <h5>{this.state.restaurantName}, {restId}</h5>
        </header>

        <div className="restoInfo">
          <p className="info">Total tables: {this.state.opTotalTables}</p>
          <p className="info">Tables occupied: {this.state.opOccupiedTables}</p>
          <p className="info">Total capacity: {this.state.opTotalCapacity}</p>
          <p className="info">Current capacity: {this.state.opCurrentCapacity}</p>
        </div>


        <div className="row">
          {this.state.tableInfo.map((table, i) => {
            let selector = 0
            let totalTablesJSX = [
              <option disabled key="0">Select current table capacity</option>,
            ]
            for (let j = 1; j <= table.total_pax; j++) {
              totalTablesJSX.push(<option value={j} key={j}>{j}</option>)
              selector = j;
            }

            return <div key={i}>

              <div className="col s12 m4">
                <div className="card blue-grey darken-1">
                  <div className="card-content white-text">
                    <span className="card-title">Table {table.id}</span>
                    <p>Size: {table.total_pax}</p>
                    <p>Seated: {table.current_pax}</p>
                    <label>Update seating</label>

                    {/* SOLVE THIS!! */}
                    <select ref={self => this[`${i}${selector}`] = self}
                      className="browser-default tableFunctions black-text"
                      onChange={() => { this.updateTable(this[`${i}${selector}`].value, table.id) }} >
                      {totalTablesJSX}
                    </select>

                    {/* <button onClick={() => { this.updateTable(this[`${i}${selector}`].value)}} className="waves-effect waves-light btn">Update seating</button> */}

                    <button className="waves-effect waves-light btn" onClick={()=>{this.clearTable(table.id)}} >Clear table</button>


                  </div>
                </div>
              </div>
            </div>
          })}

        </div>

      </div>
    );
  }
}

export default Ops;