export const changePhotos = (photos) => {
  return {
    type: 'CHANGE_PHOTOS',
    photos: photos
  }
}

export const searchPhotos = (q) => {
  return (dispatch, getState) => {
    dispatch(showLoading)

    fetch(`/api/horses?name=${q}`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      dispatch(hideLoading)
      console.log(data)
      dispatch(changePhotos(data))
    })
    .catch(err => {
      console.log(err)
      dispatch(hideLoading)
    })
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
