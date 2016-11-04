/* eslint react/prop-types: 0 */
import React, { Component } from 'react';

import Nav from './layout/Nav';
import Footer from './layout/Footer';

export default class Layout extends Component {
  constructor() {
    super();
    this.state = {
      title: 'Welcome'
    };
  }

  changeTitle(title) {
    this.setState({ title });
  }

  render() {
    return (
      <div>
        <Nav />
        <div className="container">
          { this.props.children }
        </div>
        <Footer />
      </div>
    );
  }
}
