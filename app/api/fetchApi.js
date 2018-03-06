export const fetchApi = (url, config) => {
    const _config = {
        headers: {
            "Content-type": "application/json"
        },
        ...config
    };

    return fetch(url, _config).then((response) => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    });
}

export const fetchGet = (url) => {
    return fetchApi(url, { method: 'get' });
}

export const fetchPost = (url, body) => {
    return fetchApi(url, {
        method: 'post',
        body: JSON.stringify(body)
    });
}

export const fetchPut = (url) => {
    const _config = {
        headers: {
            "Content-type": "application/json"
        },
        method: 'put'
    };
    return fetch(url, _config).then((response) => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.ok;
    });
}
