import React from 'react';

import Article from "../components/Article";
import * as TopStoriesActions from '../actions/TopStoriesActions';
import TopStoriesStore from '../stores/TopStoriesStore';

export default class TopStories extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			team_stories: [],
			player_stories: TopStoriesStore.getStories()
		}
	}

	componentWillMount() {
    TopStoriesStore.on("change", () => {
      this.setState({
				team_stories: [],
				player_stories: TopStoriesStore.getStories()
			})
    });
		TopStoriesActions.getPlayerStories();
  };


	componentDidMount() {
		// console.log('mounted...')
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
	      <div>
	        <h1>Top Stories</h1>
	        <div class="row">{ playerStoryList }</div>
	      </div>
	    );
  	}
}
