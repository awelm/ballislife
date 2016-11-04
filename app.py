#!flask/bin/python
from datetime import timedelta
from flask import Flask, jsonify, make_response, request, current_app
from functools import update_wrapper

import requests

import sys
sys.path.insert(0, './backend')
import nba_api

app = Flask(__name__)

test_json_data = [
            {
                'test': 'hello',
            },
            {
                'sample_json_key': 10,
                'bs_array': [12,3,4,2]
            }
        ]

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

@app.route('/playercareerstats', methods=['GET'])
def get_player_stats():
    endpointUrl = "http://stats.nba.com/stats/playercareerstats?"
    perMode = request.args.get("PerMode")
    leagueID = request.args.get("LeagueID")
    playerID = request.args.get("PlayerID")
    return jsonify(nba_api.get_player_career_stats(perMode, leagueID, playerID))

@app.route('/shotchartdetail', methods=['GET'])
def get_player_shot_chart():
    playerID = request.args.get("PlayerID")
    season = request.args.get("Season")
    return jsonify(nba_api.get_shotchart(playerID, season))

@app.route('/commonallplayers', methods=['GET'])
@crossdomain(origin='*')
def get_all_players():
    return jsonify(nba_api.get_allplayers())

@app.route('/commonplayerinfo', methods=['GET'])
def get_player_info():
    playerID = request.args.get("PlayerID")
    return jsonify(nba_api.get_playerinfo(playerID))

if __name__ == '__main__':
    app.run(debug=True)
