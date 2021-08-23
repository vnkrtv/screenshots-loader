import {fetchAllBase} from "./BaseAPI";

const screenshotsUrlPostfix = "/screenshots/";

export const fetchAllScreenshots = (params) => {
    return fetchAllBase(screenshotsUrlPostfix, params);
};