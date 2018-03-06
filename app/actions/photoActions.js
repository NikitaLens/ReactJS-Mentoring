import { fetchApi, fetchGet, fetchPost, fetchPut } from '../api/fetchApi';
const config = require('../config.json');
export const ADD_COMMENT = 'ADD_COMMENT';
export const TOOGLE_LIKE = 'TOOGLE_LIKE';
export const PUT_PHOTO = 'PUT_PHOTO';
export const GET_COMMENT = 'GET_COMMENT';

export const putPhoto = photos => ({
    type: PUT_PHOTO,
    photos
});

export const getComments = comments => ({
    type: GET_COMMENT,
    comments
});

export const addComment = comment => ({
    type: ADD_COMMENT,
    comment
});

export const toggleLike = like => ({
    type: TOOGLE_LIKE,
    like
});

export const loadPhotos = currentUser => async dispatch => {
    try {
        const users = [currentUser.id, ...currentUser.following];
        const photo = await fetchGet(`${config.baseUrl}/api/photos?users=${users}&page=1`);

        const updPhotos = await Promise.all(photo.photos.map(async photo => {
            const data = await fetchGet(`${config.baseUrl}/api/photo/${photo.id}/comments/1`);
            photo.comments = data.comments;
            return photo;
        }));

        dispatch(putPhoto(updPhotos));
    } catch (error) {
        console.error('Request failed', error);
    }
};

export const putLike = like => async dispatch => {
    try {
        const likeResp = await fetchPut(`${config.baseUrl}/api/user/${like.id_user}/like/${like.id_photo}`);
        dispatch(toggleLike(like));
    } catch (error) {
        console.error('Request failed', error);
    }
};

export const addNewComment = comment => async dispatch => {
    try {
        const commentPayload = {
            "user_id": comment.user_id,
            "text": comment.text
        }
        const commentResp = await fetchPost(`${config.baseUrl}/api/photo/${comment.photo_id}/comment`, commentPayload);
        dispatch(addComment(commentResp));
    } catch (error) {
        console.error('Request failed', error);
    }
};
