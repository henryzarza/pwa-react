import React from 'react'
import { string, shape } from 'prop-types'

import './style.css';

function Card({ data: { description, height, name, photo, realName, weight } }) {
  return (
    <div className="card">
      <img className="card-image" src={photo} alt={name} />
      <h3 className="character-title">{name}</h3>
      <div className="card-content">
        <h6 className="character-name">{realName}</h6>
        <p>{description}</p>
        <div className="character-info">
          <span className="character-badge">{weight} kg</span>
          <span className="character-badge">{height} cm</span>
        </div>
      </div>
    </div>
  )
}

Card.propTypes = {
  data: shape({
    description: string.isRequired,
    height: string.isRequired,
    name: string.isRequired,
    photo: string.isRequired,
    realName: string.isRequired,
    weight: string.isRequired
  }).isRequired
};

export default Card;
