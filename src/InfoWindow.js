import React, { Component } from 'react';
import Draggable from 'react-draggable';

/**
 * Draggable modal window with place details info
 */
class InfoWindow extends Component {
  render() {
    const { place } = this.props;

    console.log(place);

    return (
    <Draggable>
      <article className='info-window' role='article' tabIndex='1'>
        <h2 className='info-name'>{place.name}</h2>
        <button onClick={() => {this.props.hideInfoWindow()}} className='close'>Close</button>
        <p className='info-category'>{place.categories[0].name}</p>
        <p className='info-address'>{place.location.address}, {place.location.city}</p>
      </article>
    </Draggable>
    );
  }
}

export default InfoWindow;