import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { addComment, putLike } from "../../actions/photoActions";

class Comment extends Component {
    addComment() {
        this.props.props.onAddComment( { id_photo: this.props.photo.id, new_comment: { id_user: this.props.props.currentUser.id, text: this.commentInput.value } } );
        this.commentInput.value = '';
    }
    
    render() {
        return (
            <div className="input-comment">
                <input className="add-comment"
                    type="text"
                    ref={(input) => this.commentInput = input}
                    placeholder="Input you comment..."
                />
                <div className="add-button" onClick={this.addComment.bind(this)}>
                    <i className="fas fa-angle-double-right" />
                </div>
            </div>
        );
    }
}

class PostLine extends Component {
    putLike (id_photo) {
        // console.log(this);
        //console.log("value ", this.props.photo);
        //console.log("value ", this.props.props.currentUser.id);
        this.props.onPutLike({ id_user: this.props.currentUser.id, id_photo: id_photo });
    }
    
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
                                    <div className="photo" key={index}>
                                        <Link to={(this.props.userStore.find((user, index) => {
                                                if (user.id === photo.userId) return '/' + user.nick;
                                            })).nick}>
                                            <div className="photo-autor">
                                                <img src={this.props.userStore.find((user, index) => {
                                                    if (user.id === photo.userId) {
                                                        return user.avatar;
                                                    }
                                                }).avatar} alt={photo.alt} />
                                                <div className="nick-autor">{(this.props.userStore.find((user, index) => {
                                                    if (user.id === photo.userId) return user.nick;
                                                })).nick}</div>
                                            </div>
                                        </Link>
                                        <img src={photo.src} alt={photo.alt} />
                                        <div className="photo-like">
                                            {(() => {
                                                if ( photo.likes.find((like) => {if (like === this.props.currentUser.id ) { return true } else return false})) {
                                                    return <div onClick={this.putLike.bind(this, photo.id)}><i className="fas fa-heart"/></div>;
                                                } else return <div onClick={this.putLike.bind(this, photo.id)}><i className="far fa-heart"/></div>;
                                            })()}
                                            <div className="like-count"><b>{photo.likes.length}</b>&nbsp;likes</div>
                                        </div>
                                        <div className="photo-comment">
                                            {photo.comment.map((comment, index) =>
                                                <div className="comment" key={index}><b>{
                                                    (this.props.userStore.find((user, index) => {
                                                        if (user.id === comment.id_user) {
                                                            return user.nick;
                                                        }
                                                    })).nick
                                                }</b>&nbsp;{comment.text}</div>
                                            )}
                                        </div>
                                        <Comment photo={photo} props = {this.props}/>
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
)(PostLine);
