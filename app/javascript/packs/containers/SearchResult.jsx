import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { Link } from 'react-router-dom'

import * as actions from '../actions'

import HorsePhoto from '../components/HorsePhoto'
import Loading from '../components/Loading'

class SearchResult extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)

    const qs = queryString.parse(props.location.search)
    this.searchWord = qs.q
    console.log(this.searchWord)
  }

  componentWillMount() {
    this.props.actions.searchPhotos(this.searchWord)
  }

  render() {
    const photos = this.props.photos.map((h, i) => {
      return <HorsePhoto key={i} name={h.name} img_url={h.image_url} link_url={h.url} race_name={h.race} race_date={h.date} />
    })

    const loading = this.props.loading ? <Loading /> : null

    return (
      <div>
        <h2>Padock photo search</h2>
        <div>
          search word = {this.searchWord}
        </div>
        { loading }
        <div className="flex-container">
          { photos }
        </div>
        <Link to="/react_app/index">[Back]</Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    photos: state.photos,
    loading: state.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult)
