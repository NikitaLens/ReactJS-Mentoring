import React, { Component } from 'react';
import { addNewComment } from "../../actions/photoActions";
import './styles.scss';

class CommentInput extends Component {
    onAddComment = () => {
        const comment = {
            photo_id: this.props.photo.id,
            user_id: this.props.currentUser.id,
            text: this.commentInput.value
        }
        this.props.dispatch(addNewComment(comment));
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
                <div className="add-button" onClick={this.onAddComment}>
                    <i className="fas fa-angle-double-right" />
                </div>
            </div>
        );
    }
}

export default CommentInput;
