// src/views/Main/Home/Home.js

import React, { PropTypes as T } from 'react'
import {Button} from 'react-bootstrap'
import AuthService from '../../utils/AuthService'
import Article from "../components/Article";
import * as HomeStoriesActions from '../actions/HomeStoriesActions';
import HomeStoriesStore from '../stores/HomeStoriesStore';
// import styles from './styles.module.css'

var Loader = require('react-loader');

export class Home extends React.Component {
  static contextTypes = {
    router: T.object
  }

  static propTypes = {
    auth: T.instanceOf(AuthService)
  }

  constructor(props) {
    super(props);
    this.getNews = this.getNews.bind(this);
    this.state = {
      loaded: false,
      home_stories: HomeStoriesStore.getStories()
    }
  }

  logout() {
    // destroys the session data
    this.props.auth.logout()
    // redirects to login page
    this.context.router.push('/login');
  }
  
  componentWillMount() {
    HomeStoriesStore.on("change", this.getNews);
    HomeStoriesActions.getHomeStories();
  };

  componentWillUnmount() {
    HomeStoriesStore.removeListener("change", this.getNews);
  }

  getNews() {
    this.setState({
      team_stories: [],
      home_stories: HomeStoriesStore.getStories(),
      loaded: true
    });
  }

  render() {
      const { query } = this.props.location;
      const { params } = this.props;
      const { article } = params;
      const { date, filter } = query;

      const { home_stories } = this.state;

      const homeStoryList = home_stories.map((story, i) => {
        return <Article key={i} title={story['title']} body={story['summary']} url={story['link']} />
      });
    return (
      <div>
        <div>
          <h2>Home</h2>
          <img src="https://cdn.auth0.com/styleguide/1.0.0/img/badge.svg" />
          <p>Welcome!</p>
          {!this.props.auth.loggedIn() && <p>Please login</p>}
          {this.props.auth.loggedIn() && <Button onClick={this.logout.bind(this)}>Logout</Button>}
        </div>
        <Loader loaded={this.state.loaded}>
            <div class="container">
                <div class="row stories">
                  { homeStoryList }
                </div>
            </div>
        </Loader>
      </div>
    )
  }
}

export default Home;
