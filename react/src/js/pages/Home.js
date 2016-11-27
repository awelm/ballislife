// src/views/Main/Home/Home.js

import React, { PropTypes as T } from 'react'
import {Button} from 'react-bootstrap'
import AuthService from '../../utils/AuthService'
// import styles from './styles.module.css'

export class Home extends React.Component {
  static contextTypes = {
    router: T.object
  }

  static propTypes = {
    auth: T.instanceOf(AuthService)
  }

  logout() {
    // destroys the session data
    this.props.auth.logout()
    // redirects to login page
    this.context.router.push('/login');
  }

  render() {
    return (
      <div>
        <h2>Home</h2>
        <img src="https://cdn.auth0.com/styleguide/1.0.0/img/badge.svg" />
        <p>Welcome!</p>
        <Button onClick={this.logout.bind(this)}>Logout</Button>
      </div>
    )
  }
}

export default Home;