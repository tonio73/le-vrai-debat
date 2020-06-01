import React from 'react'

var d3 = require("d3")

const ChartTitle = (props) => {

  const titleRef = React.useRef('')

  // useEffect allow for d3 to interact with the DOM outside of React
  React.useEffect(
    () => {

      const cloudELement = d3.select(titleRef.current)
      const x = props.x
      const y = props.y

      cloudELement
        .attr("transform", "translate(" + x + "," + y + ")")
        .selectAll("text")
        .data(props.texts)
        .enter()
        .append("text")
        .style("font-size", "48px")
        .style("font-family", "Helvetica")
        .attr("text-anchor", "middle")
        .text((d)=> d);
    })

  return <g ref={titleRef}></g>
}

export default ChartTitle