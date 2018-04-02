import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { addComment, putLike } from "../../actions/photoActions";
import CommentsList from '../CommentList';
import CommentInput from '../CommentInput';
import './styles.scss';

class Post extends Component {
    clickLike(id_photo) {
        this.props.dispatch(putLike({ id_user: this.props.currentUser.id, id_photo: id_photo }));
    }

    render() {
        const { photo } = this.props;
        const userPostLike = photo.likes.find(like => like === this.props.currentUser.id);

        return (
            <div className="photo">
                <Link to={`/${photo.user_id.nick}`}>
                    <div className="photo-autor">
                        <img src={photo.user_id.avatar} alt={photo.alt} />
                        <div className="nick-autor">{photo.user_id.nick}</div>
                    </div>
                </Link>
                <img src={photo.src} alt={photo.alt} />
                <div className="photo-like">
                    <div onClick={() => this.clickLike(photo.id)}>
                        {userPostLike && <div>
                            <span className="fas fa-heart" />
                        </div>}
                        {!userPostLike && <div>
                            <span className="far fa-heart" />
                        </div>}
                    </div>
                    <div className="like-count">
                        <b>{photo.likes.length}</b>
                        <span>&nbsp;likes</span>
                    </div>
                </div>
                <CommentsList comments={photo.comments} />
                <CommentInput photo={photo} {...this.props} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    };
}

export default connect(mapStateToProps)(Post);
