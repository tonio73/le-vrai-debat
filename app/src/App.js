import React from 'react';
import axios from 'axios';
import './App.css';
import graphData from './data/le-vrai-debat.json'
import Chart from './components/Chart'
import NetworkGraph from './components/NetworkGraph'
import ContributionList from './components/ContributionList'

var d3 = require("d3")

function App() {

  // Topic color palettes for node shape
  // From https://htmlcolorcodes.com/fr/tableau-de-couleur/tableau-de-couleur-design-plat/
  // Column 3
  const colorPalette = ['#E6B0AA', '#D7BDE2', '#A9CCE3', 
                        '#A3E4D7', '#FAD7A0', '#F5B7B1', 
                        '#D2B4DE', '#A9DFBF', '#F9E79F', ]
  // Topic color palettes for texts and scale
  // From https://htmlcolorcodes.com/fr/tableau-de-couleur/tableau-de-couleur-design-plat/
  // Column 5 or 6
  const colorPaletteScale = ['#CD6155', '#9B59B6', '#2980B9', 
                            '#1ABC9C', '#F39C12', '#E74C3C',
                            '#8E44AD',  '#27AE60', '#F1C40F', ]
  const colorScaleRoot = '#808B96'
  // Contribution "quantiles" = repartition by importance
  const quantiles = [500, 1000, 2500, 4000]

  const [loaded, setLoaded] = React.useState(false)
  const [filterTitle, setFilterTitle] = React.useState({topic: null, keyword: null})
  const [selectedContributions, setSelectedContributions] = React.useState([])
  const [selectionId, setSelectionId] = React.useState("root_unknown")
  const [selectedColor, setSelectedColor] = React.useState('black')

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
              onClick={selectTopic} colors={colorPalette}></NetworkGraph>
          </Chart>
        </div>
        <div className="contributions-wrap">
          <ContributionList title={filterTitle} contributions={selectedContributions} id={selectionId} 
            colorPalette={colorPaletteScale} quantiles={quantiles}></ContributionList>
        </div>
      </div>
    </div>
  );
}

export default App;
