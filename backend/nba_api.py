import requests

NBA_STATS_URL = 'http://stats.nba.com/stats/{endpoint}'
HEADERS = {'user-agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36"}

def use_json_endpoint(endpoint, params):
  """
    sends get request to endpoint with params
    returns json object
  """
  ret = requests.get(NBA_STATS_URL.format(endpoint=endpoint), params=params, headers=HEADERS)
  ret.raise_for_status()
  return ret.json()

def get_boxscore_summary(gameid):
  params = {
      "GameID":gameid
      }
  return use_json_endpoint("boxscoresummaryv2", params)

def get_boxscore(gameid, endperiod=10, endrange=28800, rangetype=0, season="2016-17", seasontype="Regular+Season", startperiod=1, startrange=0):
  params = {
      "EndPeriod":endperiod,
      "EndRange":endrange,
      "GameID":gameid,
      "RangeType":rangetype,
      "Season":season,
      "SeasonType":seasontype,
      "StartPeriod":startperiod,
      "StartRange":startrange
      }
  return use_json_endpoint("boxscoretraditionalv2", params)

def get_shotchart(playerid, season, playerposition='', contextmeasure='FGA', datefrom='', dateto='', gameid='', gamesegment='', lastngames=0, leagueid='00', location='', month=0, opponentteamid=0, outcome='', period=0, position='', rookieyear='', seasonsegment='', seasontype='Regular Season', teamid=0, vsconference='', vsdivision=''):
  params = {
    'PlayerID' : playerid,
    'PlayerPosition' : playerposition,
    'Season' : season,
    'ContextMeasure' : contextmeasure,
    'DateFrom' : datefrom,
    'DateTo' : dateto,
    'GameID' : gameid,
    'GameSegment' : gamesegment,
    'LastNGames' : lastngames,
    'LeagueID' : leagueid,
    'Location' : location,
    'Month' : month,
    'OpponentTeamID' : opponentteamid,
    'Outcome' : outcome,
    'Period' : period,
    'Position' : position,
    'RookieYear' : rookieyear,
    'SeasonSegment' : seasonsegment,
    'SeasonType' : seasontype,
    'TeamID' : teamid,
    'VsConference' : vsconference,
    'VsDivision' : vsdivision
  }
  data = use_json_endpoint("shotchartdetail", params)   
  player_shots = data['resultSets'][0]['rowSet']
  return [{'x':row[-4], 'y':row[-3], 'made':row[-1]} for row in player_shots]