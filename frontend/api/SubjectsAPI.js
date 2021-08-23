import {fetchAllBase} from "./BaseAPI";

const subjectsUrlPostfix = "/subjects/";

export const fetchAllSubjects = (params) => {
    return fetchAllBase(subjectsUrlPostfix, params);
};
