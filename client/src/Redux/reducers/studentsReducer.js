import { ADD_TEST, DELETE_TEST, EDIT_GRADE, GET_STUDENTS} from '../actions/types'
function studentsReducer(students = [], action) {
    switch (action.type) {
        case GET_STUDENTS:
            return action.payload
        case EDIT_GRADE:
            return students.map(student => student._id === action.payload._id ? {...student, tests:action.payload.tests} : student)
        case ADD_TEST:
            return students.map(student => student._id === action.payload._id ? { ...student, tests: action.payload.tests } : student)
        case DELETE_TEST:
            return students.map(student => student._id === action.payload._id ? { ...student, tests: action.payload.tests } : student)
        default:
    return students;
}
}

export default studentsReducer;