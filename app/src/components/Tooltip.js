import React from 'react'

const Tooltip = (props) => (
  <foreignObject x={props.x + 10} y={props.y + 10} width={150} height={50}>
    <div className="tooltip"> 
      <strong>{props.info}</strong>
    </div>
  </foreignObject>
)

export default Tooltip