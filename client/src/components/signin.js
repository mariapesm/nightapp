import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';

class SignIn extends Component {

  extractValues() {
    //return [0] = Token : [1] = Location
    return window.location.href.substring(window.location.href.indexOf("?") + 1).split('#');
  }

  componentDidMount() {
    this.props.signInUser(this.extractValues()[0], () => window.location.replace(`/${this.extractValues()[1]}`));
  }

  render() {
    return (
      <div>

      </div>
    );
  }
}

export default connect(null, actions)(SignIn);
