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
    console.log(queryString.parse(props.location.search))
  }

  componentWillMount() {
    const data = [{name: "サトノクラウン", img_url: "http://www.keibado.ne.jp/keibabook/170403/images/pp02.jpg", link_url: "http://www.keibado.ne.jp/keibabook/170403/images/pp02.jpg", race_name: "大阪杯", race_date: "2017-04-03"},{name: "サトノクラウン", img_url: "http://www.keibado.ne.jp/keibabook/170213/images/pp11.jpg", link_url: "http://www.keibado.ne.jp/keibabook/170403/images/pp02.jpg", race_name: "京都記念", race_date: "2017-02-13"}]

    this.props.actions.changePhotos(data)
  }

  render() {
    const photos = this.props.photos.map((h, i) => {
      return <HorsePhoto key={i} name={h.name} img_url={h.img_url} link_url={h.link_url} race_name={h.race_name} race_date={h.race_date} />
    })

    const loading = this.props.loading ? <Loading /> : null
    const searchWord = queryString.parse(this.props.location.search).q

    return (
      <div>
        <h2>Padock photo search</h2>
        <div>
          search word = {searchWord}
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
