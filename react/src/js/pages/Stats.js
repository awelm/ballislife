import React, { Component } from 'react';
import Chartist from 'chartist';
// import Chartist from 'react-chartist';

export default class Stats extends Component {
  componentDidMount() {
    const times = n => Array(...new Array(n));
    const data = times(52).map(Math.random).reduce((_data, rnd, index) => {
      _data.labels.push(index + 1);
      _data.series.forEach((series) => {
        series.push(Math.random() * 100);
      });

      return _data;
    }, {
      labels: [],
      series: times(4).map(() => [])
    });

    const options = {
      showLine: false,
      axisX: {
        labelInterpolationFnc(value, index) {
          return index % 13 === 0 ? `W${value}` : null;
        }
      }
    };

    const responsiveOptions = [
      ['screen and (min-width: 640px)', {
        axisX: {
          labelInterpolationFnc(value, index) {
            return index % 4 === 0 ? `W${value}` : null;
          }
        }
      }]
    ];

    new Chartist.Line('.ct-chart', data, options, responsiveOptions);
  }

  render() {
    return (
      <div>
        <h1>Stats</h1>
        <div className="ct-chart" />
      </div>
    );
  }
}
