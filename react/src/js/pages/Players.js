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
    };
    PlayerActions.getPlayersSeason(this.state.curSeason);
    PlayerActions.getShotChart(this.state.curPlayer);
    PlayerActions.getRadar(this.state.curPlayer);
    PlayerActions.getImg(this.state.curPlayer);
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
    curSeason = event.target.value;
    PlayerActions.getPlayersSeason(event.target.value); 
  };

  changePlayer(event) {
    console.log(event.target.value);
    PlayerActions.getPlayerInfo(event.target.value);
    PlayerActions.getImg(event.target.value);
    PlayerActions.getShotChart(event.target.value, this.state.curSeason);
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

  render() {
    const { params } = this.props;
    const { players, curPlayer, curPlayerInfo, curPlayerShotChart, curPlayerRadar, curGraph, curPlayerCareerStats, curPlayerImgUrl } = this.state;

    var scatterData = this.state.curPlayerScatterChart;
    var shotData = this.state.curPlayerShotChart;    

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
                       <input type="radio" name="optionsRadios" id="hexagonal" value="hexagonal" checked="" onClick={() => this.setGraphOptions(0)}/>
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
                <select className="form-control" id="shotZone">
                   <option>1</option>
                   <option>2</option>
                   <option>3</option>
                   <option>4</option>
                   <option>5</option>
                </select>
              </div>
              <div className="form-group">
                <label className="control-label" htmlFor="shotAngles">Shot Angles</label>
                <select className="form-control" id="shotAngles">
                   <option>1</option>
                   <option>2</option>
                   <option>3</option>
                   <option>4</option>
                   <option>5</option>
                </select>
              </div>
              <div className="form-group">
                <label className="control-label" htmlFor="shotDistance">Shot Distance</label>
                <select className="form-control" id="shotDistance">
                   <option>1</option>
                   <option>2</option>
                   <option>3</option>
                   <option>4</option>
                   <option>5</option>
                </select>
              </div>
              <div className="form-group">
                <label className="control-label" htmlFor="fg">FG Made/Missed</label>
                <select className="form-control" id="fg">
                   <option>1</option>
                   <option>2</option>
                   <option>3</option>
                   <option>4</option>
                   <option>5</option>
                </select>
              </div>
           </div>
        </div>
      <div className="col-md-9">
        <h3 style={titleDiv}>Career Average</h3>
        <table className="table table-striped">
          <thead>
            <tr className="info">
              <th>Points</th>
              <th>Assists</th>
              <th>Rebounds</th>
              <th>All Star Appearances</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{ curPlayerCareerStats[0] }</td>
              <td>{ curPlayerCareerStats[1] }</td>
              <td>{ curPlayerCareerStats[2] }</td>
              <td>{ curPlayerCareerStats[3] }</td>
            </tr>
          </tbody>
        </table>
      </div>
      <GraphComponent radarData={radarData} shotChart={shotData} curGraph={curGraph} scatterData={scatterData}/>
    </div>
  );
}
}
