export const ADD_COMMENT = 'ADD_COMMENT';
export const TOOGLE_LIKE = 'TOOGLE_LIKE';
export const PUT_PHOTO = 'PUT_PHOTO';
export const GET_COMMENT = 'GET_COMMENT';

export const getComments = (comments) => ({
    type: GET_COMMENT,
    comments
});

export const addComment = (comment) => ({
    type: ADD_COMMENT,
    comment
});

export const toggleLike = (like) => ({
    type: TOOGLE_LIKE,
    like
});

export const putPhoto = (photos) => ({
    type: PUT_PHOTO,
    photos
});

const fetchApi = (url, config) => {
    const _config = {
        headers: {
            "Content-type": "application/json"
        },
        ...config
    };

    return fetch(url, _config)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }            
            return response.json();
        });
}

const fetchPost = (url, body) => {
    return fetchApi(url, {
        method: 'post',
        body: JSON.stringify(body)
    });
}

const fetchGet = (url) => {
    return fetchApi(url, { method: 'get' });
}

const fetchPut = (url) => {
    const _config = {
        headers: {
            "Content-type": "application/json"
        },
        method: 'put'
    };
    return fetch(url, _config)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }            
            return response.ok;
        });
}

export const _loadPhotos = (currentUser) => dispatch => {
    let next = true;
    const users = [currentUser.id, ...currentUser.following ];
    let page = 1;

    fetchApi(`http://epbygomw0290.gomel.epam.com:8081/api/photos?users=${users}&page=${page}`, {
        method: 'get'
    }).then(photo => {
        // console.log('photo', photo);
        if (photo.hasNext) {
            page++
        } else next = false;

        const newPhotos = photo.photos.map(async photo => {            
            const data = await  fetchApi(`http://epbygomw0290.gomel.epam.com:8081/api/photo/${photo.id}/comments/${page}`, {
                method: 'get',
            });

            photo.comments = data.comments;
            return photo;
        });

        dispatch(putPhoto(photo.photos));
    }).catch(function (error) {
        console.error('Request failed', error);
    });  
};


export const loadPhotos = (currentUser) => async dispatch => {
    try {
        const users = [currentUser.id, ...currentUser.following ];
        const photo = await fetchGet(`http://epbygomw0290.gomel.epam.com:8081/api/photos?users=${users}&page=1`);

        const newPhotos = await Promise.all(photo.photos.map(async photo => {            
            const data = await fetchApi(`http://epbygomw0290.gomel.epam.com:8081/api/photo/${photo.id}/comments/1`, {
                method: 'get',
            });
            photo.comments = data.comments;
            return photo;
        }));

        dispatch(putPhoto(newPhotos));
    } catch (error) {
        console.error('Request failed', error);
    }
};


export const putLike = (like) => async dispatch => {
    try {
        // console.log('like', like);
        const likeResp = await fetchPut(`http://epbygomw0290.gomel.epam.com:8081/api/user/${like.id_user}/like/${like.id_photo}`);
        dispatch(toggleLike(like));
    } catch (error) {
        console.error('Request failed', error);
    }
};


export const addNewComment = (comment) => async dispatch => {
    try {
        const commentPayload = {
            "user_id": comment.user_id,
            "text": comment.text
        }
        const addCommentResp = await fetchPost(`http://epbygomw0290.gomel.epam.com:8081/api/photo/${comment.photo_id}/comment`, commentPayload);
        dispatch(addComment(addCommentResp));
    } catch (error) {
        console.error('Request failed', error);
    }
};

