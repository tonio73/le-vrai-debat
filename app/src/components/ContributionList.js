import React from 'react'
import PropTypes from 'prop-types'

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
    }, 0)
  }, [bodyRef])

  return <li key={props.id}>
    <h1 className="contribution-title">{props.contrib.contribution_versions_title}</h1>
    <div className="contribution-body" >
      <div className={"text " + expanded} ref={bodyRef}>{props.contrib.contribution_versions_bodyText}</div>
      {expanded === '' && <div className='mask'></div>}
    </div>
    <div className="bottom">
      <div className="buttons">{showExpand && <button onClick={toggleExpand}>{command}</button>}</div>
      <div className="vote-count">{props.contrib.contributions_votesCount} votes dont {props.contrib.contributions_votesCountOk} favorables</div>
    </div>
  </li>
}

const ContributionList = (props) => {

  var contributionSummary = null
  if (props.contributions !== undefined) {
    contributionSummary = props.contributions
      .map((c, i) => <ContributionItem key={props.id + '_' + i} id={props.id + '_' + i} contrib={c}></ContributionItem>)
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
  contributions: PropTypes.array
}

export default ContributionList