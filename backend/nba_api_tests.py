import unittest
import nba_api
import re

class testIdMapInit(unittest.TestCase):
    def testOne(self):
        nba_api.initialize_id_map()
        assert bool(nba_api.player_name2id), "player name to id map empty"
        for key, value in nba_api.player_name2id.iteritems():
            assert type(key) == unicode, "player name " + key + " not unicode"
            assert type(value) == int, "player id " + str(value) + " for " + key + " not integer"

class testPlayerCareerStats(unittest.TestCase):
    def testOne(self):
        res = nba_api.get_player_career_stats("Stephen Curry")
        assert res["resource"] == "playercareerstats", "Player Career stats are in a different format"
        assert res["resultSets"], "Player career stats are empty"

class testBoxScore(unittest.TestCase):
    def testOne(self):
        res = nba_api.get_boxscore("0041400111")
        assert res["resource"] == "boxscore", "Box Score stats are in a different format"
        assert res["resultSets"], "Box score stats are empty"

# TODO: poss add more stuff
class testLgShotAvg(unittest.TestCase):
    def testOne(self):
        res = nba_api.get_league_shotavg("2016-17")
        assert "headers" in res, "No metadata about shot averages"
        assert "rowSet" in res, "No data about shot averages"
        assert "name" in res, "No name for dataset"
        assert res['name'] == "LeagueAverages", "Incorrect dataset"

# TODO: add check if coordinates are in range of acceptable values
# TODO: find what this range is^
class testShotChart(unittest.TestCase):
    def testOne(self):
        res = nba_api.get_shotchart('Stephen Curry', '2015-16')
        for shot in res:
            assert type(shot) == dict, "Invalid shot data type"
            assert "x" in shot, "No x coordinate"
            assert "y" in shot, "No y coordinate"
            assert "made" in shot, "No made flag"
            assert type(shot['x']) == int, "Invalid x coordinate type"
            assert type(shot['y']) == int, "Invalid y coordinate type"
            assert type(shot['made']) == int, "Invalid made flag type"
            assert shot['made'] == 0 or shot['made'] == 1, "Invalid made flag value"

class testAllPlayers(unittest.TestCase):
    def testOne(self):
        # if test for initialize id map works, this function is fine
        assert True, "nothing"

class testPlayerProfile(unittest.TestCase):
    def testOne(self):
        res = nba_api.get_playerprofile('Stephen Curry')
        assert "resource" in res, "No resource indicator"
        assert res['resource'] == "playercareerstats", "Incorrect resource"
        assert "resultSets" in res, "No data returned"
        assert bool(res['resultSets']), "Data is empty"

class testPlayerInfo(unittest.TestCase):
    def testOne(self):
        res = nba_api.get_playerinfo('Stephen Curry')
        assert "resource" in res, "No resource indicator"
        assert res['resource'] == "commonplayerinfo", "Incorrect resource"
        assert "resultSets" in res, "No data returned"
        assert bool(res['resultSets']), "Data is empty"

class testPlayerRadar(unittest.TestCase):
    def testOne(self):
        res = nba_api.get_playerradar('Stephen Curry', '2015-16')
        length = len(res)
        assert length == 8, "Incorrect number of values for radar: " + str(length) + ", 8 expected"
        for v in res:
            assert type(v) == float, "Incorrect type for value: " + str(v)
            assert v >= 0 and v <= 10, "Invalid range for value: " + str(v)

class testTeamInfo(unittest.TestCase):
    def testOne(self):
        res = nba_api.get_teaminfo("2015-16", "warriors")
        assert "resource" in res, "No resource indicator"
        assert res['resource'] == "teaminfocommon", "Incorrect resource"
        assert "resultSets" in res, "No data returned"
        assert bool(res['resultSets']), "Data is empty"
        assert "parameters" in res, "No parameter info"
        assert "SeasonType" in res['parameters'], "No season type"
        assert res['parameters']['SeasonType'] == "Regular Season", "Incorrect season type"
        assert res['parameters']['TeamID'] == nba_api.team_name2id['warriors'], "Incorrect team id"
        assert res['parameters']['Season'] == "2015-16", "Incorrect season"

        res = nba_api.get_teaminfo("2015-16", "warriors", "Playoffs")
        assert "resource" in res, "No resource indicator"
        assert res['resource'] == "teaminfocommon", "Incorrect resource"
        assert "resultSets" in res, "No data returned"
        assert bool(res['resultSets']), "Data is empty"
        assert "parameters" in res, "No parameter info"
        assert "SeasonType" in res['parameters'], "No season type"
        assert res['parameters']['SeasonType'] == "Playoffs", "Incorrect season type"
        assert res['parameters']['TeamID'] == nba_api.team_name2id['warriors'], "Incorrect team id"
        assert res['parameters']['Season'] == "2015-16", "Incorrect season"

class testTeamRoster(unittest.TestCase):
    def testOne(self):
        res = nba_api.get_teamroster("2015-16", "warriors")
        assert "resource" in res, "No resource indicator"
        assert res['resource'] == "commonteamroster", "Incorrect resource"
        assert "resultSets" in res, "No data returned"
        assert bool(res['resultSets']), "Data is empty"
        assert "parameters" in res, "No parameter info"
        assert res['parameters']['TeamID'] == nba_api.team_name2id['warriors'], "Incorrect team id"
        assert res['parameters']['Season'] == "2015-16", "Incorrect season"

class testPlayersSeason(unittest.TestCase):
    def testOne(self):
        res = nba_api.get_playersseason("2015-16")
        assert res, "Player list empty"
        for player in res:
            assert type(player) == unicode

class testPlayerPic(unittest.TestCase):
    def testOne(self):
        res = nba_api.get_playerpic("Stephen Curry")
        match = re.match("http:\/\/stats.nba.com\/media\/.*\.png", res)
        assert match is not None, "Incorrectly formatted url returned"

class testTeamPic(unittest.TestCase):
    def testOne(self):
        res = nba_api.get_teampic("warriors")
        abrev = nba_api.team_abrev['warriors']
        pattern = "http:\/\/stats.nba.com\/media\/img\/teams\/logos\/.*"+abrev+"_logo.svg"
        match = re.match(pattern, res)
        assert match is not None, "Incorrectly formatted url returned"

if __name__ == "__main__":
    #nba_api.initialize_id_map()
    unittest.main()
