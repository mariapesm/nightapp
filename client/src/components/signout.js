import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';

class Signout extends Component {

  componentWillMount() {
    this.props.signOutUser(localStorage.getItem('token'));
    window.location.replace('/');
  }

  render() {
    return <div></div>
  }
}

export default connect(null, actions)(Signout);
