import unittest
import nba_api

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

if __name__ == "__main__":
    nba_api.initialize_id_map()
    unittest.main()
