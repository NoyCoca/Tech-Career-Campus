import fetcher from "../../utils/fetcher"
import { CREATE_COURSE, CREATE_COURSE_ERRORS, GET_COURSES } from "./types"

export const getCourses = () => async dispatch => {
    await fetcher('/api/course')

    .then(response=> dispatch({
        type: GET_COURSES,
        payload:response.data
    }))
    .catch(error =>console.log(error))
}

export const createCourse = (newCorse) => async dispatch => {
    try {
        await fetcher(`/api/course/addNewCourse`, {
            method: 'POST',
            body: JSON.stringify(newCorse)
        })
            .then(response => {
                if (!response || !response.data) throw response
                return response
            })
            .then(response => dispatch({
                type: CREATE_COURSE,
                payload: response.data
            }))
    }
    catch (error) {
        dispatch({
            type: CREATE_COURSE_ERRORS,
            payload: error.error || error
        })
    }

}
