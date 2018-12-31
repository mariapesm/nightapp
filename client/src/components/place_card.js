import React from 'react';
import { connect } from 'react-redux';

const PlaceCards = ({ places, cardClicked, authenticated }) => {
  return (
    <div className='place-cards'>
      {places.map(loc =>
        <div
          key={loc.id}
          className='card'
          onClick={() => cardClicked(loc.id)}
          style={{ backgroundImage: `url(${loc.image_url})` }}>
          <button className='going-button'>
            <h1 style={{ color: loc.user_going ? 'rgb(217,83,79)' : 'rgb(92,184,92)' }}>
              {authenticated ? (loc.user_going ? 'Remove' : 'Add') : 'Sign in to RSVP'}
            </h1>
          </button>
          <div className='card-text' style={{ backgroundColor: loc.user_going ? 'rgba(92,184,92,0.9)' : 'rgba(217,83,79,0.9)' }}>
            <h3>{loc.name}</h3>
            <h5>{loc.user_count ? `${loc.user_count} going` : ''}</h5>
            <h5>{loc.rating} stars from {loc.review_count} ratings</h5>
          </div>
        </div>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated }
}

export default connect(mapStateToProps)(PlaceCards);
