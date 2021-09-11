import { GET_SYLLABUS } from '../actions/types'

function SyllabusReducer(state = {}, action) {
    switch (action.type) {
        case GET_SYLLABUS:
            return {
                ...state, state:action.payload
            }
        default:
            return state;
    }
}

export default SyllabusReducer;
