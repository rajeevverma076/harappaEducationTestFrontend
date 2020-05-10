import React, { Component } from 'react';
import {Link} from 'react-router-dom';



class Header extends Component {
    


render() {
    
    return (
        
        <nav className="navbar custom_nav navbar-expand-lg">
            <div className="container-fluid">
                <div className="row" style={{width:'calc(100% + 30px)'}}>
                    <div className="col-sm-2">
                        <Link className="logo navbar-brand" to="/">
                            <img src="img/logo.png" alt="" className="img-fluid logo-light" />
                        </Link>
                    </div>
                    <div className="col-sm-10">
                            <div className="collapse navbar-collapse" id="navbarCollapse">
                                <div className="row" style={{width:'100%'}}>
                                    {/* <div className="col-sm-4 p-0">
                                        <Link to="/live-count" className="btn btn-danger live_count mr-2" ><i className="fa fa-circle-o"></i> &nbsp; Live Count</Link>                                        
                                        <Link to="/live-trends" className="btn btn-danger live_count mr-2"><i className="fa fa-line-chart"></i> &nbsp; Google Trends</Link>                                        
                                    </div> */}
                                    <div className="col-sm-12 p-0">
                                        <ul id="menu-home-menu" className="ml-auto nav navbar-nav main_menu pull-right">
                                            {/* <li className="nav-item">
                                                <Link className="nav-link live_count" to="/election-schedule"><i className="fa fa-calendar"></i> &nbsp; Election Schedule</Link>
                                            </li> 
                                            <li className="nav-item">
                                                <Link className="nav-link live_count" to="/pickup-service"><i className="fa fa-car"></i> &nbsp; Pickup Service</Link>
                                            </li>                        
                                            <li className="nav-item">
                                                <Link className="nav-link live_count" to="/survey"><i className="fa fa-pencil-square-o"></i> &nbsp; Survey</Link>
                                            </li>   */}
                                            <li className="nav-item">
                                                <Link className="nav-link live_count" to="/login"><i className="fa fa-lock"></i> &nbsp; Admin Login</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </nav>
    );
  }
}
export default Header;
