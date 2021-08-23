import cookie from "js-cookie";

const accessTokenLifetime = 1;
const refreshTokenLifetime = 2;
const jwtAccessCookieName = 'jwt_access_token';
const jwtRefreshCookieName = 'jwt_refresh_token';

export const setJwtTokens = (jwtAccess, jwtRefresh) => {
    cookie.remove(jwtAccessCookieName);
    cookie.remove(jwtRefreshCookieName);

    cookie.set(jwtAccessCookieName, jwtAccess, {expires: accessTokenLifetime});
    cookie.set(jwtRefreshCookieName, jwtRefresh, {expires: refreshTokenLifetime});
};

export const getAccessJwt = () => {
    return cookie.get(jwtAccessCookieName);
};

export const getRefreshJwt = () => {
    return cookie.get(jwtRefreshCookieName);
};
