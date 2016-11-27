import React from 'react';
import {ScatterplotChart} from 'react-easy-chart';

let ReactHeatmap = require('react-heatmap');
var RadarChart = require("react-chartjs-2").Radar;

const heatMapDiv = {
    height: '521px',
    width: '808px',
    backgroundImage: 'url("./src/images/shot_chart.jpg")',
    marginLeft: '20px',
};

const playerImgStyle = {
    height: '185px',
    width: '230px',
    marginLeft: '5px'
}

const scatterConfig = [
    {
      type: 'missed',
      color: '#FF0000',
      stroke: 'black'
    },
    {
      type: 'made',
      color: '#008000',
      stroke: 'green'
    },
]

const radarOptions = {
    scale: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }],
                reverse: false,
                ticks: {
                    beginAtZero: false
                },
            },
    scaleShowLabels : false,
    showTooltips: false,
    scaleStartValue: 0
}

const graphOptions = [
    "Hexagon", "Radar", "Heatmap"
]

const shotZoneOptions = [
    "All", "Above the Break 3", "Restricted Area", "Mid-Range", "In The Paint (Non-RA)", "Left Corner 3", "Right Corner 3"
]

const shotAreaOptions = [
    "All", "Center(C)", "Left Side(L)", "Right Side Center(RC)", "Right Side(R)", "Back Court(BC)", "Left Side Center(LC)",
]

const madeMissOptions = [
    "All", "Made", "Missed"
]

const titleDiv = {
  marginTop: '0px',
}

const redCircle = {
    width: '20px',
    height: '20px',
    borderRadius: '10px',
    backgroundColor: 'red'
}

const greenCircle = {
    width: '20px',
    height: '20px',
    borderRadius: '10px',
    backgroundColor: 'green'
}

var GraphComponent = React.createClass({ 
    
  render: function() {
    var curGraph = this.props.curGraph;
  if (curGraph == graphOptions[0]) {
    return (
      <div className="col-md-9" style={heatMapDiv}>
        <ScatterplotChart data={this.props.scatterData} height={521} width={808} config={scatterConfig} xDomainRange={[-215, 245]} yDomainRange={[-26,260]}/>
      </div>
    );

  }
  else if (curGraph == graphOptions[1]) {
    return (      
      <div className="col-md-9">
        <RadarChart data={this.props.radarData} options={radarOptions} />
      </div>
    );
  }
  else {
    return (  
      <div className="col-md-9" style={heatMapDiv}>
        <ReactHeatmap max={2} data={this.props.shotChart} />
      </div>
    );
  }
  }
});

import * as PlayerActions from "../actions/PlayerActions";
import PlayerStore from "../stores/PlayerStore";

export default class Players extends React.Component {
  constructor() {
    super();
    this.changePlayer = this.changePlayer.bind(this);
    this.changeSeason = this.changeSeason.bind(this);
    this.changeShotZone = this.changeShotZone.bind(this);
    this.changeShotArea = this.changeShotArea.bind(this);
    this.changeMadeMiss = this.changeMadeMiss.bind(this);
    this.state = {
      players: PlayerStore.getAll(),
      curPlayer: PlayerStore.getCurPlayer(),
      curPlayerInfo: PlayerStore.getCurPlayerInfo(),
      curPlayerShotChart: PlayerStore.getCurPlayerShotChart(),
      curPlayerRadar: PlayerStore.getCurPlayerRadar(),
      curPlayerCareerStats: PlayerStore.getCurPlayerCareerStats(),
      curPlayerScatterChart: PlayerStore.getCurPlayerScatterChart(),
      curGraph: graphOptions[0],
      curSeason: '2016-17',
      curPlayerImgUrl: 'http://stats.nba.com/media/players/230x185/1627773.png',
      curShotZone: 'All',
      curShotArea: 'All',
      curMadeMiss: 'All',
    };
    PlayerActions.getPlayersSeason(this.state.curSeason);
    PlayerActions.getShotChart(this.state.curPlayer, this.state.curSeason, this.state.curShotZone, this.state.curShotArea, this.state.curMadeMiss);
  }

