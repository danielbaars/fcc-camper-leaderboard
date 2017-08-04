import React, { Component } from 'react';

import Table from './table';

export default class App extends Component {
  render() {
    const headerStyling = {
      marginBottom: 24
    };
    return (
      <div>
        <h1 style={headerStyling}>Camper Leaderboard</h1>
        <Table />
      </div>
    );
  }
}
