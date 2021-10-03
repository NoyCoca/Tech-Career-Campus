import { combineReducers } from "redux";
import studentsReducer from "./studentsReducer";
import userReducer from "./userReducer";
import SyllabusReducer from "./SyllabusReducer";
import postsReducer from './posts'
import staffReducer from "./staffReducer";
import coursesReducer from "./coursesReducer";
import courseReducer from "./courseReducer";
import eventsReducer from "./eventReducer";
import homeworkReducer from "./homeworkReducer";

export default combineReducers({
    user : userReducer,
    syllabus :SyllabusReducer,
    students: studentsReducer,
    student: studentsReducer,
    posts: postsReducer,
    staff: staffReducer,
    courses: coursesReducer,
    course: courseReducer,
    events: eventsReducer,
    homework: homeworkReducer
})