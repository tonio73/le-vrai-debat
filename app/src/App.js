import React from 'react';
import axios from 'axios';
import './App.css';
import graphData from './data/le-vrai-debat.json'
import Chart from './components/Chart'
import NetworkGraph from './components/NetworkGraph'
import ContributionList from './components/ContributionList'

var d3 = require("d3")

function App() {

  const [loaded, setLoaded] = React.useState(false)
  const [filterTitle, setFilterTitle] = React.useState({topic: null, keyword: null})
  const [selectedContributions, setSelectedContributions] = React.useState([])
  const [selectionId, setSelectionId] = React.useState("root_unknown")

  // Get the contributions related to the topic (& keyword) or the whole (id="root")
  function getTopicContributions(topic_id, keyword_id) {
    if (keyword_id === undefined || keyword_id === null) {
      const filePath = '/data/topic_' + topic_id + '_main_contributions.json'
      axios.get(filePath)
        .then((result) => {
          setSelectedContributions(result.data)
        })
        .catch((error) => {
          console.log(error);
        })
    }
    else {
      const filePath = '/data/topic_' + topic_id + '_keyword_' + keyword_id + '_main_contributions.json'
      axios.get(filePath)
        .then((result) => {
          setSelectedContributions(result.data)
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }

  // Update the view when a topic (and a keyword) are selected
  function selectTopic(topic_id, topic_title, keyword_id, keyword) {
    console.log("Topic clicked: topic='" + topic_title + "', keyword=" + keyword)

    setFilterTitle({topic: topic_title, keyword: keyword})
    getTopicContributions(topic_id, keyword_id)
    setSelectionId('' + topic_id + '_' + ((keyword_id !== null)?keyword_id:'unknown'))
  }

  // Select root by default
  React.useEffect(() => {
    if(!loaded){
      selectTopic('root', "Le Vrai Débat", null)
      setLoaded(true)
    }
  }, [loaded])

  // Viewport sizing dimensions but not to set hard dimensions on the graph
  const width = 700, height = 700;

  return (
    <div className="App">
      <div className="app-wrap">
        <div className="chart-wrap">
          <Chart chartId='first' width={width} height={height} zoomtool={false}>
            <NetworkGraph width={width} height={height} data={graphData}
              onClick={selectTopic} colors={d3.schemeSet3}></NetworkGraph>
          </Chart>
        </div>
        <div className="contributions-wrap">
          <ContributionList title={filterTitle} contributions={selectedContributions} id={selectionId}></ContributionList>
        </div>
      </div>
    </div>
  );
}

export default App;
