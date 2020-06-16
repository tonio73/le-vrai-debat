import React from 'react'
import PropTypes from 'prop-types'

const d3 = require("d3")

const NetworkGraph = (props) => {

  const graph = props.data

  const centerX = props.width / 2, centerY = props.height / 2

  // Ring 1 : main topics
  const ring1Radius = 250, ring1RadiusDeltaSel = 130;
  const ring1PhaseShift = 2 * Math.PI / (graph.nodes.length);

  // Ring 2 : keywords
  const subNodeRadiusX = 40, subNodeRadiusY = 20;
  const ring2PhaseShift = 2 * Math.PI / 8; // 8 keywords by design

  const defaultRadiusX = 60, defaultRadiusY = 50;
  // Default font size [px]
  const defaultFontSize = 14;

  // Transition duration
  const transitionDurationMs = 2000

  // References to DOM elements
  const chartRef = React.useRef('')

  function getRadiusX(d) {
    if (d.id === 'root') return 120;
    return (d.votesCount) ? (2.6e-1 * Math.sqrt(d.votesCount)) : defaultRadiusX;
  }

  function getRadiusY(d) {
    if (d.id === 'root') return 100;
    return (d.votesCount) ? (2.2e-1 * Math.sqrt(d.votesCount)) : defaultRadiusY;
  }

  function getFontSize(d) {
    if (d.id === 'root') return 36;
    return ((d.votesCount) ? (3.5e-1 * Math.sqrt(d.votesCount / Math.max(30, d.name.length))) : defaultFontSize);
  }

  function getColor(d) {
    if (d.id === 'root')
      return '#fafafe'
    return props.colors[d.id % props.colors.length]
  }

  function getNodeX(d, selected = false) {
    if (d.id === 'root') return centerX
    const radius = ring1Radius + ((selected === true) ? ring1RadiusDeltaSel : 0)
    return centerX + radius * Math.cos(ring1PhaseShift * d.id)
  }

  function getNodeY(d, selected = false) {
    if (d.id === 'root') return centerY
    const radius = ring1Radius + ((selected === true) ? ring1RadiusDeltaSel : 0)
    return centerY + radius * Math.sin(ring1PhaseShift * d.id)
  }

  function getNode2X(d, parentRadiusX) {
    // Position nodes as function of id (increasing from 0 to 8)
    // Add alternate offset ring1RadiusDelta
    return (parentRadiusX + subNodeRadiusX) * Math.cos(ring2PhaseShift * d.id)
  }

  function getNode2Y(d, parentRadiusY) {
    return (parentRadiusY + subNodeRadiusY) * Math.sin(ring2PhaseShift * d.id)
  }


  // useEffect allow for d3 to interact with the DOM outside of React
  React.useEffect(
    () => {

      // Node Wraps
      const nodeWraps = d3.select(chartRef.current)
        .selectAll(".ring1")
        .data(graph.nodes)
        .enter()
        .append('g')

      // Ring 1 Links
      nodeWraps.append("line")
        .classed("link", true)
        .attr("x1", centerX)
        .attr("y1", centerY)
        .attr("x2", getNodeX)
        .attr("y2", getNodeY)

      // Ring 1 Nodes
      nodeWraps.append('g')
        .classed('ring1', true)
        .attr("transform", d => "translate(" + getNodeX(d) + "," + getNodeY(d) + ")")
        .append('g')
        .classed('node', true)

      // Root
      nodeWraps.selectAll('.root')
        .data(graph.root)
        .enter()
        .append('g')
        .classed('root', true)
        .classed('node', true)
        .classed('selected', true) // Selected by default
        .attr("transform", "translate(" + centerX + "," + centerY + ")")

      // Reselect root + ring 1 nodes
      const allNodes = nodeWraps.selectAll('.node')

      // Shape of node
      allNodes.append("ellipse")
        .classed('node-shape', true)
        .attr("rx", getRadiusX)
        .attr("ry", getRadiusY)
        .style("fill", getColor);

      // Label of node
      allNodes.append("foreignObject")
        .attr("width", d => 2 * getRadiusX(d))
        .attr("height", d => 2 * getRadiusY(d))
        .attr("x", d => - getRadiusX(d))
        .attr("y", d => - getRadiusY(d))
        .append("xhtml:div")
        .classed("label", true)
        .style("line-height", d => (2 * getRadiusY(d)) + 'px')
        .style("font-size", d => getFontSize(d) + "px")
        .html(d => '<span>' + d.name + '</span>');

      //= Actions =//

      allNodes.on("click", d => {

        const selColor = getColor(d)
        const selSubFontSize = Math.min(Math.max(0.8 * getFontSize(d), 9), 12)
        const radiusX = getRadiusX(d), radiusY = getRadiusY(d)

        // Set selection on all nodes
        allNodes.classed('selected', e => e.id === d.id)

        d3.select(chartRef.current)
          .transition()
          .attr("transform", e => "translate(" + (centerX - getNodeX(d, true)) + "," + (centerY - getNodeY(d, true)) + ")")
          .duration(transitionDurationMs)

        // Set positions : larger radius for selected node
        const ring1Nodes = d3.selectAll('.ring1')
        ring1Nodes.transition()
          .attr("transform", e => "translate(" + getNodeX(e, e.id === d.id) + "," + getNodeY(e, e.id === d.id) + ")")
          .duration(transitionDurationMs)

        // Remove existing ring of keywords
        ring1Nodes.filter(e => e.id !== d.id).selectAll('.ring2').remove()

        // TODO FIX Raise selection
        allNodes.filter(e => e.id === d.id).selectAll('g').raise()

        // Show keyword ring on selection (Note: this is undefined)
        const selKeyWordWraps = ring1Nodes.filter(e => e.id === d.id).selectAll('.ring2')
          .classed('selected', false)
          .data(d => d.keywords)
          .enter()
          .append('g')
          .classed('ring2', true)
          .attr("transform", e => "translate(" + getNode2X(e, radiusX) + "," + getNode2Y(e, radiusY) + ")")

        const selKeyWords = selKeyWordWraps.append('g')
          .classed('node', true)

        // Keyword node shape
        selKeyWords.append("ellipse")
          .classed('node-shape', true)
          .attr("rx", subNodeRadiusX)
          .attr("ry", subNodeRadiusY)
          .style("fill", selColor)
          .style("opacity", 0)
          .transition()
          .style("opacity", 1)
          .duration(transitionDurationMs)

        // Keyword node text
        selKeyWords.append("foreignObject")
          .attr("width", 2 * subNodeRadiusX)
          .attr("height", 2 * subNodeRadiusY)
          .attr("x", -subNodeRadiusX)
          .attr("y", -subNodeRadiusY)
          .append("xhtml:div")
          .classed("label", true)
          .style("line-height", (2 * subNodeRadiusY) + 'px')
          .style("font-size", selSubFontSize + "px")
          .html(e => '<span>' + e.name + '</span>')

        selKeyWords.on('click', e => {
          // Set selection on all ring2 keyword nodes
          selKeyWords.classed('selected', f => f.id === e.id)

          // Signal selection to parent
          props.onClick(d.id, d.name, e.id, e.name)
        })
        .on("mouseover", e => {
          d3.select(chartRef.current).selectAll('.ring2 > .node')
            .classed('hover', f => f.id === e.id)
        })
        .on("mouseout", e => {
          d3.select(chartRef.current).selectAll('.ring2 > .node')
            .classed('hover', false)
        })

        // Complete selection
        

        // Signal selection to parent
        props.onClick(d.id, d.name, null)
      })
        .on("mouseover", d => {
          d3.select(chartRef.current).selectAll('.ring1 > .node')
            .classed('hover', e => e.id === d.id)
        })
        .on("mouseout", d => {
          d3.select(chartRef.current).selectAll('.ring1 > .node')
            .classed('hover', false)
        })
    })

  return <g className="network-graph">
    <g ref={chartRef}>
    </g>
  </g>
}

NetworkGraph.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.object
}

export default NetworkGraph