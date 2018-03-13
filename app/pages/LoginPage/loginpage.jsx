import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import InputForm from '../../components/InputForm';
import { onLogIn, onSignUp } from "../../actions/userActions";

class LoginPage extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.isLogedIn) {
            this.props.history.replace('/');
        }
    }

    logIn = (event) => {
        event.preventDefault();
        const user = {
            username: 'nikita.lensckij@yandex.ru',
            password: '1234'
        };
        this.props.dispatch(onLogIn(user));
        // this.props.dispatch(onLogIn({
        //     username: this.logUsername.value,
        //     password: this.logPassword.value
        // }));
    }

    signUp = (event) => {
        event.preventDefault();
        const user = {
            email: "example@gmail.com",
            firstName: "Barry",
            lastName: "Allen",
            avatar: "",
            link: "",
            login: "ballen",
            password: "qwerty"
        };
        this.props.dispatch(onSignUp(user));
        // this.props.dispatch(onSignUp({
        //     email: this.signEmail.value,
        //     firstName:  this.signFirstName.value,
        //     lastName: this.signLastName.value,
        //     avatar: '',
        //     link: '',
        //     login: this.signUsername.value,
        //     password: this.signPassword.value
        // }));
    }

    render() {
        return (
            <div>
                <Header />
                <div className="main">
                    <div className="main-wrapper">
                        <div className="main-content">
                            <div className="log-or-sing">
                                <div className="welcome">Welcome to Instagram</div>
                                <div className="auth-description">Authorization</div>
                                <form onSubmit={this.logIn} className="log-in">
                                    <InputForm name={'Username'} inputRef={input => this.logUsername = input} />
                                    <InputForm name={'Password'} inputRef={input => this.logPassword = input} />
                                    <button>Log In</button>
                                </form>
                                <div className="auth-description">Registration</div>
                                <form onSubmit={this.signUp} className="sing-up">
                                    <InputForm name={'Email'} inputRef={input => this.signEmail = input} />
                                    <InputForm name={'First Name'} inputRef={input => this.signFirstName = input} />
                                    <InputForm name={'Last Name'} inputRef={input => this.signLastName = input} />
                                    <InputForm name={'Username'} inputRef={input => this.signUsername = input} />
                                    <InputForm name={'Password'} inputRef={input => this.signPassword = input} />
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

const mapStateToProps = state => ({
    isLogedIn: !!state.currentUser,
});

export default connect(mapStateToProps)(LoginPage);
