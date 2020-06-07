import React from 'react'
import PropTypes from 'prop-types'

const ContributionList = (props) => {

  var contributionSummary = null
  if(props.contributions !== undefined) {
    contributionSummary = props.contributions
      .map((c, i) => <li key={i}>
        <div className="contribution-title">{c.contribution_versions_title}</div>
        <div className="contribution-body">{c.contribution_versions_bodyText}</div>
        <div className="vote-count">{c.contributions_votesCount} votes dont {c.contributions_votesCountOk} favorables</div>
      </li>)
  }

  return <div>
    {props.title && <h1 className='contribution-list-title'>{props.title}</h1>}
    <ul className="contribution-list">
      {contributionSummary}
    </ul>
  </div>
}

ContributionList.propTypes = {
  title: PropTypes.string,
  contributions: PropTypes.array
}

export default ContributionList