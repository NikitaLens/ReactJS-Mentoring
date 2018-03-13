import React, { Component } from 'react';
import './styles.scss';

const CommentList = ({ comments }) => (
    <div className="photo-comment">
        {comments.map((comment, index) =>
            <div className="comment" key={index}>
                <b>{comment.user_id.nick}</b>
                <span>&nbsp;{comment.text}</span>
            </div>
        )}
    </div>
);

export default CommentList;
