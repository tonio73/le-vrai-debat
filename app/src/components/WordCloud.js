import React from 'react'
import cloud from '../d3-cloud/index'

var d3 = require("d3")

const WordCloud = (props) => {

  const cloudRef = React.useRef('')

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

        const x = props.x - props.width / 2 
        const y = props.y - props.height / 2

        cloudELement
          .attr("transform", "translate(" + x + "," + y + ")")
          .selectAll("text")
          .data(words)
          .enter().append("text")
          .style("font-size", function (d) { return d.size + "px"; })
          .style("font-family", "Impact")
          .attr("text-anchor", "middle")
          .attr("transform", function (d) {
            return "translate(" + [d.x, d.y] + "),rotate(" + d.rotate + ")";
          })
          .text(function (d) { return d.text; });
      }
    })

  return <g ref={cloudRef}></g>
}

export default WordCloud