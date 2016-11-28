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
    first_option = abbrOne + " vs. " + abbrTwo
    second_option = abbrTwo + " vs. " + abbrOne
    if date in dateToGame and first_option in dateToGame[date]:
        return dateToGame[date][first_option]
    elif date in dateToGame and second_option in dateToGame[date]:
        return dateToGame[date][second_option]
    else:
        return "GAME_WITH_THIS_KEY_DOESNT_EXIST"

def get_boxscore_summary(date, teamOne, teamTwo):
  params = {
      "GameID": get_game_key(date, teamOne, teamTwo)
      }
  return use_json_endpoint("boxscoresummaryv2", params)

def get_boxscore_summary_gid(gameid):
  params = {
      "GameID": gameid
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
  global dateToGame
  dateToGame = {}
  for year in xrange(2013, 2017):
      year_string = str(year) + "-" + str(year+1)[2:]
      print year_string
      game_info = goldsberry.GameIDs(Season=year_string).game_list()
      for game in game_info:
        date = game["GAME_DATE"]
        if date not in dateToGame:
            dateToGame[date] = {}
        dateToGame[date][game["MATCHUP"]] = game["GAME_ID"]

# return all players that ever played in the NBA
# specifcally returns mapping of name to id
def get_allplayers():
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
  query = get_playerprofile(player)
  raw_data = query['resultSets']
  meta_data = raw_data[0]['headers']
  season_idx = meta_data.index('SEASON_ID')
  rows = raw_data[0]['rowSet']

  s_row=[]
  for row in rows:
    if row[season_idx] == season:
      s_row = row
      break

  ppg_idx = meta_data.index('PTS')
  pm3_idx = meta_data.index('FG3M')
  fgp_idx = meta_data.index('FG_PCT')
  bpg_idx = meta_data.index('BLK')
  spg_idx = meta_data.index('STL')
  ast_idx = meta_data.index('AST')
  to_idx = meta_data.index('TOV')
  reb_idx = meta_data.index('REB')
  min_idx = meta_data.index('MIN')

  # Category: Stat
  # Interior Scoring: PPG: what percentage of 30
  # Outside Scoring: 3Pts: what percentage of 5 made per game
  # Efficiency: FG%: what percentage of 55
  # Interior D: Blocks: what percentage of 3 bpg
  # Perimeter D: Steals: what percentage of 2.5 spg
  # BBALL IQ: Assists to turnovers: avg(ast/to percentage of 3, st/to percentage of .85)
  # Rebounds: Rebounds: percentage of 10
  # Stamina: Minutes/ avg(minutes)

  radar = [
    min(10.0, 10*(s_row[ppg_idx]/30)),
    min(10.0, 10*(s_row[pm3_idx]/3)),
    min(10.0, 10*(s_row[fgp_idx]/0.55)),
    min(10.0, 10*(s_row[bpg_idx]/1.3)),
    min(10.0, 10*(s_row[spg_idx]/2.5)),
    min(10.0, 10*((s_row[ast_idx]/s_row[to_idx])/2.5)),
    min(10.0, 10*(s_row[reb_idx]/10)),
    min(10.0, 10*(s_row[min_idx]/40))
  ]

  return radar

# returns general team info
# WL record, division, division/conf rank, stats per game
# points score against teams, points scored on team <- on average
def get_teaminfo(season, team, seasontype="Regular Season", leagueid="00"):
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

def get_teampic(team, abrev=None):
  if abrev is None:
    return NBA_MEDIA_URL + 'img/teams/logos/' + team_abrev[team] + '_logo.svg'
  else:
    return NBA_MEDIA_URL + 'img/teams/logos/' + abrev + '_logo.svg'

def supplement_teamroster(teamroster):
  teamroster["resultSets"][0]["headers"].append("PLAYER_PIC_URL")
  player_name_index = teamroster["resultSets"][0]["headers"].index("PLAYER")
  for player in teamroster["resultSets"][0]["rowSet"]:
    player.append(get_playerpic(player[player_name_index]))
  return teamroster

def get_games_for_day(date):
  # all games for one day + teams that played in each game + ending score of game + 
  # team logos of teams that played
  if date not in dateToGame:
      return None
  games = dateToGame[date]
  res = []
  game_info = {
    'team1': None,
    'team2': None,
    'score': None,
    'logo1': None,
    'logo2': None
  }
  for gid, teams in games.iteritems():
    boxscore = get_boxscore_summary_gid(gid)
    scores = boxscore['resultSets'][5]
    meta_data = scores['headers']

    abrev_idx = meta_data.index('TEAM_ABBREVIATION')
    pts_idx = meta_data.index('PTS')

    team1 = scores['rowSet'][0][abrev_idx]
    team2 = scores['rowSet'][1][abrev_idx]
    score1 = scores['rowSet'][0][pts_idx]
    score2 = scores['rowSet'][1][pts_idx]

    game_info['team1'] = team1
    game_info['team2'] = team2
    game_info['score'] = str(score1) + '-' + str(score2)
    game_info['logo1'] = get_teampic(team1, team1)
    game_info['logo2'] = get_teampic(team2, team2)

    res.append(game_info)

  print res


# season is in 19xx-xy or 20xx-xy format
# seasontype is 'Regular Season' or 'Playoffs'
# player or team is either 'Player' or 'Team'
# ^specifies if you want player rankings or aggregate team rankings
# permode is 'PerGame' or 'Per36'
# stat is (w/o paranthesis): (PTS)|(REB)|(AST)|(FG_PCT)|(FT_PCT)|(FG3_PCT)|(STL)|(BLK)
# playerscope is 'All Players' or 'Rookies'
def get_stats_leaders(season, seasontype, stat, playerscope='All Players', playerorteam='Player', permode='PerGame'):
  params = {
    'LeagueID': '00',
    'Season': season,
    'SeasonType': seasontype,
    'PlayerOrTeam': playerorteam,
    'PerMode': permode,
    'Stat': stat,
    'PlayerScope': playerscope,
    'Scope': 'RS',
    'GameScope': 'Season'
  }

  return use_json_endpoint('leaderstiles', params)

def get_all_leaders(season, seasontype, playerscope='All Players', playerorteam='Player', permode='PerGame'):
  result = []
  for stat in ['PTS', 'REB', 'AST', 'FG_PCT', 'FT_PCT', 'FG3_PCT', 'STL', 'BLK']:
    result.append(get_stats_leaders(season, seasontype, stat, playerscope, playerorteam, permode))

  return result