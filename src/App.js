import React, { Component } from 'react';
import List from './List';
import Map from './Map';
import InfoWindow from './InfoWindow';
import './App.css';
import './Responsive.css';

const FOURSQUARE = require('react-foursquare')({
  clientID: 'YA1XYSDOAM45SP4Y3MANOX2AVCJMBXKNTFOSOFC4F4MHM0W2',
  clientSecret: 'KBP33SRYOIZNXSXR0O4PA42431M55QLDQ5IMMOCU1LTV1ID2'
});

class App extends Component {
  state = {
    places: [],
    selectedPlace: null
  }

  handleSetMarkers = (places) => {
    this.setState({ places });
  }

  handleMarkerClick = (marker) => {
    this.state.places.map((p, index) => {
      if (index === marker) {
        p.clicked = true;
        this.setState({
          selectedPlace: p.venue
        });
      } else {
        p.clicked = false;
      }
      return p;
    });
  }

  handleHidingInfoWindow = () => {
    const places = this.state.places.map((p, index) => {
      p.clicked = false;
      return p;
    });

    this.setState({ places: places, selectedPlace: null });
  }

  showError = () => {
    const block = document.querySelector('.error');
    block.style.opacity = 1;
    setTimeout(() => {
      block.style.opacity = 0;
    }, 3000);
  }

  render() {
    const placesInfo = this.state.places.map(v => {
      let result = {};
      
      if(v.venue == undefined) {
        result = { lat: v.location.lat, lng: v.location.lng, clicked: v.clicked };
      } else {
        result = { lat: v.venue.location.lat, lng: v.venue.location.lng, clicked: v.clicked };
      }

      return result;
    });

    return (
      <div className='app-container'>
        <List
          foursquare={FOURSQUARE}
          setMarkers={this.handleSetMarkers}
          onPlaceClick={this.handleMarkerClick} />
        <Map
          places={placesInfo}
          hideInfoWindow={this.handleHidingInfoWindow}
          onMarkerClick={this.handleMarkerClick}
          onError={this.showError}
           />
        {this.state.selectedPlace && (<InfoWindow
          place={this.state.selectedPlace}
          foursquare={FOURSQUARE}
          hideInfoWindow={this.handleHidingInfoWindow} />)}
        <div
          style={{ opacity: 0 }}
          className='error'>Something went wrong</div>
      </div>
    );
  }
}

export default App;