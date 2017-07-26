import React from 'react'

const HorsePhoto = ({name, img_url, link_url, race_name, race_date, onClickThumbnail}) => {
  return (
    <div className="horsedata">
      <div>
        <a>
          <img className="thumb" src={img_url} onClick={onClickThumbnail} />
        </a>
      </div>
      <div>
        <div>
          <a href={link_url}>{name}</a>
        </div>
        <div className="subinfo">({race_date} / {race_name})</div>
      </div>
    </div>
  )
}

export default HorsePhoto
