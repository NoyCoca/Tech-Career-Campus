import { GET_SYLLABUS ,UPDATE_SYLLABUS,UPDATE_SUB_SUBJECT } from '../actions/types'

function SyllabusReducer(syllabus ={}, action) {
    switch (action.type) {
        case GET_SYLLABUS:
            return action.payload
        case UPDATE_SYLLABUS:
            return {...syllabus, CourseInformation:action.payload.CourseInformation}
        case UPDATE_SUB_SUBJECT:
            return {...syllabus, CourseInformation:action.payload.CourseInformation}
        default:
            return syllabus;
    }
}

export default SyllabusReducer;
