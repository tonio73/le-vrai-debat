import React from 'react';
import './App.css';
import topics from './topics.json'
import Chart from './components/Chart'
import ChartTitle from './components/ChartTitle'
import WordCloud from './components/WordCloud'

var d3 = require("d3")

function App() {

  function topic_click(topic){
    console.log("Topic clicked: " + topic)
  }

  const colors = d3.schemeCategory10
  const tooltipDivRef = React.useRef('')

  const cloud_width = 250, cloud_height = 150;
  const col_left = 250, col_width = 300, col_offset = 50;
  const row_top = 150, row_height = 200, row_offset = 50;

  return (
    <div className="App">
      <header className="App-header">
        <div className="chart-wrap">
          <Chart chartId='first' width={900} height={600}>
            <WordCloud id={1} x={col_left + col_offset} y={row_top + row_offset} width={cloud_width} height={cloud_height} words={topics[0]} color={colors[0]} 
              title='Topic 1' tooltipDiv={tooltipDivRef} onClick={topic_click}></WordCloud>
            <WordCloud id={2} x={col_left + col_width} y={row_top} width={cloud_width} height={cloud_height} words={topics[1]} color={colors[1]} 
              title='Topic 2' tooltipDiv={tooltipDivRef} onClick={topic_click}></WordCloud>
            <WordCloud id={3} x={col_left + 2 * col_width - col_offset} y={row_top + row_offset} width={cloud_width} height={cloud_height} words={topics[2]} color={colors[2]} 
              title='Topic 3' tooltipDiv={tooltipDivRef} onClick={topic_click}></WordCloud>
            
            <WordCloud id={4} x={col_left} y={row_top + row_height} width={cloud_width} height={cloud_height} words={topics[3]} color={colors[3]} 
              title='Topic 4' tooltipDiv={tooltipDivRef} onClick={topic_click}></WordCloud>
            <ChartTitle x={col_left + col_width - 100} y={row_top + row_height - 100} texts={['Le Vrai']}></ChartTitle>
            <ChartTitle x={col_left + col_width - 100} y={row_top + row_height - 50} texts={['Débat']}></ChartTitle>
            <WordCloud id={5} x={col_left + 2 * col_width} y={row_top + row_height} width={cloud_width} height={cloud_height} words={topics[4]} color={colors[4]}
              title='Topic 5' tooltipDiv={tooltipDivRef} onClick={topic_click}></WordCloud>
            
            <WordCloud id={6} x={col_left + col_offset} y={row_top + 2 * row_height - row_offset} width={cloud_width} height={cloud_height} words={topics[5]} color={colors[5]} 
              title='Topic 6' tooltipDiv={tooltipDivRef} onClick={topic_click}></WordCloud>
            <WordCloud id={7} x={col_left + col_width} y={row_top + 2 * row_height} width={cloud_width} height={cloud_height}  words={topics[6]} color={colors[6]} 
              title='Topic 7' tooltipDiv={tooltipDivRef} onClick={topic_click}></WordCloud>
            <WordCloud id={8} x={col_left + 2 * col_width - col_offset} y={row_top + 2 * row_height - row_offset} width={cloud_width} height={cloud_height} words={topics[7]} color={colors[7]} 
              title='Topic 8' tooltipDiv={tooltipDivRef} onClick={topic_click}></WordCloud>
          </Chart>
        </div>
        <div ref={tooltipDivRef}></div>
      </header>
    </div>
  );
}

export default App;
