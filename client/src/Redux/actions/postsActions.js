import { FETCH_ALL, UPDATE, CREATE, DELETE } from "../actions/types";

export const getPosts = () => async (dispatch) => {
  try {
    await fetch("http://localhost:8080/api/forum" , {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    }).then((res) => res.json())
    .then((res) =>
      dispatch({
        type: FETCH_ALL,
        payload: res.data,
      }))
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    await fetch(`http://localhost:8080/api/forum/staff`, {
      method: "POST",
      body: JSON.stringify( {post:post, _id: "612416b7721110539c4ebf44",
      role: "Staff",} ),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
      .then((res) => res.json())
      .then((res) =>
        dispatch({
          type: CREATE,
          payload: res.data,
        })
      );
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    await fetch(`http://localhost:8080/api/forum/${id}`, {
      method: "PUT",
      body: JSON.stringify( {post, _id: "612416b7721110539c4ebf44",
      role: "Staff",} ),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
      .then((res) => res.json())
      .then((res) =>
        dispatch({
          type: UPDATE,
          payload: res.data,
        })
      );
  } catch (error) { 
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await fetch(`http://localhost:8080/api/forum/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
      .then((res) => res.json())
      .then((res) =>
        dispatch({
          type: DELETE,
          payload: res.data.id,
        })
      );
  } catch (error) {
    console.log(error);
  }
};
