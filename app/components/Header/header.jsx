import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './styles.scss';
import debounce from "lodash/debounce";
import { loadUsersSearch } from "../../actions/userActions";

class Header extends Component {
    callbackSearch = (event) => {
        const searchElement = document.getElementById('search');
        this.props.dispatch(loadUsersSearch(searchElement.value));
    };

    search = debounce(this.callbackSearch, 500);

    showSearchList = () => {
        const searchList = document.getElementById('searchList');
        searchList.style.display = 'block';
    };

    // hideSearchList = (event) => {
    //     const searchList = document.getElementById('searchList');
    //     console.log('event', event);
    //     searchList.style.display = 'none';
    // };

    hideSearchList = (event) => {
        const searchList = document.getElementById('searchList');
        const searchElement = document.getElementById('search');
        if (event.target !== searchElement && event.target !== searchList) {
            searchList.style.display = 'none';
        }
    };
    
    componentDidMount() {
        const searchElement = document.getElementById('search');
        if (searchElement) {
            searchElement.addEventListener('keyup', this.search);
            searchElement.addEventListener('focus', this.showSearchList);
            window.addEventListener('click', this.hideSearchList);
            this.props.dispatch(loadUsersSearch(searchElement.value));
        }
    }

    componentWillUnmount() {
        const searchElement = document.getElementById('search');
        if (searchElement) {
            searchElement.removeEventListener('keyup', this.search);
            searchElement.removeEventListener('focus', this.showSearchList);
            window.removeEventListener('click', this.hideSearchList);
        }
    }

    render() {
        const searchNavPanel = () => (
            <Fragment>
                <input id="search" className="" type="text" placeholder="Search"></input>
                <ul id="searchList" className="searchList">
                    {this.props.searchUser.map((user, index) =>
                        <li key={index}><Link to={`/${user.nick}`}>{user.nick}</Link></li>
                    )}
                </ul>
                <nav>
                    <a href="#1"><i className="far fa-compass" /></a>
                    <a href="#2"><i className="far fa-heart" /></a>
                    <Link to={`/${this.props.currentUser.nick}`}>
                        <i className="far fa-user" />
                    </Link>
                </nav>
            </Fragment>
        );
        return (
            <div className="header">
                <div className="header-wrapper">
                    <div className="header-content">
                        <div className="logo">
                            <a href="/"><i className="fab fa-instagram" /></a>
                            <Link to='/'>Instagram</Link>
                        </div>
                        {this.props.currentUser && searchNavPanel()}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        searchUser: state.searchUser
    };
}

export default connect(mapStateToProps)(Header);
