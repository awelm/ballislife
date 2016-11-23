import React from 'react'; 

export default class TeamSelector extends React.Component {
	render() {
		return (
	        <div className="col-md-3">
	        	  <div class="form-group">
				    <label for="team">Team</label>
				    <select class="form-control" id="team-select">
				    	<option>Atlanta Hawks</option>
						<option>Boston Celtics</option>
						<option>Brooklyn Nets</option> 
						<option>Charlotte Hornets</option>
						<option>Chicago Bulls</option>
						<option>Clevland Cavaliers</option>
						<option>Dallas Mavericks</option>
						<option>Denver Nuggets</option>
						<option>Detroit Pistons</option>
						<option>Golden State Warriors</option>
						<option>Houston Rockets</option>
						<option>Indiana Pacers</option>
						<option>LA Clippers</option>
						<option>Los Angeles Lakers</option>
						<option>Memphis Grizzlies</option>
						<option>Miami Heat</option>
						<option>Milwaukee Bucks</option>
						<option>Minnesota Timberwolves</option>
						<option>New Orleans Pelicans</option>
						<option>New York Knicks</option>
						<option>Oklahoma City Thunder</option>
						<option>Orlando Magic</option>
						<option>Philadelphia 76ers</option>
						<option>Phoenix Suns</option>
						<option>Portland Trail Blazers</option>
						<option>Sacramento Kings</option>
						<option>San Antonio Spurs</option>
						<option>Toronto Raptors</option>
						<option>Utah Jazz</option>
				    </select>
				  </div>
	        </div>
		);
	}
}