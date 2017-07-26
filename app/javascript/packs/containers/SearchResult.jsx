import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { Link } from 'react-router-dom'

import * as actions from '../actions'

import HorsePhoto from '../components/HorsePhoto'
import Loading from '../components/Loading'
import Lightbox from 'react-images'

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
      pageOfItems: [],
      lightboxIsOpen: false,
      currentImage: 0,
      currentHorseName: null
    }

    this.closeLightbox = this.closeLightbox.bind(this)
    this.gotoNext = this.gotoNext.bind(this)
    this.gotoPrevious = this.gotoPrevious.bind(this)
    this.openLightbox = this.openLightbox.bind(this)
  }

  componentDidMount() {
    this.props.actions.searchPhotos(this.searchWord)
  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems })
  }

  openLightbox(index, name, event) {
    event.preventDefault();
    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
      currentHorseName: name
    });
  }

  closeLightbox() {
    this.setState({ lightboxIsOpen: false, currentImage: 0 })
  }

  gotoPrevious () {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }

  gotoNext () {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

  render() {
    const indexByHorseName = this.state.pageOfItems.reduce((acc, val, i, ary) => {
      let list = acc[val.name] || []
      list.push(i)
      acc[val.name] = list
      return acc
    }, {})
    // console.log(indexByHorseName)

    const photos = this.state.pageOfItems.map((h, i) => {
      const idx = indexByHorseName[h.name].findIndex((elm) => { return elm == i })
      // console.log(h.name, i, idx)
      return <HorsePhoto key={i} name={h.name} img_url={h.image_url} link_url={h.url} race_name={h.race} race_date={h.date} onClickThumbnail={(e) => this.openLightbox(idx, h.name, e) } />
    })

    const image_srcs = this.state.pageOfItems.filter((h) => {
      return h.name == this.state.currentHorseName
    }).map((h) => {
      return {src: h.image_url,
              caption: `${h.name} ${h.date} / ${h.race}`}
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

        <Lightbox images={image_srcs}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
          onClose={this.closeLightbox}
          onClickNext={this.gotoNext}
          onClickPrev={this.gotoPrevious} 
        />

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
