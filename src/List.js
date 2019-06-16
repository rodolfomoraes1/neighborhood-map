import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import axios from 'axios';

class List extends Component {
  state = {
    places: [],
    query: ''
  }

  componentDidMount() {
    this.fetchPlaces();
  }

  fetchPlaces = function() {
    const api = 'https://api.foursquare.com/v2/venues/explore?';
    const params = {
      client_id: 'YA1XYSDOAM45SP4Y3MANOX2AVCJMBXKNTFOSOFC4F4MHM0W2',
      client_secret: 'KBP33SRYOIZNXSXR0O4PA42431M55QLDQ5IMMOCU1LTV1ID2',
      section : 'food',
      near: 'Campina Grande',
      v: '20190615'
    };

    axios.get(api + new URLSearchParams(params))
      .then(response => {
        const venues = response.data.response.groups[0].items;
        this.props.setMarkers(venues);
        this.setState({ places: venues });
      }).catch(err => {
        alert('Something went wrong!');
        console.log('fetchPlaces', err);
      });
  };

  handleQueryUpdate = (query) => {
    const api = 'https://api.foursquare.com/v2/venues/explore?';
    const params = {
      client_id: 'YA1XYSDOAM45SP4Y3MANOX2AVCJMBXKNTFOSOFC4F4MHM0W2',
      client_secret: 'KBP33SRYOIZNXSXR0O4PA42431M55QLDQ5IMMOCU1LTV1ID2',
      query : query,
      near: 'Campina Grande',
      v: '20190615'
    };

    axios.get(api + new URLSearchParams(params))
      .then(response => {
        const venues = response.data.response.groups[0].items;
        this.props.setMarkers(venues);
        this.setState({ places: venues });
        this.setState({ query });
      }).catch(err => {
        alert('Something went wrong!');
        console.log('handleQueryUpdate', err);
      });
  }

  getInputField = () => {
    const { query } = this.state;

    return <input
      tabIndex={1}
      className='filter'
      type='text'
      value={query}
      onChange={event => this.handleQueryUpdate(event.target.value)}
      placeholder='Filter based on expression' />
  }

  getPlaceList = () => {
    return (
      <ol className='places' role='listbox' aria-label='List of places'>
        {this.state.places.map((p, index) =>
          <li
            tabIndex={index + 2}
            role='option'
            key={index}
            className='place'
            onClick={() => {this.props.onPlaceClick(index)}}
            onKeyUp={event => {
              if (event.keyCode === 13) {
                this.props.onPlaceClick(index);
              }
            }}>
              {this.getVenueName(p)}
          </li>
        )}
      </ol>
    )
  }

  getVenueName(venue) {
    return venue.venue? venue.venue.name: venue.name;
  }

  render() {
    return (
      <div>
        <div className='sidebar'>
          <div className='heading' role='heading'>
            <h1 className='title'>
              Filter
            </h1>
            {this.getInputField()}
          </div>
          <div className='places-list' role='region'>
            {this.getPlaceList()}
          </div>
        </div>
      </div>
    );
  }
}

export default List;