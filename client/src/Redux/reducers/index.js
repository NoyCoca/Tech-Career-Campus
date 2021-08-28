import { combineReducers } from "redux";
import userReducer from "./userReducer";
import postsReducer from './posts'
export default combineReducers({
    user : userReducer,
    posts:postsReducer
})