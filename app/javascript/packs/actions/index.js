export const changePhotos = (photos) => {
  return {
    type: 'CHANGE_PHOTOS',
    photos: photos
  }
}

export const showLoading = () => {
  return {
    type: 'SHOW_LOADING'
  }
}

export const hideLoading = () => {
  return {
    type: 'HIDE_LOADING'
  }
}
