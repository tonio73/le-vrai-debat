import React from 'react'
import PropTypes from 'prop-types'

var d3 = require("d3")

const Chart = (props) => {

  const svgRef = React.useRef('')
  const contentRef = React.useRef('')

  React.useEffect(
    () => {

      const svg = d3.select(svgRef.current)
      const contentElement = d3.select(contentRef.current)

      // Zoom & pan
      svg.call(d3.zoom()
        .extent([[0, 0], [props.width, props.height]])
        .scaleExtent([1, 8])
        .on("zoom", zoomed));

      function zoomed() {
        contentElement.attr("transform", d3.event.transform);
      //  xAxis.call(makeXAxis, d3.event.transform.rescaleX(scaleX));
      //  yAxis.call(makeYAxis, d3.event.transform.rescaleY(scaleY));
      }
    })

  return <div>
    <svg id={props.chartId} width={props.width} height={props.height} ref={svgRef}>
      <g ref={contentRef}>
        {props.children}
        </g>
    </svg>
  </div>
}

Chart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  chartId: PropTypes.string
}

export default Chart