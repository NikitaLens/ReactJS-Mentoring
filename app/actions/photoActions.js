import { fetchApi, fetchGet, fetchPost, fetchPut } from '../api/fetchApi';
import { baseUrl } from '../config.json';
export const ADD_COMMENT = 'ADD_COMMENT';
export const TOOGLE_LIKE = 'TOOGLE_LIKE';
export const GET_COMMENT = 'GET_COMMENT';
export const PUT_PHOTO = 'PUT_PHOTO';
export const PUT_PHOTO_OWNER = 'PUT_OWNER_PHOTO';
export const UPDATE_PHOTO = 'UPDATE_PHOTO';
export const UPDATE_PHOTO_OWNER = 'UPDATE_PHOTO_OWNER';
export const FETCHING = 'FETCHING';
export const FETCHING_OWNER = 'FETCHING_OWNER';

const fetching = {
    type: FETCHING
};

const fetchingOwner = {
    type: FETCHING_OWNER
};

const putPhoto = photos => ({
    type: PUT_PHOTO,
    photos
});

const putPhotoOwner = photos => ({
    type: PUT_PHOTO_OWNER,
    photos
});

const updatePhotoStoreInfo = update => ({
    type: UPDATE_PHOTO,
    update
});

const updateOwnerPhotoInfo = update => ({
    type: UPDATE_PHOTO_OWNER,
    update
});

export const getComments = comments => ({
    type: GET_COMMENT,
    comments
});

const addComment = comment => ({
    type: ADD_COMMENT,
    comment
});

const toggleLike = like => ({
    type: TOOGLE_LIKE,
    like
});

export const loadPhotos = (currentUser, page) => async dispatch => {
    try {
        dispatch(fetching);
        const users = [currentUser.id, ...currentUser.following];
        const photo = await fetchGet(`${baseUrl}/api/photos?users=${users}&page=${page}`);

        const updPhotos = await Promise.all(photo.photos.map(async photo => {
            const data = await fetchGet(`${baseUrl}/api/photo/${photo.id}/comments/1`);
            photo.comments = data.comments;
            return photo;
        }));
        dispatch(putPhoto(updPhotos));
        dispatch(updatePhotoStoreInfo({ photoPage: ++page, hasNext: photo.hasNext }));
    } catch (error) {
        console.error('Request failed', error);
    }
};

export const loadOwnerPagePhotos = (user, page) => async dispatch => {
    try {
        dispatch(fetchingOwner);
        const userResp = await fetchGet(`${baseUrl}/api/user/${user}`);
        const photo = await fetchGet(`${baseUrl}/api/photos?users=${userResp.id}&page=${1}`);
        const updPhotos = await Promise.all(photo.photos.map(async photo => {
            const data = await fetchGet(`${baseUrl}/api/photo/${photo.id}/comments/1`);
            photo.comments = data.comments;
            return photo;
        }));
        dispatch(putPhotoOwner(updPhotos));
        dispatch(updateOwnerPhotoInfo({ photoPage: ++page, hasNext: photo.hasNext }));
    } catch (error) {
        console.error('Request failed', error);
    }
};

export const putLike = like => async dispatch => {
    try {
        const likeResp = await fetchPut(`${baseUrl}/api/user/${like.id_user}/like/${like.id_photo}`);
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
        const commentResp = await fetchPost(`${baseUrl}/api/photo/${comment.photo_id}/comment`, commentPayload);
        dispatch(addComment(commentResp));
    } catch (error) {
        console.error('Request failed', error);
    }
};
