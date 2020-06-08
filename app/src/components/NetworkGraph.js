import React from 'react'
import PropTypes from 'prop-types'
//UNSTABLE import Tooltip from './Tooltip'

const d3 = require("d3")

const defaultRadiusX = 60, defaultRadiusY = 50;
// Default font size [px]
const defaultFontSize = 14;

const NetworkGraph = (props) => {

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
    return ((d.votesCount) ? (2 * Math.log(d.votesCount / Math.max(30, d.name.length))) : defaultFontSize) + "px";
  }

  function getColor(d) {
    if (d.id === 'root')
      return '#fafafe'
    return props.colors[d.id % props.colors.length]
  }

  // useEffect allow for d3 to interact with the DOM outside of React
  React.useEffect(
    () => {
      const simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function (d) { return d.id; }))
        .force("charge", d3.forceManyBody().strength(-props.strength))
        .force("center", d3.forceCenter(props.width / 2, props.height / 2));

      const graph = props.data

      graph.links.forEach(function (d) {
        d.source = d.source_id;
        d.target = d.target_id;
      });

      // Links
      d3.select(linkRef.current)
        .attr("class", "link")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line");

      // Nodes
      const nodes = d3.select(nodeRef.current)
        .attr("class", "nodes")
        .selectAll("ellipse")
        .data(graph.nodes)
        .enter()
        .append('g')

      nodes.on("click", function (d) {
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
        .attr("rx", getRadiusX)
        .attr("ry", getRadiusY)
        .style("fill", getColor)
        .style("stroke", "#eee")
        .style("stroke-width", "1px");

      // Label of node
      nodes.append("foreignObject")
        .attr("width", function (d) { return 2 * getRadiusX(d); })
        .attr("height", function (d) { return 2 * getRadiusY(d); })
        .attr("x", function (d) { return - getRadiusX(d); })
        .attr("y", function (d) { return - getRadiusY(d); })
        .append("xhtml:div")
        .style("line-height", function (d) { return (2 * getRadiusY(d)) + 'px'; })
        .style("font-size", getFontSize)
        .attr("class", "label")
        .html(function (d) { return '<span>' + d.name + '</span>'; });

      simulation
        .nodes(graph.nodes)
        .on("tick", ticked);

      simulation.force("link")
        .links(graph.links);


      function ticked() {
        d3.select(linkRef.current).selectAll("line")
          .attr("x1", function (d) { return d.source.x; })
          .attr("y1", function (d) { return d.source.y; })
          .attr("x2", function (d) { return d.target.x; })
          .attr("y2", function (d) { return d.target.y; });

        d3.select(nodeRef.current).selectAll("g")
          .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")" });
      }

      function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart()
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }

      function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }

      function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

    })

  return <g className="network-graph">
    <g ref={linkRef}></g>
    <g ref={nodeRef}></g>
    <g ref={labelRef}></g>
  </g>
  //   {tooltip && <Tooltip x={0} y={0} info={tooltipText}></Tooltip>}
}

NetworkGraph.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.object
}

export default NetworkGraph