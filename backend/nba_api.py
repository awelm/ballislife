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

def get_player_career_stats(perMode, leagueID, playerID):
    params = {
        "PerMode": perMode,
        "LeagueID": leagueID,
        "PlayerID": playerID
        }
    return use_json_endpoint("playercareerstats", params)

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

def get_league_shotavg(season, playerposition='', contextmeasure='FGA', datefrom='', dateto='', gameid='', gamesegment='', lastngames=0, leagueid='00', location='', month=0, opponentteamid=0, outcome='', period=0, position='', rookieyear='', seasonsegment='', seasontype='Regular Season', teamid=0, vsconference='', vsdivision=''):
  params = {
    'PlayerID' : 2544, # set a default value since we don't care about the specific player
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
  league_shots = data['resultSets'][1]['rowSet']
  return league_shots
  #return [{'x':row[-4], 'y':row[-3], 'made':row[-1]} for row in player_shots]

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


def get_allplayers():
  params = {
    'LeagueID' : '00',
    'Season' : '2016-17', # choose most recent season for most inclusive list
    'IsOnlyCurrentSeason' : 0 # players from all seasons up to and including the specified one
  }
  data = use_json_endpoint('commonallplayers', params)
  player_profiles = data['resultSets'][0]['rowSet']
  return [{'id' : row[0], 'name': row[2]} for row in player_profiles]

def get_playerprofile(playerid, permode='PerGame'):
  params = {
    'PlayerID' : playerid,
    'PerMode' : permode
  }
  return use_json_endpoint('playerprofilev2', params)

def get_playerinfo(playerid):
  params = {
    'PlayerID' : playerid
  }
  return use_json_endpoint('commonplayerinfo', params)

def get_playerradar(playerid, season):
  raw_data = get_playerprofile(playerid)
  data = raw_data['resultSets'][8]
  rows = data['rowSet']

  s_row=[]
  for row in rows:
    if row[1] == season:
      s_row = row
      break

  # out of 10
  radar = {
    'interior_scoring' : max(2, 3+(150-s_row[25])/22),
    'outside_scoring' : max(2, 3+(150-s_row[12])/22),
    'efficiency' : max(2, 3+(150-s_row[26])/22),
    'interior_d' : max(2, 3+(150-s_row[23])/22),
    'perimeter_d' : max(2, 3+(150-s_row[22])/22),
    'bball_iq' : max(2, 3+(150-s_row[21] + 150-s_row[24])/45),
    'rebounds' : max(2, 3+(150-s_row[20])/22),
    'stamina' : max(2, 3+(150-s_row[8])/22)
  }

  return radar

