import {getAccessJwt} from "utils/jwt";

const baseApiUrl = 'http://localhost:8000/api'

const processGetParams = (params) => {
    return Object
        .keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&')
    ;
};

export const fetchAllBase = (urlPostfix, params) => {
    params = params || {};
    const url = baseApiUrl + urlPostfix + "?" + processGetParams(params);
    return fetch(
        url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + getAccessJwt()
            }
        })
        .then(res => res.json())
    ;
};
