import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { addComment, putLike, loadPhotos } from "../../actions/photoActions";
import Post from "../../components/Post";
import { loadUsers } from "../../actions/userActions";

class PostLine extends Component {
    componentDidMount() {
        this.props.dispatch(loadUsers(this.props.currentUser));
        this.props.dispatch(loadPhotos(this.props.currentUser));
    }

    render() {
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
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div >
        );
    }
}

const mapStateToProps = (state) => ({
    photoStore: state.photo,
    currentUser: state.currentUser
});

export default connect(mapStateToProps)(PostLine);
