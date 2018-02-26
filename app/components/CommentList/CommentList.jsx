import React, { Component } from 'react';

const CommentList = ({ comment }) => (
    <div className="photo-comment">
        {comment.map((comment, index) =>
            <div className="comment" key={index}>
                <b>{comment.user_nick}</b>
                <span>&nbsp;{comment.text}</span>
            </div>
        )}
    </div>
);

export default CommentList;
