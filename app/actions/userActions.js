export const LOG_IN = 'LOG_IN';
export const SIGN_IN = 'SIGN_IN';
export const GET_USERS = 'GET_USERS';
export const TOOGLE_FOLLOW = 'TOOGLE_FOLLOW';

export const logIn = (user) => ({
    type: LOG_IN,
    user
});

export const signUp = (user) => ({
    type: SIGN_IN,
    user
});

export const getUsers = (users) => ({
    type: GET_USERS,
    users
});

export const toggleFollow = (follow) => ({
    type: TOOGLE_FOLLOW,
    follow
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

export const onLogIn = (user) => dispatch => {
    fetchApi('http://epbygomw0290.gomel.epam.com:8081/login', {
        method: 'post',
        body: JSON.stringify({
            "email": user.username,
            "password": user.password
        })
    }).then(auth => {
        return fetchApi(`http://epbygomw0290.gomel.epam.com:8081/api/user/${auth.id}`, {
            method: 'get',
        }).then(user => {    
            dispatch(logIn(user));
        });
    }).catch(function (error) {  
        console.log('Request failed', error);
    });
};

export const _onLogIn = (user) => async dispatch => {
    try {
        const authPayload = {
            email: user.username,
            password: user.password
        };

        const auth = await fetchPost('http://epbygomw0290.gomel.epam.com:8081/login', authPayload);
        const authuser = await fetchGet(`http://epbygomw0290.gomel.epam.com:8081/api/user/${auth.id}`);

        dispatch(logIn(authuser));
    } catch (error) {
        console.log('Request failed', error);
    }
};

export const onSignUp = (user) => dispatch => {
    // console.log('user', user);
    fetchApi('http://epbygomw0290.gomel.epam.com:8081/api/user', {
        method: 'post',
        body: JSON.stringify({
            "email": user.email,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "avatar": user.avatar,
            "link": user.link,
            "login": user.login,
            "password": user.password
        })
    }).then(auth => {
        // console.log('auth', auth);
        return fetchApi(`http://epbygomw0290.gomel.epam.com:8081/api/user/${auth.id}`, {
            method: 'get',
        }).then(user => {    
            dispatch(logIn(user))
        });
    }).catch(function (error) {  
        console.log('Request failed', error);  
    });
};

export const loadUsers = (currentUser) => dispatch => {
    const users = [currentUser.id, ...currentUser.following ];

    fetchApi(`http://epbygomw0290.gomel.epam.com:8081/api/user/${currentUser.id}/following`, {
        method: 'get'
    }).then(following => {
        dispatch(getUsers([currentUser, ...following]));
    }).catch(function (error) {  
        console.log('Request failed', error);
    });  
};

export const clickFollow = (follow) => async dispatch => {
    try {
        // console.log('follow', follow);
        const likeResp = await fetchPut(`http://epbygomw0290.gomel.epam.com:8081/api/user/${follow.id_user}/follow/${follow.id_follow}`);
        dispatch(toggleFollow(follow));
    } catch (error) {
        console.error('Request failed', error);
    }
};
