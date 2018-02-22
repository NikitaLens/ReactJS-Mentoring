import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
    render () {        
        return (
            <div className="header">
                <div className="header-wrapper">
                    <div className="header-content">
                        <div className="logo">
                            <a href="/"><i className="fab fa-instagram" /></a> 
                            <Link to='/'>Instagram</Link>
                        </div>
                        <input className="" type="text" placeholder="Search"></input>                            
                        <nav>
                            <a href="#1"><i className="far fa-compass" /></a>
                            <a href="#2"><i className="far fa-heart" /></a>
                            <Link to={'/' + this.props.currentUser.nick}>
                                <i className="far fa-user"/>
						    </Link>
                        </nav>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let currentUser;
    state.user.map((user, index) => {      
        if (user.nick === state.currentUser) {
            currentUser = user;    
        }
    });

    return {
        photoStore: state.photo,
        userStore: state.user,
        currentUser: currentUser
    };
}


export default connect(
    mapStateToProps
)(Header);
