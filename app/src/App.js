import React from 'react';
import './App.css';
import topics from './topics.json'
import Chart from './components/Chart'
import ChartTitle from './components/ChartTitle'
import WordCloud from './components/WordCloud'

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Chart chartId='first' width={1000} height={800}>
            <WordCloud x={350} y={300} width={300} height={200}  words={topics[0]}></WordCloud>
            <WordCloud x={600} y={250} width={300} height={200} words={topics[1]}></WordCloud>
            <WordCloud x={850} y={300} width={300} height={200} words={topics[2]}></WordCloud>
            <WordCloud x={300} y={500} width={300} height={200} words={topics[3]}></WordCloud>
            <ChartTitle x={450} y={380} texts={['Le Vrai']}></ChartTitle>
            <ChartTitle x={450} y={440} texts={['Débat']}></ChartTitle>
            <WordCloud x={900} y={500} width={300} height={200} words={topics[4]}></WordCloud>
            <WordCloud x={350} y={700} width={300} height={200} words={topics[5]}></WordCloud>
            <WordCloud x={600} y={750} width={300} height={200}  words={topics[6]}></WordCloud>
            <WordCloud x={850} y={700} width={300} height={200} words={topics[7]}></WordCloud>
          </Chart>
        </div>
      </header>
    </div>
  );
}

export default App;
