import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { addComment, putLike } from "../../actions/photoActions";
import CommentsList from '../CommentList';
import CommentInput from '../CommentInput';

class Post extends Component {
    putLike (id_photo) {
        // console.log(this);
        //console.log("value ", this.props.photo);
        //console.log("value ", this.props.props.currentUser.id);
        this.props.onPutLike({ id_user: this.props.currentUser.id, id_photo: id_photo });
    }
    
    render() {
        // console.log(this);
        const { photo } = this.props
        const postUser = this.props.userStore.find(user => user.id === photo.userId);
        const userPostLike = photo.likes.find((like) => {like === this.props.currentUser.id});
        // console.log(userPostLike, ' userPostLike');

        return (
            <div className="photo">
                <Link to={`/${postUser.nick}`}>
                    <div className="photo-autor">
                        <img src={postUser.avatar} alt={photo.alt} />
                        <div className="nick-autor">{postUser.nick}</div>
                    </div>
                </Link>
                <img src={photo.src} alt={photo.alt} />
                <div className="photo-like">
                    <div onClick={ () => this.putLike(photo.id) }>
                        <i className={`${userPostLike ? 'fas' : 'far'} fa-heart`}/>
                    </div>
                    <div className="like-count">
                        <b>{photo.likes.length}</b>
                        <span>&nbsp;likes</span>
                    </div>
                </div>
                <CommentsList comment={photo.comment} />
                <CommentInput photo={photo} {...this.props}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let currentUser;
    state.user.map((user, index) => {
        if (user.nick === state.currentUser) currentUser = user;
    });

    return {
        photoStore: state.photo,
        userStore: state.user,
        currentUser: currentUser
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAddComment: (comment) => {
            dispatch(addComment(comment));
        },
        onPutLike: (like) => {
            dispatch(putLike(like));
       }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post);
