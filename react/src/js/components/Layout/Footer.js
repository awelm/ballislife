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
		    	<div class="col-md-4">
			    </div> 
			    <div class="col-md-4">
				    <FacebookLogin
				        appId="1088597931155576"
				        autoLoad
				        callback={responseFacebook}
				        icon="fa-facebook"
				    />
			    </div> 
			    <div class="col-md-4">
			    </div> 
			</div>
		  </div>
		</footer>
	);
  }
}
