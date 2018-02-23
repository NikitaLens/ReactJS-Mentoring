import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

class UserPage extends Component {
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
                            <div className="profile">
                                <div className="photo">
                                    <img src={this.props.userPage.avatar} alt="nikitalens" />
                                </div>
                                <div className="info">
                                    <div className="info-nick">{this.props.userPage.nick}</div>
                                    <div className="info-count">
                                        <div className="post-count"><b>{this.props.userPage.photos.length}</b>&nbsp;posts</div>
                                        <div className="followers-count"><b>{this.props.userPage.followers.length}</b>&nbsp;followers</div>
                                        <div className="follow-count"><b>{this.props.userPage.following.length}</b>&nbsp;following</div>
                                    </div>
                                    <div className="info-fullname">{this.props.userPage.fullname}</div>
                                </div>
                            </div>
                            <div className="photo-album">
                                {this.props.currentPhoto.map((photo, index) =>
                                    <div className="photo" key={index}>
                                        <img src={photo.src} alt={photo.alt} />
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
    let userPage;
    state.user.find((user) => {
        if (user.nick === ownProps.match.params.nick) {
            userPage = user;
        }
    });

    const currentPhoto = [];
    state.photo.map((photo) => {
        if (photo.userId === userPage.id) {
            currentPhoto.push(photo);
        }
    });

    return {
        photoStore: state.photo,
        userStore: state.user,
        userPage,
        currentPhoto,
        ownProps
    };
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserPage);
