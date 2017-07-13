import React from 'react'

const HorsePhoto = ({name, img_url, link_url, race_name, race_date}) => {
  const data_title = `${name} ${race_date} / ${race_name}`
  return (
    <div className="horsedata">
      <div>
        <a data-lightbox={name} data-title={data_title}>
          <img className="thumb" src={img_url} />
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
