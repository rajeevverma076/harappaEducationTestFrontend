import React, { Component } from 'react';
import {Route, Link, NavLink, HashRouter as Router} from 'react-router-dom';
import Dashboard from './Dashboard';
import Customer from './Customer';
class SuperDashboard extends Component{   
  constructor () {
    super()
    this.state = {
      isHidden: true,
      visible: false,
      role: localStorage.getItem('role'),
      user_name:'',
      constituencyName:'',
      pollingDivisionName:''
    }

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  componentWillMount(){
    this.setState({
      role: localStorage.getItem('role')
    })
    console.log(localStorage.getItem('role'))
    
  }
  //Get UserName
  async componentDidMount (){
    this.setState({
      user_name: await localStorage.getItem('name'),
    })
  }

  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  toggleMenu() {
    this.setState({visible: !this.state.visible})
}


   handleLogout=(e)=>
  {
    localStorage.clear();
    this.props.history.push('/')
  }
  render(){
    return (
      <div>
        <Router>
          <div>
          <div className="nav_panel">
               <div className="row">
                <div className="col-sm-12 headRight">
                  <h3 className="text-left px-3">Testing E-commerce {this.state.role}</h3>
                        <div className="nav_profile pull-right">
                            <div className="dropdown">
                            {this.state.role === '1' ? 
                              <img className="rounded-circle mx-auto img-thumbnail" src="https://greendestinations.org/wp-content/uploads/2019/05/avatar-exemple-300x277.jpg" alt="Card image cap" onClick={this.toggleHidden.bind(this)} />
                              :<img className="rounded-circle mx-auto img-thumbnail" src="https://greendestinations.org/wp-content/uploads/2019/05/avatar-exemple-300x277.jpg" alt="Card image cap" onClick={this.toggleHidden.bind(this)} />
                            }
                               <div className="dropdown-menu">
                                <Link className="dropdown-item" to="" onClick={this.handleLogout}><i className="fa fa-lock"></i> &nbsp; Log Out</Link>
                              </div>
                            </div>
                        </div>
                  </div>              
              </div>
              
          </div>

        <div className="main_container">
          <div>
              <div className="wrapper" >
              {this.state.role === '1' ? <Route exact path="/" component={Dashboard}></Route> : <Route exact path="/" component={Customer}></Route>
               }                                
              </div>      
          </div>       
          </div>
            
        </div>
        </Router>

      </div>
    )
  }
}

export default SuperDashboard;
