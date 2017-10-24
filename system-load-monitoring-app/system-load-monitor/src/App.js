import React, { Component } from 'react';
import Gauge from 'react-gauge';
import socketIOClient from "socket.io-client";
import LineChart from 'react-linechart'

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://localhost:8000"
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => this.setState({ response: data }));
  }

  render() {
    const { response } = this.state;
    let data = [{
      color: "steelblue",
      points: [
      {
        x: 0,
        y: 0
      },
      {
        x: 1,
        y: 25.09
      },
      {
        x: 2,
        y: 24.97
      },
      {
        x: 3,
        y: 24.03
      }]
    }];

    return (
      <div style={{ textAlign: "center" }}>
        {response
          ? <p>
              cpuload: {response[0]} 
            </p>
          : <p>Loading...</p>}

        <Gauge
          value={response[0]}
          gradient={[
            {p: 0, color: "#ff0000"},
            {p: 50, color: "#ffff00"},
            {p: 75, color: "#ffc107"},
            {p: 100, color: "#00920b"},
          ]}
          key='gauge-2'
        />

        <LineChart
          width={600}
          height={400}
          data={data}
        />
      </div>
    );
  }
}

export default App;