import {fetchAllBase} from "./BaseAPI";

const usersUrlPostfix = "/users/";

export const fetchAllUsers = (params) => {
    return fetchAllBase(usersUrlPostfix, params)
    ;
};

export const loginUserFetch = (url, user) => {
    return fetch(
        url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(res.status ? 'некорректные данные' : 'неизвестная ошибка');
            }
            return res.json()
        })
        .then(data => {
            const {refresh, access} = data;
            if (refresh && access) {
                return {refresh, access}
            }
            throw new Error('некорректные данные');
        })
    ;
};
