from datetime import timedelta
from flask import Flask, jsonify, make_response, request, current_app
from functools import update_wrapper

import requests
import sys
import MySQLdb
import feedparser
from bson import json_util
import json

sys.path.insert(0, './backend')
import nba_api

app = Flask(__name__)
#database connection
con = MySQLdb.connect('localhost', 'root', '', 'nba')
nba_api.initialize_id_map()

# For Cors
def crossdomain(origin=None, methods=None, headers=None,
                max_age=21600, attach_to_all=True,
                automatic_options=True):
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, basestring):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, basestring):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers

            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)
    return decorator

app = Flask(__name__)

def crossdomain(origin=None, methods=None, headers=None,
                max_age=21600, attach_to_all=True,
                automatic_options=True):
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, basestring):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, basestring):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers

            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)
    return decorator

def doRequest(endpointUrl, params):
    """
    General purpose function which takes the endpoint URL and a list of different
    parameter fields which we will be using in the request. The parameter values
    will be obtained from the 'requests' module.

    @type endpointUrl: string
    @param endpointUrl: URL endpoint of the request
    @type params: List[string]
    @param params: List of parameters which will be passed to the request

    @rtype: jsonObject
    @return: the JSON object resulting from the request
    """
    finalUrl = endpointUrl
    for param in params:
        finalUrl = finalUrl + param + "=" + str(request.args.get(param)) + "&"
    finalUrl = finalUrl[:-1]
    print "<<<<<<OUTGOING REQUEST:>>>>>>>"
    print finalUrl
    requestJson = requests.get(finalUrl)
    return jsonify(requestJson.json())

@app.route('/', methods=['GET'])
def get_tasks():
    return jsonify({'test_json_data': test_json_data})

# a players career stats
@app.route('/playercareerstats', methods=['GET'])
@crossdomain(origin='*')
def get_player_stats():
    endpointUrl = "http://stats.nba.com/stats/playercareerstats?"
    perMode = request.args.get("PerMode") or "PerGame"
    leagueID = request.args.get("LeagueID") or "00"
    player = request.args.get("Player")
    return jsonify(nba_api.get_player_career_stats(player, leagueID, perMode))

# shot chart info
@app.route('/shotchartdetail', methods=['GET'])
@crossdomain(origin='*')
def get_player_shot_chart():
    player = request.args.get("Player")
    season = request.args.get("Season")
    # filters
    shottype = request.args.get("ShotType")
    shotzone = request.args.get("ShotZone")
    shotarea = request.args.get("ShotArea")
    shotdist = request.args.get("ShotDist")
    return jsonify(nba_api.get_shotchart(player, season, shottype, shotzone, shotarea, shotdist))

# player radar
@app.route('/playerradar', methods=['GET'])
@crossdomain(origin='*')
def get_player_radar():
    player = request.args.get("Player")
    season = request.args.get("Season")
    return jsonify(nba_api.get_playerradar(player, season))

# returns all players ever played in the nba
@app.route('/commonallplayers', methods=['GET'])
@crossdomain(origin='*')
def get_all_players():
    return jsonify(nba_api.get_allplayers())

# return general info about player: height, weight, etc
@app.route('/commonplayerinfo', methods=['GET'])
@crossdomain(origin='*')
def get_player_info():
    player = request.args.get("Player")
    return jsonify(nba_api.get_playerinfo(player))

# returns general info about team: WL pct, team stats for each category (per game)
@app.route('/teaminfocommon', methods=['GET'])
@crossdomain(origin='*')
def get_team_info():
    season = request.args.get("Season")
    team = request.args.get("Team")
    seasontype = request.args.get("SeasonType") or "Regular Season"
    return jsonify(nba_api.get_teaminfo(season, team, seasontype))

# return team roster for a season
@app.route('/commonteamroster', methods=['GET'])
@crossdomain(origin='*')
def get_team_roster():
    season = request.args.get("Season")
    team = request.args.get("Team")
    return jsonify(nba_api.get_teamroster(season, team))

# return all players for a season
@app.route('/playersseason', methods=['GET'])
@crossdomain(origin='*')
def get_players_season():
    season = request.args.get("Season") or "2016-17"
    return jsonify(nba_api.get_playersseason(season))

@app.route('/follow_new_entity', methods=['POST'])
@crossdomain(origin='*')
def follow_new_entity():
    u_id = request.form["u_id"]
    follow_type = request.form["type"]
    follow_name = request.form["name"]
    cursor = con.cursor()
    query = "INSERT INTO followings ( u_id, type, name) \
            VALUES ('%s', '%d', '%s')" % \
            (u_id, int(follow_type), follow_name)
    try:
        cursor.execute(query)
        con.commit()
        return jsonify("{status: success}")
    except:
        con.rollback()
        print "Error inserting new following into database"
    return jsonify("{status: failed}")

@app.route('/get_followings', methods=['GET'])
@crossdomain(origin='*')
def get_followings():
    u_id = request.args.get('u_id')
    cursor = con.cursor()
    query = "SELECT * FROM followings WHERE \
            u_id = ('%s')" % \
            (u_id)
    try:
        cursor.execute(query)
        results = cursor.fetchall()
        print results
        return jsonify(results)
    except:
        print "Error querying the followings data"
        return jsonify("{status: failed}")

@app.route('/get_team_news', methods=['GET'])
@crossdomain(origin='*')
def get_team_news():
    team = request.args.get('Team')
    rss_link = 'http://www.nba.com/' + team.lower() + '/rss.xml'
    team_news = feedparser.parse(rss_link)
    team_news_string = str(team_news)
    return jsonify(team_news_string)

@app.route('/get_player_news', methods=['GET'])
@crossdomain(origin='*')
def get_player_news():
    print request.args.get('Player')
    player = str(request.args.get('Player')).lower().replace("_", " ")
    rss_link = "http://www.rotoworld.com/rss/feed.aspx?sport=nba&ftype=news&count=500&format=rss"
    all_news = feedparser.parse(rss_link)
    player_news = []
    for item in all_news["items"]:
        print item
        if player in str(item["title"]).lower():
            player_news.append({
                "title": item["title"],
                "summary": item["summary"],
                "link": item["link"]
                })
    return jsonify({"news": player_news})


@app.route('/playerpic', methods=['GET'])
@crossdomain(origin='*')
def get_player_pic():
    player = request.args.get("Player")
    return jsonify({"url":nba_api.get_playerpic(player)})

@app.route('/teampic', methods=['GET'])
@crossdomain(origin='*')
def get_team_pic():
    team = request.args.get("Team") or None
    return jsonify({"url":nba_api.get_teampic(team)})

@app.route('/leagueshotavg', methods=['GET'])
@crossdomain(origin='*')
def get_league_shotavg():
    season = request.args.get("Season") or None
    return jsonify(nba_api.get_league_shotavg(season))


@app.route('/getboxscore', methods=['GET'])
@crossdomain(origin='*')
def get_box_score():
    date = request.args.get("Date") or None
    teamOne = request.args.get("TeamOne") or None
    teamTwo = request.args.get("TeamTwo") or None
    return jsonify(nba_api.get_boxscore_summary(date, teamOne, teamTwo))

if __name__ == '__main__':
    app.run(debug=True)
