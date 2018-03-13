import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Loader from '../../components/Loader';
import { addComment, putLike, loadPhotos } from "../../actions/photoActions";
import Post from "../../components/Post";
import { loadUsers } from "../../actions/userActions";
import throttle from "lodash/throttle";

class PostLine extends Component {
    callbackScroll = (event) => {
        const { dispatch, currentUser, photoStoreInfo } = this.props;

        const hasNext = photoStoreInfo.hasNext;
        const clientHeight = document.documentElement.clientHeight;
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;

        if (hasNext && scrollTop !== 0 && scrollHeight - clientHeight - scrollTop < 100) {
            dispatch(loadPhotos(currentUser, photoStoreInfo.photoPage));
        }
    };

    update = throttle(this.callbackScroll, 1000, { leading: true, trailing: true });

    componentDidMount() {
        this.props.dispatch(loadUsers(this.props.currentUser));
        this.props.dispatch(loadPhotos(this.props.currentUser, this.props.photoStoreInfo.photoPage));
        window.addEventListener('scroll', this.update);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.update);
    }

    render() {
        const { photoStoreInfo } = this.props;
        if (photoStoreInfo.photoPage === 1 && photoStoreInfo.fetching) {
            return <Loader />
        }
        return (
            <div>
                <Header />
                <div className="main">
                    <div className="main-wrapper">
                        <div className="main-content">
                            <div className="photo-album-line">
                                {this.props.photoStore.map((photo, index) =>
                                    <Post photo={photo} key={index} />
                                )}
                                {photoStoreInfo.photoPage !== 1
                                    && photoStoreInfo.fetching
                                    && <Loader />
                                }
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
    currentUser: state.currentUser,
    photoStore: state.photo,
    photoStoreInfo: state.photoStoreInfo
});

export default connect(mapStateToProps)(PostLine);
