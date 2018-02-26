export const ADD_COMMENT = 'ADD_COMMENT';
export const PUT_LIKE = 'PUT_LIKE';

export const addComment = (comment) => ({
    type: ADD_COMMENT,
    comment
});

export const putLike = (like) => ({
    type: PUT_LIKE,
    like
});
