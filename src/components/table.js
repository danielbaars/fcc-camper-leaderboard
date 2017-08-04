import axios from 'axios';

import React, { Component } from 'react';

const RECENT = 'recent';
const ALLTIME = 'alltime';
const DESC = 'descending';
const ASC = 'ascending';

const URL_RECENT = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
const URL_ALLTIME = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';

class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: RECENT,
      order: DESC,
      data: []
    };
    this.showList(this.state.list);
    this.showList = this.showList.bind(this);
  }
  tableRow() {
    var array = [];
    if (this.state.order === DESC) {
      array = this.state.data;
    } else {
      array = this.state.data.reverse();
    }
    return array.map((camper, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td><img src={camper.img} className="avatar"/> <strong>{camper.username}</strong></td>
          <td>{camper.recent}</td>
          <td>{camper.alltime}</td>
        </tr>
      );
    });
  }
  showList(list) {
    var _this = this;
    axios.get(list === RECENT ? URL_RECENT : URL_ALLTIME).then(response => {
      _this.setState({
        list: list,
        data: response.data
      });
    });
  }
  render() {
    const clickable = {
      cursor: "pointer"
    };
    return (
      <table className="table table-striped">
        <thead className="thead-default">
          <tr>
            <th className="number">#</th>
            <th className="camper-name">Camper Name</th>
            <th onClick={() => this.showList(RECENT)} style={clickable} className={"recent " + (this.state.list === RECENT ? 'active' : '')}>Points in past 30 days</th>
            <th onClick={() => this.showList(ALLTIME)} style={clickable} className={"alltime " + (this.state.list === ALLTIME ? 'active' : '')}>All time points</th>
          </tr>
        </thead>
        <tbody>
          {this.tableRow()}
        </tbody>
      </table>
    );
  }
}

export default Table;