  setGraphOptions(option) {
    this.setState( {curGraph: graphOptions[option]});
  }
  

  componentWillMount() {
    PlayerStore.on("change", () => {
      this.setState({
        players: PlayerStore.getAll(),
        curPlayer: PlayerStore.getCurPlayer(),
        curPlayerInfo: PlayerStore.getCurPlayerInfo(),
        curPlayerShotChart: PlayerStore.getCurPlayerShotChart(),
        curPlayerRadar: PlayerStore.getCurPlayerRadar(),
        curPlayerCareerStats: PlayerStore.getCurPlayerCareerStats(),
        curPlayerScatterChart: PlayerStore.getCurPlayerScatterChart() ,
        curPlayerImgUrl: PlayerStore.getCurPlayerImgUrl()
      })
    })
    PlayerActions.getPlayersSeason(this.state.curSeason);
  };

  changeSeason(event) {
    PlayerActions.getPlayersSeason(event.target.value); 
    this.setState({
      curSeason: event.target.value,
      players: PlayerStore.getAll(),
    });
  };

  changePlayer(event) {
    console.log(event.target.value);
    PlayerActions.getPlayerInfo(event.target.value);
    PlayerActions.getImg(event.target.value);
    PlayerActions.getShotChart(event.target.value, this.state.curSeason, this.state.curShotZone, this.state.curShotArea, this.state.curMadeMiss);
    PlayerActions.getRadar(event.target.value, this.state.curSeason);
    this.setState({
      curPlayer: event.target.value,
      curPlayerInfo: PlayerStore.getCurPlayerInfo(),
      curPlayerShotChart: PlayerStore.getCurPlayerShotChart(),
      curPlayerRadar: PlayerStore.getCurPlayerRadar(),
      curPlayerCareerStats: PlayerStore.getCurPlayerCareerStats(),
      curPlayerScatterChart: PlayerStore.getCurPlayerScatterChart(),
      curPlayerImgUrl: PlayerStore.getCurPlayerImgUrl(),
      });
  }

  changeShotZone(event) {
    PlayerActions.getShotChart(this.state.curPlayer, this.state.curSeason, event.target.value, this.state.curShotArea, this.state.curMadeMiss);
    this.setState({
      curShotZone: event.target.value,
      curPlayerShotChart:PlayerStore.getCurPlayerShotChart(),
      curPlayerScatterChart: PlayerStore.getCurPlayerScatterChart(),
    });
  }
  
