import React, { Component } from 'react';

class CommentInput extends Component {
    addComment = () => {
        const comment = {
            id_photo: this.props.photo.id,
            new_comment: {
                user_id: this.props.currentUser.id,
                user_nick: this.props.currentUser.nick,
                text: this.commentInput.value
            }
        }
        this.props.onAddComment(comment);
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
                <div className="add-button" onClick={this.addComment}>
                    <i className="fas fa-angle-double-right" />
                </div>
            </div>
        );
    }
}

export default CommentInput;
