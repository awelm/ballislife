import requests

NBA_STATS_URL = 'http://stats.nba.com/stats/{endpoint}'
HEADERS = {'user-agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36"}

# map player names to IDs so front end can query just based on name
player_name2id = {}

# TODO: stop relying on constant indices and index based on header info returned from API calls
# ^this is because the NBA api changes often

def use_json_endpoint(endpoint, params):
  """
    sends get request to endpoint with params
    returns json object
  """
  ret = requests.get(NBA_STATS_URL.format(endpoint=endpoint), params=params, headers=HEADERS)
  ret.raise_for_status()
  return ret.json()

def get_player_career_stats(player, leagueID="00", perMode="PerGame"):
    playerID = player_name2id[player]
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

def get_shotchart(player, season, playerposition='', contextmeasure='FGA', datefrom='', dateto='', gameid='', gamesegment='', lastngames=0, leagueid='00', location='', month=0, opponentteamid=0, outcome='', period=0, position='', rookieyear='', seasonsegment='', seasontype='Regular Season', teamid=0, vsconference='', vsdivision=''):
  playerid = player_name2id[player]
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
  meta_data =  data['resultSets'][0]['headers']

  # we grab the indices from the meta data instead of having constant indices because
  # the nba api changes a lot but keeps the names of these fields consistent
  loc_x = meta_data.index('LOC_X')
  loc_y = meta_data.index('LOC_Y')
  shot_made = meta_data.index('SHOT_MADE_FLAG')

  return [{'x':row[loc_x], 'y':row[loc_y], 'made':row[shot_made]} for row in player_shots]

def initialize_id_map():
  params = {
    'LeagueID' : '00',
    'Season' : '2016-17', # choose most recent season for most inclusive list
    'IsOnlyCurrentSeason' : 0 # players from all seasons up to and including the specified one
  }
  data = use_json_endpoint('commonallplayers', params)
  player_profiles = data['resultSets'][0]['rowSet']
  global player_name2id
  player_name2id = {row[2]: row[0] for row in player_profiles}

def get_allplayers(season, leagueid="00"):
  params = {
    'LeagueID' : '00',
    'Season' : season,
    'IsOnlyCurrentSeason' : 1 # only current season
  }
  data = use_json_endpoint('commonallplayers', params)
  player_profiles = data['resultSets'][0]['rowSet']
  return [row[2] for row in player_profiles]

def get_playerprofile(player, permode='PerGame'):
  playerid = player_name2id[player]
  params = {
    'PlayerID' : playerid,
    'PerMode' : permode
  }
  return use_json_endpoint('playerprofilev2', params)

def get_playerinfo(player):
  playerid = player_name2id[player]
  params = {
    'PlayerID' : playerid
  }
  return use_json_endpoint('commonplayerinfo', params)

def get_playerradar(player, season):
  raw_data = get_playerprofile(player)
  data = raw_data['resultSets'][8]
  rows = data['rowSet']

  s_row=[]
  for row in rows:
    if row[1] == season:
      s_row = row
      break

  # out of 10
  radar = [
    max(2, 3+(150-s_row[25])/22),
    max(2, 3+(150-s_row[12])/22),
    max(2, 3+(150-s_row[26])/22),
    max(2, 3+(150-s_row[23])/22),
    max(2, 3+(150-s_row[22])/22),
    max(2, 3+(150-s_row[21] + 150-s_row[24])/45),
    max(2, 3+(150-s_row[20])/22),
    max(2, 3+(150-s_row[8])/22)
  ]

  return radar

def get_teaminfo(season, teamid, seasontype, leagueid="00"):
  params = {
    'Season': season,
    'TeamID': teamid,
    'LeagueID': leagueid,
    'SeasonType': seasontype
  }
  return use_json_endpoint('teaminfocommon', params)
