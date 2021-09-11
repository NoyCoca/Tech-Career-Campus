import { ADD_TEST, EDIT_GRADE, DELETE_TEST, GET_STUDENT } from '../actions/types';

function studentsReducer(student = {}, action) {
    switch (action.type) {
        case GET_STUDENT:
            return action.payload
        case EDIT_GRADE:
            return {
                ...student, tests: action.payload
            }
        case ADD_TEST:
            return {
                ...student, tests: action.payload
            }
        case DELETE_TEST:
            return {
                ...student, tests: action.payload
            }
        default:
            return student;
    }
}

export default studentsReducer;