import { FETCH_ALL, UPDATE, CREATE, DELETE } from "../actions/types";
import jwt_decode from "jwt-decode";

export const getPosts = () => async (dispatch) => {
    try {
      const { data } = await await fetch("http://localhost:8080/api/posts")
  
      dispatch({ type:FETCH_ALL, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  
export const createPost = (post) => async (dispatch) => {
  try {
    await fetch(`http://localhost:8080/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            post:post
        }),
        headers: { 'Content-Type': "application/json" }
    }).then(res => res.json())
        .then(res => dispatch({
            type: CREATE,
            payload: res.data
        }))
  
  } catch (error) {
    console.log(error);
  }
};
export const updatePost = (id, post) => async (dispatch) => {
  try {
    await fetch(`http://localhost:8080/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            post:post
        }),
        headers: { 'Content-Type': "application/json" }
    }).then(res => res.json())
        .then(res => dispatch({
            type: UPDATE,
            payload: res.data
        }))
  } catch (error) {
    console.log(error);
  }
};
export const deletePost = (id) => async (dispatch) => {
  try {
    await fetch(`http://localhost:8080/api/posts/${id}`, {
        method: 'DELETE',
    }).then(res => res.json())
        .then(res => dispatch({
            type: DELETE,
            payload: res.data
        }))
  } catch (error) {
    console.log(error);
  }
};


