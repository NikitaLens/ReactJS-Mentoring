import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { clickFollow } from "../../actions/userActions";

class UserPage extends Component {
    settings = () => {
        console.log('Settings');
    }

    onFollow = () => {
        this.props.dispatch(clickFollow({ id_user: this.props.currentUser.id, id_follow: this.props.ownerUserPage.id }));
    }
    
    render() {
        const ownerButton = () => (
            <button onClick={this.settings}>Settings</button>
        );
    
        const guestButton = () => (
            (this.props.ownerUserPage.followers.find(follower => follower === this.props.currentUser.id))
                ? <button onClick={this.onFollow}>Follow</button>
                : <button onClick={this.onFollow}>Following</button>
        );

        return (
            <div>
                <Header />
                <div className="main">
                    <div className="main-wrapper">
                        <div className="main-content">
                            <div className="profile">
                                <div className="photo">
                                    <img src={this.props.ownerUserPage.avatar} alt="avatar" />
                                </div>
                                <div className="info">
                                    <div className="info-nick">
                                        {this.props.ownerUserPage.nick}
                                        {(this.props.currentUser.nick === this.props.ownerUserPage.nick) ? ownerButton() : guestButton()}
                                    </div>
                                    <div className="info-count">
                                        <div className="post-count"><b>{this.props.currentPhoto.length}</b>&nbsp;posts</div>
                                        <div className="followers-count"><b>{this.props.ownerUserPage.followers.length}</b>&nbsp;followers</div>
                                        <div className="follow-count"><b>{this.props.ownerUserPage.following.length}</b>&nbsp;following</div>
                                    </div>
                                    <div className="info-fullname">{this.props.ownerUserPage.firstName + ' ' + this.props.ownerUserPage.lastName}</div>
                                </div>
                            </div>
                            <div className="photo-album">
                                {this.props.currentPhoto.map((photo, index) =>
                                    <div className="photo" key={index}>
                                        <img src={photo.src} alt={photo.id} />
                                    </div>
                                )}
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
    let ownerUserPage;
    state.user.find((user) => {
        if (user.nick === ownProps.match.params.nick) {
            ownerUserPage = user;
        }
    });

    const currentPhoto = [];
    state.photo.map((photo) => {
        if (photo.userId === ownerUserPage.id) {
            currentPhoto.push(photo);
        }
    });

    return {
        photoStore: state.photo,
        userStore: state.user,
        currentUser: state.currentUser,
        ownerUserPage,
        currentPhoto,
        ownProps
    };
}

export default connect(mapStateToProps)(UserPage);
