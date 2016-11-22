import React from 'react';
import { Bar } from 'react-chartjs-2';

export default class Stats extends React.Component {
  constructor() {
    super(); 
    /* Add props, state here */ 
  }
  render() {
    const widthStyle = {
      width: "100%"
    };
    return (
      <div>
        
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-4">
              <img src="http://thesource.com/wp-content/uploads/2015/03/James-Harden1.jpg" alt="James Harden" />
            </div> 
            <div class="col-md-4" >
              <img src="http://www.knbr.com/wp-content/uploads/sites/82/2015/11/CURRY-PROF.jpg" alt="Stephen Curry" />
            </div>
            <div class="col-md-4">
              <img src="http://nutsandboltssports.com/wp-content/uploads/2016/10/westbrook.jpg" alt="Russell Westbrook" />
            </div> 

          </div> 
        </div>
      </div> 
      );
  }
}
