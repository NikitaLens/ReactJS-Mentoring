import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { clickFollow } from "../../actions/userActions";

class FollowSettingButton extends Component {
    settings = () => {
        console.log('Settings');
    }

    onFollow = () => {
        this.props.dispatch(clickFollow({ id_user: this.props.currentUser.id, id_follow: this.props.ownerUserPage.id }));
    }

    render() {
        const { ownerUserPage, currentUser } = this.props;
        const isFollow = ownerUserPage.followers.find(follower => follower === currentUser.id);

        const ownerButton = () => (
            <button onClick={this.settings}>Settings</button>
        );

        const guestButton = () => (
            (isFollow)
                ? <button onClick={this.onFollow}>Following</button>
                : <button onClick={this.onFollow}>Follow</button>
        );

        return (
            (currentUser.nick === ownerUserPage.nick) ? ownerButton() : guestButton()
        )
    }
}

class UserPage extends Component {
    render() {
        const { ownerUserPage, currentPhoto } = this.props;
        return (
            <div>
                <Header />
                <div className="main">
                    <div className="main-wrapper">
                        <div className="main-content">
                            <div className="profile">
                                <div className="photo">
                                    <img src={ownerUserPage.avatar} alt="avatar" />
                                </div>
                                <div className="info">
                                    <div className="info-nick">
                                        {ownerUserPage.nick}
                                        <FollowSettingButton {...this.props} />
                                    </div>
                                    <div className="info-count">
                                        <div className="post-count"><b>{currentPhoto.length}</b>&nbsp;posts</div>
                                        <div className="followers-count"><b>{ownerUserPage.followers.length}</b>&nbsp;followers</div>
                                        <div className="follow-count"><b>{ownerUserPage.following.length}</b>&nbsp;following</div>
                                    </div>
                                    <div className="info-fullname">{ownerUserPage.firstName + ' ' + ownerUserPage.lastName}</div>
                                </div>
                            </div>
                            <div className="photo-album">
                                {currentPhoto.map((photo, index) =>
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
        photo.userId === ownerUserPage.id && currentPhoto.push(photo);
    });

    return {
        currentUser: state.currentUser,
        userStore: state.user,
        photoStore: state.photo,
        ownerUserPage,
        currentPhoto,
        ownProps
    };
}

export default connect(mapStateToProps)(UserPage);
