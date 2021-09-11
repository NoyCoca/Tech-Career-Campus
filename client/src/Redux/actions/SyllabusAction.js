import { GET_SYLLABUS } from "./types";


export const getSyllabus = (syllabus) => {
    return {
        type: GET_SYLLABUS,
        payload: syllabus,
    }
}

