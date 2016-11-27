import requests
import goldsberry

NBA_STATS_URL = 'http://stats.nba.com/stats/{endpoint}'
NBA_MEDIA_URL = 'http://stats.nba.com/media/'
HEADERS = {'user-agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36"}

# map player names to IDs so front end can query just based on name
player_name2id = {}
team_name2id = {
  'hawks': 1610612737,
  'celtics':  1610612738,
  'nets': 1610612751,
  'hornets': 1610612766,
  'bulls': 1610612741,
  'cavaliers': 1610612739,
  'mavericks':  1610612742,
  'nuggets':  1610612743,
  'pistons': 1610612765,
  'warriors': 1610612744,
  'rockets': 1610612745,
  'pacers':  1610612754,
  'clippers':  1610612746,
  'lakers':  1610612747,
  'grizzlies': 1610612763,
  'heat':  1610612748,
  'bucks': 1610612749,
  'timberwolves':  1610612750,
  'pelicans':  1610612740,
  'knicks': 1610612752,
  'thunder': 1610612760,
  'magic': 1610612753,
  '76ers':  1610612755,
  'suns':  1610612756,
  'blazers':  1610612757,
  'kings':  1610612758,
  'spurs': 1610612759,
  'raptors': 1610612761,
  'jazz': 1610612762,
  'wizards':  1610612764
}

team_abrev = {
  'pistons': 'DET',
  'grizzlies': 'MEM',
  'kings': 'SAC',
  'bucks': 'MIL',
  'hornets': 'CHA',
  'knicks': 'NYK',
  'thunder': 'OKC',
  'hawks': 'ATL',
  'wizards': 'WAS',
  'suns': 'PHX',
  'nuggets': 'DEN',
  '76ers': 'PHI',
  'cavaliers': 'CLE',
  'jazz': 'UTA',
  'timberwolves': 'MIN',
  'clippers': 'LAC',
  'bulls': 'CHI',
  'heat': 'MIA',
  'celtics': 'BOS',
  'nets': 'BKN',
  'magic': 'ORL',
  'mavericks': 'DAL',
  'pelicans': 'NOP',
  'blazers': 'POR',
  'lakers': 'LAL',
  'pacers': 'IND',
  'rockets': 'HOU',
  'warriors': 'GSW',
  'raptors': 'TOR',
  'spurs': 'SAS'
}

# cache computed results for players in a season
players_season = {}

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

def get_game_key(date, teamOne, teamTwo):
    abbrOne = team_abrev[teamOne.lower()]
    abbrTwo = team_abrev[teamTwo.lower()]
    first_option = date + abbrOne + " vs. " + abbrTwo
    second_option = date + abbrTwo + " vs. " + abbrOne
    if first_option in dateToGame:
        return dateToGame[first_option]
    elif second_option in dateToGame:
        return dateToGame[second_option]
    else:
        return "GAME WITH THIS KEY DOESN'T EXIST"

def get_boxscore_summary(date, teamOne, teamTwo):
  params = {
      "GameID": get_game_key(date, teamOne, teamTwo)
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
  league_shots = data['resultSets'][1]
  return league_shots
  #return [{'x':row[-4], 'y':row[-3], 'made':row[-1]} for row in player_shots]

# shottype must be one of:
# u'3PT Field Goal', u'2PT Field Goal'
#
# shotzone must be one of:
# u'Backcourt', u'In The Paint (Non-RA)', u'Right Corner 3', u'Above the Break 3', u'Left Corner 3', u'Restricted Area', u'Mid-Range'
#
# shotarea must be one of:
# u'Center(C)', u'Left Side(L)', u'Right Side Center(RC)', u'Right Side(R)', u'Back Court(BC)', u'Left Side Center(LC)'
#
# shotdist must be an integer
def get_shotchart(player, season, shottype=None, shotzone=None, shotarea=None, shotdist=None, playerposition='', contextmeasure='FGA', datefrom='', dateto='', gameid='', gamesegment='', lastngames=0, leagueid='00', location='', month=0, opponentteamid=0, outcome='', period=0, position='', rookieyear='', seasonsegment='', seasontype='Regular Season', teamid=0, vsconference='', vsdivision=''):
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
  shot_type = meta_data.index('SHOT_TYPE')
  shot_zone_b = meta_data.index('SHOT_ZONE_BASIC')
  shot_zone_a = meta_data.index('SHOT_ZONE_AREA')
  shot_dist = meta_data.index('SHOT_DISTANCE')
  # shot_zone_r = meta_data.index('SHOT_ZONE_RANGE')
  # action_type = meta_data.index('ACTION_TYPE')

  shot_info = []

  if shotdist is not None:
    shotdist = int(shotdist)

  for row in player_shots:
    if (shottype is not None) and (row[shot_type] != shottype):
      continue
    if (shotzone is not None) and (row[shot_zone_b] != shotzone):
      continue
    if (shotarea is not None) and (row[shot_zone_a] != shotarea):
      continue
    if (shotdist is not None) and (row[shot_dist] != shotdist):
        continue
    shot_info.append({'x':row[loc_x], 'y':row[loc_y], 'made':row[shot_made]})

  return shot_info

  # actions = set()
  # shottypes = set()
  # shotzoneb = set()
  # shotzonea = set()
  # shotzoner = set()
  # shotdist = set()
  # for row in player_shots:
  #   actions.add(row[action_type])
  #   shottypes.add(row[shot_type])
  #   shotzoneb.add(row[shot_zone_b])
  #   shotzonea.add(row[shot_zone_a])
  #   shotzoner.add(row[shot_zone_r])
  #   shotdist.add(row[shot_dist])

  # print "actions"
  # print actions
  # print "\nshot types"
  # print shottypes
  # print "\nshot zone basic"
  # print shotzoneb
  # print "\nshot zone area"
  # print shotzonea
  # print "\nshot zone range"
  # print shotzoner
  # print "\nshot distance"
  # print shotdist



  # [u'GRID_TYPE', u'GAME_ID', u'GAME_EVENT_ID', u'PLAYER_ID', u'PLAYER_NAME', u'TEAM_ID',
  #  u'TEAM_NAME', u'PERIOD', u'MINUTES_REMAINING', u'SECONDS_REMAINING', u'EVENT_TYPE',
  #  u'ACTION_TYPE', u'SHOT_TYPE', u'SHOT_ZONE_BASIC', u'SHOT_ZONE_AREA', u'SHOT_ZONE_RANGE',
  #  u'SHOT_DISTANCE', u'LOC_X', u'LOC_Y', u'SHOT_ATTEMPTED_FLAG', u'SHOT_MADE_FLAG', u'GAME_DATE',
  #  u'HTM', u'VTM']

  # return [{'x':row[loc_x], 'y':row[loc_y], 'made':row[shot_made]} for row in player_shots]

# intialize mapping of player name to id
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
  game_info = goldsberry.GameIDs().game_list()
  global dateToGame
  dateToGame = {}
  for game in game_info:
    dateToGame[game["GAME_DATE"] + game["MATCHUP"]] = game["GAME_ID"]

# return all players that ever played in the NBA
# specifcally returns mapping of name to id
def get_allplayers():
  # params = {
  #   'LeagueID' : '00',
  #   'Season' : season,
  #   'IsOnlyCurrentSeason' : 1 # only current season
  # }
  # data = use_json_endpoint('commonallplayers', params)
  # player_profiles = data['resultSets'][0]['rowSet']
  # return [row[2] for row in player_profiles]
  return player_name2id

# returns player averages for each season
def get_playerprofile(player, permode='PerGame'):
  playerid = player_name2id[player]
  params = {
    'PlayerID' : playerid,
    'PerMode' : permode
  }
  return use_json_endpoint('playerprofilev2', params)

# returns player metadata
# e.g. what college, height, weight, etc
def get_playerinfo(player):
  playerid = player_name2id[player]
  params = {
    'PlayerID' : playerid
  }
  return use_json_endpoint('commonplayerinfo', params)

# returns radar for player for a particular season
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

# returns general team info
# WL record, division, division/conf rank, stats per game
# points score against teams, points scored on team <- on average
def get_teaminfo(season, team, seasontype, leagueid="00"):
  teamid = team_name2id[team]
  params = {
    'Season': season,
    'TeamID': teamid,
    'LeagueID': leagueid,
    'SeasonType': seasontype
  }
  return use_json_endpoint('teaminfocommon', params)

# returns roster for team for a season
# includes coaches
def get_teamroster(season, team):
  teamid = team_name2id[team]
  params = {
    'Season': season,
    'TeamID': teamid
  }
  return use_json_endpoint('commonteamroster', params)

# get all players for a specific season
def get_playersseason(season):
  global players_season
  if season in players_season:
    return players_season[season]

  temp_arr = []
  for team in team_name2id:
    info = get_teamroster(season, team)
    meta_data = info['resultSets'][0]['headers']
    name_index = meta_data.index("PLAYER")

    roster = info['resultSets'][0]['rowSet']
    for p in roster:
      temp_arr.append(p[name_index])

  players_season[season] = temp_arr
  return temp_arr

def get_playerpic(player):
  playerid = player_name2id[player]
  endpoint = str(playerid) + '.png'
  return NBA_MEDIA_URL + 'players/230x185/' + endpoint

def get_teampic(team):
  return NBA_MEDIA_URL + 'img/teams/logos/' + team_abrev[team] + '_logo.svg'

