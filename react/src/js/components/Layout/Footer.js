import React from 'react';
import centerComponent from 'react-center-component';
import FacebookLogin from '../FacebookLogin';

export default class Footer extends React.Component {

  render() {
  	const responseFacebook = (response) => {
      console.log(response);
    };

  	return (
		<footer className="footer">
		  <div className="container">
		    <div class="row">
			</div>
		  </div>
		</footer>
	);
  }
}
