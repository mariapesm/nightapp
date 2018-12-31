import axios from 'axios';
import React, { Component } from 'react';
import Header from './header';
import Background from './background';
import PlaceCards from './place_card';
import * as actions from '../actions';
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { searchBarText: '', places: [] };
  }

  componentWillMount() {
    const loc = this.props.match.params.loc;
    if (loc && loc !== 'signin') {
      axios
        .get(`/api/search?location=${loc}`, {
          headers: {
            authorization: localStorage.getItem('token') || '',
            'Cache-control': 'no-cache'
          }
        })
        .then(res => {
          this.props.submitTextSubmitted(loc);
          this.setState({ places: res.data });
          document.getElementById('search').value = loc;
        });
    }
  }

  handleSubmit() {
    const locationText =
      this.state.searchBarText.trim().length === 0
        ? 'USA'
        : this.state.searchBarText;
    axios
      .get(`/api/search?location=${locationText}`, {
        headers: {
          authorization: localStorage.getItem('token') || '',
          'Cache-control': 'no-cache'
        }
      })
      .then(res => {
        this.props.submitTextSubmitted(locationText);
        this.setState({ places: res.data });
      });
  }

  cardClicked = id => {
    axios
      .put(
        '/api/toggleChoice',
        { placeId: id },
        {
          headers: {
            authorization: localStorage.getItem('token') || '',
            'Cache-control': 'no-cache'
          }
        }
      )
      .then(res => {
        var newPlaces = this.state.places.map(place => {
          if (place.id === res.data.placeId) {
            place.user_going = res.data.added;
            return place;
          } else {
            return place;
          }
        });
        this.setState({ places: newPlaces });
      })
      .catch(err => console.log(err));
  };

  renderCards() {
    if (this.state.places && this.state.places.length) {
      return (
        <PlaceCards places={this.state.places} cardClicked={this.cardClicked} />
      );
    }
  }

  render() {
    return (
      <div>
        <Background />
        <Header />
        <div className="app-body">
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                if (this.state.searchBarText.trim().length === 0) {
                  return alert('Please enter some value');
                }
                this.handleSubmit();
              }}
              className="search-form"
            >
              <input
                id="search"
                type="text"
                placeholder="Enter places of your choice"
                className="search-bar"
                value={this.state.searchBarText}
                onChange={e => {
                  this.setState({ searchBarText: e.target.value });
                }}
              />
              <button type="submit">
                <i className="fa fa-search fa-3x" aria-hidden="true" />
              </button>
            </form>
          </div>
          {this.renderCards()}
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(App);
