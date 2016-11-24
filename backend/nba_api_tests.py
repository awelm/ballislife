import unittest
import nba_api

class testIdMapInit(unittest.TestCase):
    def testOne(self):
        assert True, "nothing"

class testPlayerCareerStats(unittest.TestCase):
    def testOne(self):
        res = nba_api.get_player_career_stats("Stephen Curry")
        print res;
        assert res["resource"] == "playercareerstats", "Player Career stats are in a different format"
        assert res["resultSets"], "Player career stats are empty"

class testBoxScore(unittest.TestCase):
    def testOne(self):
        res = nba_api.get_boxscore("0041400111")
        assert res["resource"] == "boxscore", "Box Score stats are in a different format"
        assert res["resultSets"], "Box score stats are empty"

class testLgShotAvg(unittest.TestCase):
    def testOne(self):
        assert True, "nothing"        

class testShotChart(unittest.TestCase):
    def testOne(self):
        assert True, "nothing"

class testAllPlayers(unittest.TestCase):
    def testOne(self):
        assert True, "nothing"

class testPlayerProfile(unittest.TestCase):
    def testOne(self):
        assert True, "nothing"

class testPlayerInfo(unittest.TestCase):
    def testOne(self):
        assert True, "nothing"

class testPlayerRadar(unittest.TestCase):
    def testOne(self):
        assert True, "nothing"

class testTeamInfo(unittest.TestCase):
    def testOne(self):
        assert True, "nothing"

class testTeamRoster(unittest.TestCase):
    def testOne(self):
        assert True, "nothing"

class testPlayersSeason(unittest.TestCase):
    def testOne(self):
        assert True, "nothing"

class testPlayerPic(unittest.TestCase):
    def testOne(self):
        assert True, "nothing"

class testTeamPic(unittest.TestCase):
    def testOne(self):
        assert True, "nothing"

if __name__ == "__main__":
    nba_api.initialize_id_map()
    unittest.main()