  changeShotArea(event) {
    PlayerActions.getShotChart(this.state.curPlayer, this.state.curSeason, this.state.curShotZone, event.target.value, this.state.curMadeMiss);
    this.setState({
      curShotArea: event.target.value,
      curPlayerShotChart:PlayerStore.getCurPlayerShotChart(),
      curPlayerScatterChart: PlayerStore.getCurPlayerScatterChart(),
    });
  }
  changeMadeMiss(event) {
    console.log(event.target.value);
    PlayerActions.getShotChart(this.state.curPlayer, this.state.curSeason, this.state.curShotZone, this.state.curShotArea, event.target.value);
    this.setState({
      curMadeMiss: event.target.value,
      curPlayerShotChart:PlayerStore.getCurPlayerShotChart(),
      curPlayerScatterChart: PlayerStore.getCurPlayerScatterChart(),
    });
  }
  render() {
    const { params } = this.props;
    const { players, curPlayer, curPlayerInfo, curPlayerShotChart, curPlayerRadar, curGraph, curPlayerCareerStats, curPlayerImgUrl } = this.state;

    var scatterData = this.state.curPlayerScatterChart;
    var shotData = this.state.curPlayerShotChart;    
    var curInfo = this.state.curPlayerInfo;    

    console.log(curInfo);
    const radarInput = curPlayerRadar.map((num) => {
      return 10*num;
    });

    var radarData = {
        labels: ["Bball IQ", "Efficiency", "Interior D", "Interior Scoring", "Outside Scoring", "Perimeter D", "Rebounds", "Stamina"],
        datasets: [
            {
                label: this.state.curPlayer,
                backgroundColor: "rgba(179,181,198,0.2)",
                borderColor: "rgba(179,181,198,1)",
                pointBackgroundColor: "rgba(179,181,198,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(179,181,198,1)",
                data: radarInput
            },
        ]
    };

    
    const playerList = players.sort().map((player) => {
      return <option key={player}>{ player }</option>;
    });

   
    const shotZoneOptionsList = shotZoneOptions.map((player) => {
      return <option key={player}>{ player }</option>;
    });

    const shotAreaOptionsList = shotAreaOptions.map((player) => {
      return <option key={player}>{ player }</option>;
    });

    const madeMissOptionsList = madeMissOptions.map((player) => {
      return <option key={player}>{ player }</option>;
    });

    return (
      <div className="row">
        <div className="col-sm-12">
          <h1>Players</h1>
        </div>
        <div className="col-md-3">
           <div className="well">
              <img src={this.state.curPlayerImgUrl} style={playerImgStyle}/>
              <h2 className="player-name">{ this.state.curPlayer }</h2>
              <div className="form-group">
                <label className="control-label" htmlFor="playerName">Player</label>
                  <select className="form-control" id="playerName" value={this.state.curPlayer}  onChange={this.changePlayer}>
                    { playerList }
                  </select>
              </div>
              <div className="form-group">
                <label className="control-label" htmlFor="season">Season</label>
                <select className="form-control" id="season" onChange={this.changeSeason}>
                   <option>2016-17</option>
                   <option>2015-16</option>
                   <option>2014-15</option>
                   <option>2013-14</option>
                   <option>2012-13</option>
                </select>
              </div>
              <div className="form-group">
                 <label className="control-label" htmlFor="chartType">Chart Type</label>
                 <div className="radio">
                    <label>
                       <input type="radio" name="optionsRadios" id="hexagonal" value="hexagonal" onClick={() => this.setGraphOptions(0)}/>
                       Hexagonal
                    </label>
                 </div>
                 <div className="radio">
                   <label>
                    <input type="radio" name="optionsRadios" id="radar" value="radar" onClick={() => this.setGraphOptions(1)}/>
                    Radar
                   </label>
                 </div>
                 <div className="radio">
                   <label>
                    <input type="radio" name="optionsRadios" id="heatMap" value="heatMap" onClick={() => this.setGraphOptions(2)}/>
                    Heat Map
                   </label>
                 </div>
              </div>
              <legend>Filters</legend>
              <div className="form-group">
                <label className="control-label" htmlFor="shotZone">Shot Zone</label>
                <select className="form-control" id="shotZone" onChange={this.changeShotZone}>
                    {shotZoneOptionsList}
                </select>
              </div>
              <div className="form-group">
                <label className="control-label" htmlFor="shotAngles">Shot Area</label>
                <select className="form-control" id="shotArea" onChange={this.changeShotArea}>
                  {shotAreaOptionsList}
                </select>
              </div>
              <div className="form-group">
                <label className="control-label" htmlFor="fg">FG Made/Missed</label>
                <select className="form-control" id="fg" onChange={this.changeMadeMiss}>
                  {madeMissOptionsList}
                </select>
              </div>
           </div>
        </div>
      <div className="col-md-9">
        <h3 style={titleDiv}>Career Averages</h3>
        <table className="table table-striped">
          <thead>
            <tr className="info">
              <th>Points</th>
              <th>Assists</th>
              <th>Rebounds</th>
              <th>Seasons</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{ curInfo['resultSets'][1]['rowSet'][0][3] }</td>
              <td>{ curInfo['resultSets'][1]['rowSet'][0][4] }</td>
              <td>{ curInfo['resultSets'][1]['rowSet'][0][5] }</td>
              <td>{ curInfo['resultSets'][0]['rowSet'][0][12] }</td>
            </tr>
          </tbody>
        </table>
      </div>
      <GraphComponent radarData={radarData} shotChart={shotData} curGraph={curGraph} scatterData={scatterData}/>
    </div>
  );
}
}
