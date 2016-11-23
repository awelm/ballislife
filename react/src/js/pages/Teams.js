import React from 'react';
import * as TeamActions from '../actions/TeamActions';
import TeamSelector from '../components/TeamSelector';

export default class Teams extends React.Component {
	render() {
		TeamActions.getTeamInfo();
		TeamActions.getTeamRoster();
		TeamActions.getTeamNews();
		TeamActions.getPlayerNews("Stephen Curry");
		TeamActions.getTeamPicture();
		TeamActions.getPlayerPicture("Stephen Curry");
		return (
			<div class="row">
				<TeamSelector />
			</div> 
		);
	}
}
