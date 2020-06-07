import React from 'react';
import './App.css';
import graph_data from './data/le-vrai-debat.json'
import Chart from './components/Chart'
import NetworkGraph from './components/NetworkGraph'

var d3 = require("d3")

function App() {

  function topic_click(topic){
    console.log("Topic clicked: " + topic)
  }

  const colors = d3.schemeSet3 //d3.schemeCategory10
  
  return (
    <div className="App">
      <header className="App-header">
        <div className="chart-wrap">
          <Chart chartId='first' width={900} height={600} zoomtool={false}>
            <NetworkGraph width={900} height={600} data={graph_data} strength={7000} 
              onClick={topic_click} colors={colors}></NetworkGraph>
          </Chart>
        </div>
      </header>
    </div>
  );
}

export default App;
