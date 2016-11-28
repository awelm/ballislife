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
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth //sends auth instance from route to children
      })
    }
    return (
      <div>
        <Nav />
        <div className="container">
          {children}
        </div>
        <Footer />
      </div>
    );
  }
}
