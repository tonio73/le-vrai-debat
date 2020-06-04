import React from 'react'
import PropTypes from 'prop-types'
import cloud from '../d3-cloud/index'
import Tooltip from './Tooltip'

var d3 = require("d3")

const WordCloud = (props) => {

  const cloudRef = React.useRef('')
  const [tooltip, setTooltip] = React.useState(false)

  const x = props.x - props.width / 2
  const y = props.y - props.height / 2

  // useEffect allow for d3 to interact with the DOM outside of React
  React.useEffect(
    () => {
      var layout = cloud()
        .size([props.width, props.height])
        .words(props.words)
        .padding(1)
        .rotate(function () { return ~~(Math.random() * 2) * 90; })
        //.font("Impact")
        .fontSize(function (d) { return d.size; })
        .on("end", draw);

      layout.start();

      function draw(words) {
        const cloudELement = d3.select(cloudRef.current)

        cloudELement
          .attr("transform", "translate(" + x + "," + y + ")")
          .selectAll("text")
          .data(words)
          .enter().append("text")
          .style("font-size", function (d) { return d.size + "px"; })
          .style("font-family", "Impact")
          .style("fill", props.color)
          .attr("text-anchor", "middle")
          .attr("transform", function (d) {
            return "translate(" + [d.x, d.y] + "),rotate(" + d.rotate + ")";
          })
          .text(function (d) { return d.text; })
          .on("mouseover", function (d) {
            setTooltip(true)
          })
          .on("mouseout", function (d) {
            setTooltip(false)
          })
          .on("click", function(d){
            props.onClick(props.id)
          })
      }
    })

  return <g className="word-cloud">
    <g ref={cloudRef}>
    </g>
    {tooltip && <Tooltip x={x} y={y} info={props.title}></Tooltip>}
  </g>
}

WordCloud.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
}

export default WordCloud