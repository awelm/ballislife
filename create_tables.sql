CREATE TABLE boxscore(
  game_id varchar(20) NOT NULL,
  team_id varchar(20) NOT NULL,
  starting_position varchar(5),
  seconds_played integer,
  fg_m integer,
  fg_a integer,
  fg_pct float8,
  threes_m integer,
  threes_a integer,
  threes_pct float8,
  ft_m integer,
  ft_a integer,
  ft_pct float8,
  oreb integer,
  dreb integer,
  rebounds integer,
  assists integer,
  steals integer,
  blocks integer,
  turnovers integer,
  personal_fouls integer,
  points integer,
  plus_minus integer
);

CREATE TABLE gamesummary(
  game_id varchar (20),
  game_date timestamp,
  home_team_id varchar(20),
  visitory_team_id varchar(20),
  season varchar(10),
  home_points integer,
  away_points integer
);

CREATE TABLE followings(
  type integer,
  name varchar(40)
);
