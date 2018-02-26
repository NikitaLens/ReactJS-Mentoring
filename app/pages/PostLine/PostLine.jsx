import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { addComment, putLike } from "../../actions/photoActions";
import Post from "../../components/Post";

class PostLine extends Component {
    render() {
        // console.log(this.props.currentUser);
        // this.props.userStore.map((user, index) => {
        //     console.log(user);
        // } );
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

const mapStateToProps = (state) => {
    return {
        photoStore: state.photo,
    };
};

export default connect(mapStateToProps)(PostLine);
