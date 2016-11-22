import React, { Component } from 'react';
import { Link } from 'react-router';

import Nav from '../components/Layout/Nav';
import Footer from '../components/Layout/Footer';

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
