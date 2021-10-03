import fetcher from '../../utils/fetcher';
import { CREATE_STUDENT, CREATE_STUDENT_ERRORS, DELETE_STUDENT, GET_STUDENTS, UPDATE_STUDENT } from './types'

export const getStudents = (courseId) => async dispatch => {
    await fetcher(`/api/course/students/${courseId}`)
        .then((response) => dispatch({
            type: GET_STUDENTS,
            payload: response.data,
        }))
        .catch((err) => console.log(err));
        
}
export const createStudent = (newStudent) => async dispatch => {
    try {
        await fetcher("/api/register", {
            method: 'POST',
            body: JSON.stringify(newStudent),
        })
            .then((response) => {
                if (!response.data) throw response
                return response
            })
            .then((response) => dispatch({
                type: CREATE_STUDENT,
                payload: response.data,
            }))
            .catch((err) => { throw err });
    }
    catch (error) {
        dispatch({ type: CREATE_STUDENT_ERRORS, payload: error.errors || error })
    }
}


export const deleteStudent = (student) => async dispatch => {
    await fetcher(`/api/student/deleteStudent/${student._id}`, {
        method: 'DELETE',
        body: JSON.stringify({courseId:student.courseId}),
    }).then(response => dispatch({
        type: DELETE_STUDENT,
        payload: response.data
    }))
        .catch(error => console.log(error))
}

export const updateStudent = (studentUpdate) => async dispatch => {
    const { _id } = { ...studentUpdate };
    debugger
    await fetcher(`/api/student/updateStudent/${_id}`, {
        method: 'PUT',
        body: JSON.stringify(studentUpdate)
    })
        .then(response => dispatch({
            type: UPDATE_STUDENT,
            payload: response.data
        }))
        .catch(error => console.log(error))
}

