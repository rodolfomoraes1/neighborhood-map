import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import ErrorBoundary from './ErrorBoundary';

const GOOGLE_MAPS_API_BASE_URL = 'https://maps.googleapis.com/maps/api/js?key=GOOGLE_MAPS_API_TOKEN&v=3.exp&libraries=geometry,drawing,places&callback=onMapLoaded';
const GOOGLE_MAPS_API_TOKEN = 'AIzaSyAhIp-9s7x267GedYCW4vA9R5AHTf2v9D8';
const GOOGLE_MAPS_API_URL = GOOGLE_MAPS_API_BASE_URL.replace("GOOGLE_MAPS_API_TOKEN", GOOGLE_MAPS_API_TOKEN);

/**
 * Set value to true on map load callback
 */
function onMapLoaded() {
  console.log('map callback');
  window.isMapLoaded = true;
}

/**
 * Map component itself
 */
const MapComponent = withScriptjs(withGoogleMap(props => {
    return <GoogleMap
      defaultZoom={15}
      defaultCenter={props.places.length > 0 ? props.places[0] : {lat: -7.214299, lng: -35.880803}}
      defaultOptions={{mapTypeControl: false}}
      onClick={props.hideInfoWindow}
      >
      {props.isMarkerShown && (props.places.map((place, index) =>
        <Marker
          key={index}
          position={place}
          animation={place.clicked ? window.google.maps.Animation.BOUNCE: false}
          onClick={() => {props.onMarkerClick(index)}} /> ))
      }
    </GoogleMap>
  }
))

/**
 * Map container with map component inside
 */
class Map extends Component {
  componentDidMount() {
    // Set initial value
    window.isMapLoaded = false;

    // Set map callback function
    window.onMapLoaded = onMapLoaded;

    // Set timeout for 10 seconds
    setTimeout(() => {
      if (!window.isMapLoaded) {
        this.props.onError();
      }
    }, 10000);
  }

  render() {
    return <div
      role='region'
      aria-label='map'
      className='map-container'
      style={{marginLeft: '250px'}}>
      <ErrorBoundary>
        <MapComponent
          isMarkerShown={this.props.places.length > 0}
          googleMapURL={GOOGLE_MAPS_API_URL}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          places={this.props.places}
          hideInfoWindow={this.props.hideInfoWindow}
          onMarkerClick={this.props.onMarkerClick}
        />
      </ErrorBoundary>
    </div>;
  }
}

export default Map;