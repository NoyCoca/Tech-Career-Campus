import { combineReducers } from "redux";
import studentsReducer from "./studentsReducer";
import studentReducer from "./studentReducer";
import userReducer from "./userReducer";
import SyllabusReducer from "./SyllabusReducer";
import postsReducer from './posts'
import staffRedcuer from "./staffRedcuer";
import coursesReducer from "./coursesReducer";
import courseReducer from "./courseReducer";
import eventsReducer from "./eventRedcuer";

export default combineReducers({
    user : userReducer,
    syllabus :SyllabusReducer,
    students: studentsReducer,
    student: studentReducer,
    posts: postsReducer,
    staff:staffRedcuer,
    courses: coursesReducer,
    course: courseReducer,
    events: eventsReducer
})