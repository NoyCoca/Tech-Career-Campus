import fetcher from '../../utils/fetcher';
import { EDIT_GRADE, ADD_TEST, DELETE_TEST, GET_STUDENT } from './types'

export const getStudent = (student) => dispatch => {
    return dispatch({
        type: GET_STUDENT,
        payload: student
    })
}

export const editGrade = (updateTest) => async dispatch => {

    await fetcher(`http://localhost:8080/api/student/updateTest/${updateTest.studentId}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: updateTest.gradeId,
            name: updateTest.name,
            grade: updateTest.grade
        }),
    })
        .then(res => dispatch({
            type: EDIT_GRADE,
            payload: res.data
        }))
        .catch(error => console.log(error))
}

export const addTest = (newTest) => async dispatch => {
    await fetcher(`http://localhost:8080/api/student/addTestById`, {
        method: 'POST',
        body: JSON.stringify({
            id: newTest.studentId,
            name: newTest.name,
            grade: newTest.grade
        }),
    })
        .then(res => dispatch({
            type: ADD_TEST,
            payload: res.data
        }))
        .catch(error => console.log(error))
}

export const deleteTest = (testDelete) => async dispatch => {

    await fetcher(`http://localhost:8080/api/student/deleteTest/${testDelete.studentId}`, {
        method: 'DELETE',
        body: JSON.stringify({
            id: testDelete.testId,
        }),
    })
        .then(res => dispatch({
            type: DELETE_TEST,
            payload: res.data
        }))
        .catch(error => console.log(error))
}