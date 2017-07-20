const photos = (state = [], action) => {
  switch (action.type) {
    case 'CHANGE_PHOTOS':
      return [].concat(action.photos)
    default:
      return state
  }
}

export default photos
