import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Login from './Login';
import Home from './SuperAdmin/Home'
import { Provider} from 'react-redux'
import configureStore from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './api/setAuthToken';
import {setCurrentUser} from './actions/ActiveUserAction'
class Routes extends React.Component {
    constructor(props){
		super(props)
		this.state ={
		  authUser:false
		}
	  }
	
	  componentDidMount() {
		const token = localStorage.getItem('jwtToken');
		if (token) {
		  setAuthToken(localStorage.jwtToken);
		  const decoded = jwt_decode(localStorage.jwtToken);
		  configureStore().dispatch(setCurrentUser(decoded));
		   // Check for expired token
		  const currentTime = Date.now() / 1000;
		  if (decoded.exp < currentTime) {
			//window.location.href = '/Login';
		  }
	   }
	  }


    render () {
      return(
        <Provider store={configureStore()}>
        <BrowserRouter>
      <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route exact path="/home" component={Home}></Route>
      </Switch> 
      </BrowserRouter>
    </Provider>)
    }
  }

export default Routes;