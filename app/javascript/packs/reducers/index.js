import { combineReducers } from 'redux'
import photos from './photos'
import loading from './loading'

const rootReducers = combineReducers({
  photos,
  loading
})

export default rootReducers
