import { fetchApi, fetchGet, fetchPost, fetchPut } from '../api/fetchApi';
import { baseUrl } from '../config.json';
export const LOG_IN = 'LOG_IN';
export const SIGN_IN = 'SIGN_IN';
export const GET_USERS = 'GET_USERS';
export const TOOGLE_FOLLOW = 'TOOGLE_FOLLOW';

export const logIn = user => ({
    type: LOG_IN,
    user
});

export const signUp = user => ({
    type: SIGN_IN,
    user
});

export const getUsers = users => ({
    type: GET_USERS,
    users
});

export const toggleFollow = follow => ({
    type: TOOGLE_FOLLOW,
    follow
});

export const onLogIn = user => async dispatch => {
    try {
        const authPayload = {
            email: user.username,
            password: user.password
        };

        const auth = await fetchPost(`${baseUrl}/login`, authPayload);
        const authuser = await fetchGet(`${baseUrl}/api/user/${auth.id}`);

        dispatch(logIn(authuser));
    } catch (error) {
        console.error('Request failed', error);
    }
};

export const onSignUp = user => async dispatch => {
    try {
        const signPayload = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
            link: user.link,
            login: user.login,
            password: user.password
        };
        
        const sign = await fetchPost(`${baseUrl}/api/user`, signPayload);
        const signUser = await fetchGet(`${baseUrl}/api/user/${sign.id}`);

        dispatch(logIn(signUser));
    } catch (error) {
        console.error('Request failed', error);
    }
};

export const loadUsers = (currentUser, page) => async dispatch => {
    try {
        const users = [currentUser.id, ...currentUser.following];        
        const following = await fetchGet(`${baseUrl}/api/user/${currentUser.id}/following`);
        dispatch(getUsers([currentUser, ...following]));
    } catch (error) {
        console.error('Request failed', error);
    }
};

export const clickFollow = follow => async dispatch => {
    try {
        const followResp = await fetchPut(`${baseUrl}/api/user/${follow.id_user}/follow/${follow.id_follow}`);
        dispatch(toggleFollow(follow));
    } catch (error) {
        console.error('Request failed', error);
    }
};
