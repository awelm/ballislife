-- MySQL dump 10.13  Distrib 5.7.13, for osx10.11 (x86_64)
--
-- Host: localhost    Database: nba
-- ------------------------------------------------------
-- Server version	5.7.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `boxscore`
--

DROP TABLE IF EXISTS `boxscore`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boxscore` (
  `game_id` varchar(20) NOT NULL,
  `team_id` varchar(20) NOT NULL,
  `starting_position` varchar(5) DEFAULT NULL,
  `seconds_played` int(11) DEFAULT NULL,
  `fg_m` int(11) DEFAULT NULL,
  `fg_a` int(11) DEFAULT NULL,
  `fg_pct` double DEFAULT NULL,
  `threes_m` int(11) DEFAULT NULL,
  `threes_a` int(11) DEFAULT NULL,
  `threes_pct` double DEFAULT NULL,
  `ft_m` int(11) DEFAULT NULL,
  `ft_a` int(11) DEFAULT NULL,
  `ft_pct` double DEFAULT NULL,
  `oreb` int(11) DEFAULT NULL,
  `dreb` int(11) DEFAULT NULL,
  `rebounds` int(11) DEFAULT NULL,
  `assists` int(11) DEFAULT NULL,
  `steals` int(11) DEFAULT NULL,
  `blocks` int(11) DEFAULT NULL,
  `turnovers` int(11) DEFAULT NULL,
  `personal_fouls` int(11) DEFAULT NULL,
  `points` int(11) DEFAULT NULL,
  `plus_minus` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boxscore`
--

LOCK TABLES `boxscore` WRITE;
/*!40000 ALTER TABLE `boxscore` DISABLE KEYS */;
/*!40000 ALTER TABLE `boxscore` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `followings`
--

DROP TABLE IF EXISTS `followings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `followings` (
  `u_id` varchar(100) NOT NULL,
  `type` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  UNIQUE KEY `unique_index` (`u_id`,`type`,`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followings`
--

LOCK TABLES `followings` WRITE;
/*!40000 ALTER TABLE `followings` DISABLE KEYS */;
INSERT INTO `followings` VALUES ('akila',1,'bitch'),('akila',1,'dudeguy'),('akila',1,'plis');
/*!40000 ALTER TABLE `followings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gamesummary`
--

DROP TABLE IF EXISTS `gamesummary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gamesummary` (
  `game_id` varchar(20) DEFAULT NULL,
  `game_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `home_team_id` varchar(20) DEFAULT NULL,
  `visitory_team_id` varchar(20) DEFAULT NULL,
  `season` varchar(10) DEFAULT NULL,
  `home_points` int(11) DEFAULT NULL,
  `away_points` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gamesummary`
--

LOCK TABLES `gamesummary` WRITE;
/*!40000 ALTER TABLE `gamesummary` DISABLE KEYS */;
/*!40000 ALTER TABLE `gamesummary` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-11-21 21:24:42
