import React from 'react';

import Article from "../components/Article";
import * as TopStoriesActions from '../actions/TopStoriesActions';
import TopStoriesStore from '../stores/TopStoriesStore';

var Loader = require('react-loader');

export default class TopStories extends React.Component {
	constructor(props) {
		super(props);
		this.getNews = this.getNews.bind(this);
		this.state = {
			loaded: false,
			team_stories: [],
			player_stories: TopStoriesStore.getStories()
		}
	}

	componentWillMount() {
    TopStoriesStore.on("change", this.getNews);
		TopStoriesActions.getPlayerStories();
  };

	componentWillUnmount() {
		TopStoriesStore.removeListener("change", this.getNews);
	}

	getNews() {
		this.setState({
			team_stories: [],
			player_stories: TopStoriesStore.getStories(),
			loaded: true
		});
	}

	render() {
	    const { query } = this.props.location;
	    const { params } = this.props;
	    const { article } = params;
	    const { date, filter } = query;

			const { team_stories, player_stories } = this.state;

			const playerStoryList = player_stories.map((story, i) => {
				return <Article key={i} title={story['title']} body={story['summary']} url={story['link']} />
			});

	    return (
				<Loader loaded={this.state.loaded}>
					<div class="header">
						<h1>Top Stories</h1>
					</div>
		      <div class="container">

			        <div class="row stories">
								{ playerStoryList }
							</div>		
		      </div>
				</Loader>
	    );
  	}
}
