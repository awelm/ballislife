import React from 'react';
import { Bar } from 'react-chartjs-2';

import Image from "../components/Image";

export default class Stats extends React.Component {
  constructor() {
    super(); 
    /* Add props, state here */ 
  }
  render() {
    /* Const values for now */ 
    const Images = [
      "http://thesource.com/wp-content/uploads/2015/03/James-Harden1.jpg",
      "http://www.knbr.com/wp-content/uploads/sites/82/2015/11/CURRY-PROF.jpg",
      "http://nutsandboltssports.com/wp-content/uploads/2016/10/westbrook.jpg"
    ].map((img_url, i) => <Image key={i} img_url={img_url} />);
    return (
      <div>
        <h1> Top Performers Today </h1> 
          <div class="row">
            {Images}
          </div> 
      </div> 
      );
  }
}
