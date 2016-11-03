#!flask/bin/python
from flask import Flask, jsonify, request
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

@app.route('/playerCareerStats', methods=['GET'])
def get_player_stats():
    endpointUrl = "http://stats.nba.com/stats/playercareerstats?"
    params = ["PerMode", "LeagueID", "PlayerID"]
    return doRequest(endpointUrl, params)

@app.route('/shotchartdetail', methods=['GET'])
def get_player_shot_chart():
    playerID = request.args.get("PlayerID")
    season = request.args.get("Season")
    return jsonify(nba_api.get_shotchart(playerID, season))

@app.route('/commonallplayers', methods=['GET'])
def get_all_players():
    return jsonify(nba_api.get_allplayers())

@app.route('/commonplayerinfo', methods=['GET'])
def get_player_info():
    playerID = request.args.get("PlayerID")
    return jsonify(nba_api.get_playerinfo(playerID))

if __name__ == '__main__':
    app.run(debug=True)
