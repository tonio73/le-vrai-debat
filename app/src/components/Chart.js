import React from 'react'
import PropTypes from 'prop-types'

const Chart = (props) => {

  return <div>
            <svg id={props.chartId} width={props.width} height={props.height}>
              {props.children}
            </svg>   
        </div>
}

Chart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  chartId: PropTypes.string
}

export default Chart