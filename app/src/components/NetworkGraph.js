import React from 'react'
import PropTypes from 'prop-types'
//UNSTABLE import Tooltip from './Tooltip'

const d3 = require("d3")

const NetworkGraph = (props) => {

  const graph = props.data

  const ring1Radius = 250, ring1RadiusDelta = 30;
  const ring1PhaseShift = 2 * Math.PI / (graph.nodes.length - 1);

  const defaultRadiusX = 60, defaultRadiusY = 50;
  // Default font size [px]
  const defaultFontSize = 14;

  const linkRef = React.useRef(''), nodeRef = React.useRef(''), labelRef = React.useRef('');
  //const [tooltip, setTooltip] = React.useState(false)
  //const [tooltipText, setTooltipText] = React.useState('')

  function getRadiusX(d) {
    return (d.votesCount) ? (8 * Math.log(d.votesCount)) : defaultRadiusX;
  }

  function getRadiusY(d) {
    return (d.votesCount) ? (4 * Math.log(d.votesCount)) : defaultRadiusY;
  }

  function getFontSize(d) {
    return ((d.votesCount) ? (2 * Math.log(d.votesCount / Math.max(30, d.name.length))) : defaultFontSize);
  }

  function getColor(d) {
    if (d.id === 'root')
      return '#fafafe'
    return props.colors[d.id % props.colors.length]
  }

  function getLinkTargetX(d) {
    return centerX + ring1Radius * Math.cos(ring1PhaseShift * d.target_id)
  }

  function getLinkTargetY(d) {
    return centerY + ring1Radius * Math.sin(ring1PhaseShift * d.target_id)
  }

  function getNodeX(d) {
    if(d.id === 'root') {
      return centerX
    }
    return centerX + (ring1Radius - ring1RadiusDelta * (d.id & 1)) * Math.cos(ring1PhaseShift * d.id)
  }

  function getNodeY(d) {
    if(d.id === 'root') {
      return centerY
    }
    return centerY + (ring1Radius - ring1RadiusDelta * (d.id & 1)) * Math.sin(ring1PhaseShift * d.id)
  }

  const centerX = props.width / 2, centerY = props.height / 2

  // useEffect allow for d3 to interact with the DOM outside of React
  React.useEffect(
    () => {

      // Links
      d3.select(linkRef.current)
        .attr("class", "link")
        .selectAll("line")
        .data(graph.links)
        .enter()
        .append("line")
        .attr("x1", centerX)
        .attr("y1", centerY)
        .attr("x2", getLinkTargetX)
        .attr("y2", getLinkTargetY);

      // Nodes
      const nodes = d3.select(nodeRef.current)
        .selectAll("g")
        .data(graph.nodes)
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr("transform", d => "translate(" + getNodeX(d) + "," + getNodeY(d) + ")")

      nodes.on("click", d => {
        const selColor = getColor(d)
        const selSubFontSize = 0.8 * getFontSize(d)

        // Set selection on node
        nodes.selectAll('ellipse')
          .classed('selected', e => e.id === d.id)

        nodes.filter(e => e.id !== d.id).selectAll('.sub-node').remove()

        /*
        // Show keyword ring
        const selKeyWords = nodes.filter(e => e.id === d.id).selectAll('.sub-node')
          .data(d => d.keywords)
          .enter()
          .append('g')
          .classed('sub-node', true)
          
        const subNodeRadiusX = 40, subNodeRadiusY = 20;

        selKeyWords.append("ellipse")
            .classed('node-shape', true)
            .attr("rx", subNodeRadiusX)
            .attr("ry", subNodeRadiusY)
            .style("fill", selColor)

        selKeyWords.append("foreignObject")
            .attr("width", function (d) { return 2 * subNodeRadiusX; })
            .attr("height", function (d) { return 2 * subNodeRadiusY; })
            .attr("x", function (d) { return - subNodeRadiusX; })
            .attr("y", function (d) { return - subNodeRadiusY; })
            .append("xhtml:div")
            .style("line-height", function (d) { return (2 * subNodeRadiusY) + 'px'; })
            .style("font-size", selSubFontSize + "px")
            .attr("class", "label")
            .html(function (d) { return '<span>' + d.name + '</span>'; })
        */

        // Signal selection to parent
        props.onClick(d.id, d.name, null)
      });
      /*UNSTABLE .on("mouseover", function (d) {
           setTooltip(true)
           setTooltipText(d.name)
         })
          .on("mouseout", function (d) {
           setTooltip(false)
         }) */
      /*UNEEDED user interaction
        .call(d3.drag()
           .on("start", dragstarted)
           .on("drag", dragged)
           .on("end", dragended)) */

      // Shape of node
      nodes.append("ellipse")
        .attr('class', 'node-shape')
        .attr("rx", getRadiusX)
        .attr("ry", getRadiusY)
        .style("fill", getColor);

      // Label of node
      nodes.append("foreignObject")
        .attr("width", function (d) { return 2 * getRadiusX(d); })
        .attr("height", function (d) { return 2 * getRadiusY(d); })
        .attr("x", function (d) { return - getRadiusX(d); })
        .attr("y", function (d) { return - getRadiusY(d); })
        .append("xhtml:div")
        .style("line-height", function (d) { return (2 * getRadiusY(d)) + 'px'; })
        .style("font-size", d => getFontSize(d) + "px")
        .attr("class", "label")
        .html(function (d) { return '<span>' + d.name + '</span>'; });
    })

  return <g className="network-graph">
    <g ref={linkRef}></g>
    <g ref={nodeRef}></g>
  </g>
  //   {tooltip && <Tooltip x={0} y={0} info={tooltipText}></Tooltip>}
}

NetworkGraph.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.object
}

export default NetworkGraph