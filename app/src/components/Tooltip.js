import React from 'react'

const Tooltip = (props) => (
  <foreignObject width={200} height={200}>
    <div className="tooltip"> 
      <div className="title">{props.title}</div>
      <div className="body">{props.body}</div>
    </div>
  </foreignObject>
)

export default Tooltip