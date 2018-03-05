import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './styles.scss';

class Header extends Component {
    render() {
        const searchNavPanel = () => (
            <Fragment>
                <input className="" type="text" placeholder="Search"></input>
                <nav>
                    <a href="#1"><i className="far fa-compass"/></a>
                    <a href="#2"><i className="far fa-heart"/></a>
                    <Link to={`/${this.props.currentUser.nick}`}>
                        <i className="far fa-user"/>
                    </Link>
                </nav>
            </Fragment>
        );
        return (
            <div className="header">
                <div className="header-wrapper">
                    <div className="header-content">
                        <div className="logo">
                            <a href="/"><i className="fab fa-instagram"/></a>
                            <Link to='/'>Instagram</Link>
                        </div>
                        {this.props.currentUser && searchNavPanel()}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    };
}

export default connect(
    mapStateToProps
)(Header);
