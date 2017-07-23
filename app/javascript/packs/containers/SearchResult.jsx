import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { Link } from 'react-router-dom'

import * as actions from '../actions'

import HorsePhoto from '../components/HorsePhoto'
import Loading from '../components/Loading'

// http://jasonwatmore.com/post/2017/03/14/react-pagination-example-with-logic-like-google
import Pagination from '../components/Pagination'

class SearchResult extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)

    const qs = queryString.parse(props.location.search)
    this.searchWord = qs.q
    console.log(this.searchWord)

    this.state = {
      pageOfItems: []
    }
  }

  componentDidMount() {
    this.props.actions.searchPhotos(this.searchWord)
  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems })
  }

  render() {
    const photos = this.state.pageOfItems.map((h, i) => {
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
        <div>
          <Pagination items={this.props.photos} onChangePage={this.onChangePage.bind(this)} pageSize={10} />
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
