import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { clickFollow, loadUser } from "../../actions/userActions";
import { loadOwnerPagePhotos } from "../../actions/photoActions";

class FollowSettingButton extends Component {
    // settings = () => {
    //     // console.log('Settings');
    // }

    // onFollow = () => {
    //     this.props.dispatch(clickFollow({ id_user: this.props.currentUser.id, id_follow: this.props.ownerUserPage.id }));
    // }

    // render() {
    //     const { ownerUser, currentUser } = this.props;
    //     const isFollow = ownerUser.followers.find(follower => follower === currentUser.id);

    //     const ownerButton = () => (
    //         <button onClick={this.settings}>Settings</button>
    //     );

    //     const guestButton = () => (
    //         (isFollow)
    //             ? <button onClick={this.onFollow}>Following</button>
    //             : <button onClick={this.onFollow}>Follow</button>
    //     );

    //     return (
    //         (currentUser.nick === ownerUser.nick) ? ownerButton() : guestButton()
    //     )
    // }
}

class UserPage extends Component {
    componentDidMount() {
        this.props.dispatch(loadUser(this.props.ownProps.match.params.nick));
        this.props.dispatch(loadOwnerPagePhotos(this.props.ownProps.match.params.nick));
    }

    render() {
        // console.log('this', this);
        const { ownerUser, ownerUserPhoto } = this.props;
        // console.log('ownerUser', ownerUser);

        // console.log('ownerUser.followers', ownerUser.followers.length);
        return (
            <div>
                <Header />
                <div className="main">
                    <div className="main-wrapper">
                        <div className="main-content">
                            <div className="profile">
                                <div className="photo">
                                    <img src={ownerUser.avatar} alt="avatar" />
                                </div>
                                <div className="info">
                                    <div className="info-nick">
                                        {ownerUser.nick}
                                        {/* <FollowSettingButton {...this.props} /> */}
                                    </div>
                                    <div className="info-count">
                                        <div className="post-count"><b>{ownerUserPhoto.length}</b>&nbsp;posts</div>
                                        {/* <div className="followers-count"><b>{ownerUser.followers.length}</b>&nbsp;followers</div> */}
                                        {/* <div className="follow-count"><b>{ownerUser.following.length}</b>&nbsp;following</div> */}
                                    </div>
                                    <div className="info-fullname">{ownerUser.firstName + ' ' + ownerUser.lastName}</div>
                                </div>
                            </div>
                            <div className="photo-album">
                                {ownerUserPhoto.map((photo, index) =>
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
    return {
        currentUser: state.currentUser,
        ownerUser: state.ownerUser,
        ownerUserPhoto: state.ownerUserPhoto,
        ownProps
    };
}

export default connect(mapStateToProps)(UserPage);
