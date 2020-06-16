import React from 'react'
import PropTypes from 'prop-types'
import Scale from './Scale'

function number_format(n) {
  return Intl.NumberFormat().format(n)
}


// Contribution item
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
    }, 200)
  }, [bodyRef])

  const dynStyle = {
    color: props.color,
    borderColor: props.color
  }

  return <li key={props.id} className="contribution-list-item">
    <h1>{props.contrib.contribution_versions_title}</h1>
    <div className="contribution-body" >
      <div className={"text " + expanded} ref={bodyRef}>{props.contrib.contribution_versions_bodyText}</div>
      {expanded === '' && <div className='mask'></div>}
    </div>
    <div className="bottom">
      <div className="buttons">{showExpand && <button onClick={toggleExpand}>{command}</button>}</div>
      <div className="vote-count" style={dynStyle}>
        <div className="scale"><Scale radius={8} color={props.color} score={props.contrib.contributions_votesCountOk} quantiles={props.quantiles}></Scale></div>
        <div className="count">{number_format(props.contrib.contributions_votesCountOk)} votes favorables / {number_format(props.contrib.contributions_votesCount)} exprimés</div>
      </div>
    </div>
  </li>
}

// Contribution list
const ContributionList = (props) => {

  const contributionListRef = React.useRef(null)

  function getTopicScaleColor(id) {
    return props.colorPalette[id % props.colorPalette.length]
  }

  var contributionSummary = null
  if (props.contributions !== undefined) {
    contributionSummary = props.contributions
      .map((c, i) => <ContributionItem key={props.id + '_' + i} id={props.id + '_' + i} contrib={c}
        color={getTopicScaleColor(c.topic_id)} quantiles={props.quantiles}></ContributionItem>)
  }

  var title = '', subtitle = '', dynStyle = {};
  if (props.title) {
    title += props.title.topic
    if (!!props.title.keyword) {
      title += ' > ' + props.title.keyword
    }
    subtitle = number_format(props.title.votesCountOk) + " votes favorables / " + number_format(props.title.votesCountOk) + " exprimés"

    if (props.title.topic_id !== undefined) {
      const color = getTopicScaleColor(props.title.topic_id)
      dynStyle = {
        color: color,
        borderColor: color
      }
    }
  }

  React.useEffect(() => {
    contributionListRef.current.scrollTo(0, 0)
  }, [contributionSummary])

  return <div ref={contributionListRef} className="contribution-list">
    <h1>{title}</h1>
    <h2 style={dynStyle}>{subtitle}</h2>
    <ul className="contribution-list-list">
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