import React from 'react'
import PropTypes from 'prop-types'

const Scale = (props) => {

  const num_circles = 4
  const paddingH = 5, paddingV = 5;
  const width = 8 * props.radius + 5 * paddingH
  const height = 2 * props.radius + 2 * paddingV
  
  const circlesCfg = []
  for(var i = 0; i < num_circles; i++){
    var r = props.radius / Math.sqrt(num_circles - i)
    circlesCfg[i] = {
        radius: r, 
        centerX: (1 + i) * paddingH + (1 + 2 * i) * props.radius, 
        centerY: (height / 2), id: props.id + '_' + i, // height - paddingV - r, 
        filled: props.quantiles[i] < props.score
    }
  }
  
  const circles = circlesCfg.map(d => <circle r={d.radius} cx={d.centerX} cy={d.centerY} key={d.id}
    stroke={props.color} fill={(d.filled)?props.color:"transparent"}>
  </circle>)

  return <svg width={width} height={height}>
    <g>
      {circles}
    </g>
  </svg>
}

Scale.propTypes = {
  radius: PropTypes.number,
  color: PropTypes.string
}

export default Scale