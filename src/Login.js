import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { NotificationContainer, NotificationManager } from 'react-notifications';
// redux action
import { signinUserIn } from './actions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "saller@gmail.com",
            username1: "customer@gmail.com",
            password: "",
            redirectToReferrer: false,
            role: "",
            emailError: "",
            passError: "",
            roleError: "",
            dashboard: "1"
        }
    }


    change = e => {
        if (this.state.dashboard === "1") {
            this.setState({
                [e.target.name]: e.target.value
            });
        } else {
            this.setState({
                username1: e.target.value
            });
        }

    };

    validate = () => {
        let isError = false;
        if (this.refs.loginRole.value == "") {
            isError = true;
            this.setState({ roleError: 'Please select role of User !' })
        }

        if (this.state.password == "") {
            isError = true;
            this.setState({ passError: 'Password needs to be filled !' })
        }
        var reg = /^\S+@\S+\.\S+$/;
        if (reg.test(this.state.username) === false) {
            isError = true;
            this.setState({ emailError: 'Requires valid email !' })

        }
        return isError;
    };

    onSubmit = e => {


        e.preventDefault();
        const err = this.validate();
        if (!err) {
            //console.log(err);
            const userData = {
                role: this.refs.loginRole.value,
                email: this.state.dashboard === "1" ? this.state.username : this.state.username1,
                password: this.state.password
            };
            localStorage.setItem("role", this.refs.loginRole.value)
            console.log(userData);
            //debugger
            this.props.signinUserIn(userData, this.props.history)
            //this.props.history.push('/home')
        }

    };

    handleChange = (e) => {
        e.preventDefault()
        console.log(e.target.value)
        this.setState({ role: e.target.value });
    }

    selectedDashboard = (e) => {
        this.setState({
            dashboard: e.target.value
        });
    }


    render() {

        return (
            <div style={{ height: '100vh' }}>
                <section className="position-relative header_bg" style={{ margin: 0, }}>
                    <div className="container-fluid z-index position-relative">

                        <div className="col-md-6 col-lg-4 mt-5 ml-auto mr-auto">
                            <div className="login_logo text-center">
                                
                            </div>

                            <div className="contact_form login_form">
                                <div className="home_content text-center mb-20">
                                    <h1>Login</h1>
                                </div>
                                <form>
                                    <div className="row" id="login">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <select className="form-control" ref="loginRole" onChange={e => this.selectedDashboard(e)}>
                                                    <option value="1">Seller</option>
                                                    <option value="2">Customer</option>
                                                </select>
                                                <label className="error">{this.state.roleError}</label>
                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <input type="text" name="username" id="username" value={this.state.dashboard === "1" ? this.state.username : this.state.username1} className="form-control" onChange={e => this.change(e)} placeholder="Email" />
                                                <label className="error">{this.state.emailError}</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <input type="password" name="password" id="password" value={this.state.password} className="form-control" onChange={e => this.setState({password:e.target.value})} placeholder="Password" />
                                                <label className="error">{this.state.passError}</label>
                                            </div>

                                        </div>
                                       
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-lg-12 text-center">
                                            <button className="btn btn-success w-100 btn_login" onClick={e => this.onSubmit(e)}>Login</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <NotificationContainer />
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
//export default Login;
const mapStateToProps = ({ authUser }) => {
    const { user, loading, isAuthenticated } = authUser;
    return { user, loading, isAuthenticated }
}
export default connect(mapStateToProps, {
    signinUserIn,
})(Login);