import urllib2
import urllib
import json

api_url = "http://stats.nba.com/stats/shotchartdetail?"
player_id = 2544; # lebron
season = '2015-16';
parameters = urllib.urlencode(
	{
		'PlayerID' : player_id,
		'PlayerPosition' : '',
		'Season' : season,
		'ContextMeasure' : "FGA",
		'DateFrom' : '',
		'DateTo' : '',
		'GameID' : '',
		'GameSegment' : '',
		'LastNGames' : 0,
		'LeagueID' : '00',
		'Location' : '',
		'Month' : 0,
		'OpponentTeamID' : 0,
		'Outcome' : '',
		'Period' : 0,
		'Position' : '',
		'RookieYear' : '',
		'SeasonSegment' : '',
		'SeasonType' : 'Regular Season',
		'TeamID' : 0,
		'VsConference' : '',
		'VsDivision' : ''
	})

get_url = api_url+parameters

raw_data = urllib2.urlopen(get_url).read()
data = json.loads(raw_data)

player_shots = data['resultSets'][0]['rowSet']
player_cols = data['resultSets'][0]['headers']

league_shots = data['resultSets'][1]['rowSet']
league_cols = data['resultSets'][1]['headers']

print league_cols
print
print league_shots