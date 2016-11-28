import React from 'react';
import auth from './../components/Authentication';
import { Link  } from 'react-router';



class Logout extends React.Component {
  constructor(props, context){
    super(props, context);
  }

  componentDidMount() {
    auth.logout();
  }


  render(){
    return (
      <div className="container marginTop">

          <div className="about">

            <p>
              You are logged out. Go back to <Link to="/">Home</Link>
          </p>

        </div>

      <br/>

    </div>
  )
}
}

export default Logout;
