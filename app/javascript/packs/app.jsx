// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducers from './reducers'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SearchTop from './components/SearchTop'
import SearchResult from './containers/SearchResult'

let store = createStore(rootReducers)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/react_app/index" component={SearchTop} />
          <Route path="/react_app/search" component={SearchResult} />
        </Switch>
      </Router>
    </Provider>,
    document.body.appendChild(document.createElement('div')),
  )
})
