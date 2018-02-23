import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

class LoginPage extends Component {
    logIn(event) {
        event.preventDefault();
        this.props.onLogIn({
            username: this.logUsername.value,
            password: this.logPassword.value
        });
        this.logUsername.value = '';
        this.logPassword.value = '';
        this.signEmail.value = '';
        this.signFullname.value = '';
        this.signUsername.value = '';
        this.signPassword.value = '';
    }

    signUp(event) {
        event.preventDefault();
        this.props.onSignUp({
            email: this.signEmail.value,
            fullname: this.signFullname.value,
            username: this.signUsername.value,
            password: this.signPassword.value
        });
        this.logUsername.value = '';
        this.logPassword.value = '';
        this.signEmail.value = '';
        this.signFullname.value = '';
        this.signUsername.value = '';
        this.signPassword.value = '';
    }

    render() {
        // console.log(this.props.userPage);
        // console.log(this.props.currentPhoto);
        //this.props.photoStore.map((photo, index) => console.log(photo.src) );
        return (
            <div>
                <Header />
                <div className="main">
                    <div className="main-wrapper">
                        <div className="main-content">
                            <div className="log-or-sing">
                                <div className="welcome">Welcome to Instagram</div>
                                <div className="auth-description">Authorization</div>
                                <form onSubmit={this.logIn.bind(this)} className="log-in">
                                    <div className="input-auth">
                                        <div className="label">Username</div>
                                        <input className="auth"
                                            type="text"
                                            placeholder="Username"
                                            ref={(input) => this.logUsername = input}
                                        />
                                    </div>
                                    <div className="input-auth">
                                        <div className="label">Password</div>
                                        <input className="auth"
                                            type="text"
                                            placeholder="Password"
                                            ref={(input) => this.logPassword = input}
                                        />
                                    </div>
                                    <button>Log In</button>
                                </form>
                                <div className="auth-description">Registration</div>
                                <form onSubmit={this.signUp.bind(this)} className="sing-up">
                                    <div className="input-auth">
                                        <div className="label">Email</div>
                                        <input className="auth"
                                            type="text"
                                            placeholder="Email"
                                            ref={(input) => this.signEmail = input}
                                        />
                                    </div>
                                    <div className="input-auth">
                                        <div className="label">Full Name</div>
                                        <input className="auth"
                                            type="text"
                                            placeholder="Full Name"
                                            ref={(input) => this.signFullname = input}
                                        />
                                    </div>
                                    <div className="input-auth">
                                        <div className="label">Username</div>
                                        <input className="auth"
                                            type="text"
                                            placeholder="Username"
                                            ref={(input) => this.signUsername = input}
                                        />
                                    </div>
                                    <div className="input-auth">
                                        <div className="label">Password</div>
                                        <input className="auth"
                                            type="text"
                                            placeholder="Password"
                                            ref={(input) => this.signPassword = input}
                                        />
                                    </div>
                                    <button>Sign Up</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div >
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let userPage;
    state.user.map((user, index) => {
        if (user.nick === ownProps.match.params.nick) {
            userPage = user;
        }
    });

    return {
        userStore: state.user,
        userPage,
        ownProps
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onLogIn: (user) => {
            dispatch({ type: 'LOG_IN', user });
        },
        onSignUp: (user) => {
            dispatch({ type: 'SIGN_UP',  user });
       }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);
