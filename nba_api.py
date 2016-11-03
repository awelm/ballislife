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


