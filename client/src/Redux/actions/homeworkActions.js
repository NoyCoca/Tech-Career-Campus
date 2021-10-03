import fetcher from "../../utils/fetcher"
import { CREATE_HOMEWORK, DELETE_HOMEWORK, EDIT_HOMEWORK, GET_HOMEWORK } from "./types"

export const getHomework = (id) => async dispatch => {
    await fetcher(`/api/homework/${id}`)
        .then(response => dispatch({
            type: GET_HOMEWORK,
            payload: response.data
        }))
        .catch(error => console.log(error.message))
}

export const createHomework = (newHomework) => async dispatch => {
    await fetcher(`/api/homework/`, {
        method: 'POST',
        body: JSON.stringify(newHomework)
    })
        .then(response => dispatch({
            type: CREATE_HOMEWORK,
            payload: response.data
        }))
        .catch(error => console.log(error))
}
export const deleteHomework = (id) => async dispatch => {
    await fetcher(`/api/homework/${id}`, {
        method: 'DELETE',
    })
        .then(response => dispatch({
            type: DELETE_HOMEWORK,
            payload: response.data._id
        }))
        .catch(error => console.log(error))
}

export const editHomework = (updateHomework) => async dispatch => {
    await fetcher(`/api/homework/${updateHomework._id}`, {
        method: 'PUT',
        body: JSON.stringify(updateHomework)
    })
        .then(response => dispatch({
            type: EDIT_HOMEWORK,
            payload: response.data
        }))
        .catch(error => console.log(error))
}

