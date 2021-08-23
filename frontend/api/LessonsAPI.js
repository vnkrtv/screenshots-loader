import {fetchAllBase} from "./BaseAPI";

const lessonUrlPostfix = "/lessons/";

export const fetchAllLessons = (params) => {
    return fetchAllBase(lessonUrlPostfix, params);
};
