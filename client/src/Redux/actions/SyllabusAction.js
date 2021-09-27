import { GET_SYLLABUS, UPDATE_SYLLABUS, UPDATE_SUB_SUBJECT } from "./types";
import fetcher from "../../utils/fetcher"

export const getSyllabus = (course) => async dispatch => {
    return dispatch({
        type: GET_SYLLABUS,
        payload: course,
    })
}

export const updateSyllabus = (newSyllabus, e) => async dispatch => {
    e.preventDefault()
    await fetcher("/api/course/updateSubject", {
        method: 'PUT',
        headers: {
            "Accept": "apllication/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            course_id: newSyllabus._id,
            Subject_id: newSyllabus.SubjectId,
            field: newSyllabus.name,
            newValue: newSyllabus.value
        })
    })
        .then(response => dispatch({
            type: UPDATE_SYLLABUS,
            payload: response.data
        }))
        .catch(error => console.log(error))
}
export const updateSubSubject = (newSyllabus) => async dispatch => {
    await fetcher("http://localhost:8080/api/course/updateSubSubject", {
        method: 'PUT',
        headers: {
            "Accept": "apllication/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            course_id: newSyllabus._id,
            courseInformationId: newSyllabus.courseInformationId,
            array: newSyllabus.array,
            array_id: newSyllabus.array_id,
            arrayField: newSyllabus.arrayField,
            newValue: newSyllabus.newValue
        })
    })
        .then(response => dispatch({
            type: UPDATE_SUB_SUBJECT,
            payload: response.data
        }))
        .catch(error => console.log(error))
}