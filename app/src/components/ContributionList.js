import React from 'react'
import PropTypes from 'prop-types'
import Scale from './Scale'

const ContributionItem = (props) => {

  const bodyRef = React.useRef()
  const [expanded, setExpanded] = React.useState('')
  const [command, setCommand] = React.useState('+')
  const [showExpand, setShowExpand] = React.useState(false)

  function toggleExpand() {
    if (!expanded) {
      setExpanded('expanded')
      setCommand('-')
    }
    else {
      setExpanded('')
      setCommand('+')
    }
  }

  React.useEffect(() => {
    setTimeout(() => {
      const body = bodyRef.current
      const heightDiff = body.scrollHeight - body.clientHeight
      //console.log("contrib : " + heightDiff + ', ' + body.scrollHeight + ', ' + body.clientHeight)
      if (heightDiff < 15) {
        setExpanded('expanded')
      }
      else {
        setShowExpand(true)
      }
    }, 10)
  }, [bodyRef])

  const dynStyle = {
    color: props.color,
    'border-color': props.color
  }

  return <li key={props.id}>
    <h1 className="contribution-title">{props.contrib.contribution_versions_title}</h1>
    <div className="contribution-body" >
      <div className={"text " + expanded} ref={bodyRef}>{props.contrib.contribution_versions_bodyText}</div>
      {expanded === '' && <div className='mask'></div>}
    </div>
    <div className="bottom">
      <div className="buttons">{showExpand && <button onClick={toggleExpand}>{command}</button>}</div>
      <div className="scale"><Scale radius={8} color={props.color} score={props.contrib.contributions_votesCountOk} quantiles={props.quantiles}></Scale></div>
      <div className="vote-count"  style={dynStyle}>{props.contrib.contributions_votesCount} votes dont {props.contrib.contributions_votesCountOk} favorables</div>
    </div>
  </li>
}

const ContributionList = (props) => {

  function getTopicScaleColor(id) {
    return props.colorPalette[id % props.colorPalette.length]
  }

  var contributionSummary = null
  if (props.contributions !== undefined) {
    contributionSummary = props.contributions
      .map((c, i) => <ContributionItem key={props.id + '_' + i} id={props.id + '_' + i} contrib={c} 
        color={getTopicScaleColor(c.topic_id)} quantiles={props.quantiles}></ContributionItem>)
  }

  var title = ''
  if (props.title) {
    title += props.title.topic
    if (!!props.title.keyword) {
      title += ' > ' + props.title.keyword
    }
  }

  return <div>
    {props.title && <h1 className='contribution-list-title'>{title}</h1>}
    <ul className="contribution-list">
      {contributionSummary}
    </ul>
  </div>
}

ContributionList.propTypes = {
  title: PropTypes.object,
  color: PropTypes.string,
  contributions: PropTypes.array
}

export default ContributionList