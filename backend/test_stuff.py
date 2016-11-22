import nba_api

season = '2015-16'
pid = 2544
raw_data = nba_api.get_playerradar(pid, season)
data = raw_data['resultSets'][8]
rows = data['rowSet']
headers = data['headers']

s_row=[]
for row in rows:
	if row[1] == season:
		s_row = row
		break

# out of 10
radar = {
	'interior_scoring' : max(2, 3+(150-s_row[25])/22),
	'outside_scoring' : max(2, 3+(150-s_row[12])/22),
	'efficiency' : max(2, 3+(150-s_row[26])/22),
	'interior_d' : max(2, 3+(150-s_row[23])/22),
	'perimeter_d' : max(2, 3+(150-s_row[22])/22),
	'bball_iq' : max(2, 3+(150-s_row[21] + 150-s_row[24])/45),
	'rebounds' : max(2, 3+(150-s_row[20])/22),
	'stamina' : max(2, 3+(150-s_row[8])/22),
}

print radar

# Category: Stat
# Interior Scoring: PPG, 25
# Outside Scoring: 3Pts, 12
# Efficiency: FG%, 11 OR 26
# Interior D: Blocks, 23
# Perimeter D: Steals, 22
# BBALL IQ: Assists to turnovers 21/24
# Rebounds: Rebounds 20
# Stamina: Minutes/ avg(minutes) 8


# Approx 415 players in NBA
