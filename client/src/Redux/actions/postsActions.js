import fetcher from "../../utils/fetcher";
import {
  FETCH_ALL,
  UPDATE,
  CREATE,
  DELETE,
  START_LOADING,
  STOP_LOADING,
  FETCH_POST,
  COMMENT,
} from "../actions/types";
import jwt_decode from "jwt-decode";

export const getPost = (id) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  await fetcher(`/api/forum/${id}`)
    .then((response) => {
      dispatch({
        type: FETCH_POST,
        payload: response,
      });
    })
    .then((res)=>console.log(res))
    .catch((err) => console.log(err));
  dispatch({ type: STOP_LOADING });
};

export const getPosts = (page) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  await fetcher(`/api/forum?page=${page}`)
    .then((response) => {
      dispatch({
        type: FETCH_ALL,
        payload: response,
      });
    })
    .catch((err) => console.log(err));
  dispatch({ type: STOP_LOADING });
};

export const createPostStaff = (post, history) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  const token = localStorage.getItem("jwtToken");
  const user = jwt_decode(token);
  try {
    await fetch(`/api/forum/staff`, {
      method: "POST",
      body: JSON.stringify({
        post,
        _id: user._id,
        role: user.role,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: CREATE,
          payload: res.data,
        });
        history.push(`/forum/${res.data._id}`);
      });
      dispatch({ type: STOP_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPostStudent = (post, history) => async (dispatch) => {
  const token = localStorage.getItem("jwtToken");
  const user = jwt_decode(token);
  try {
    await fetch(`/api/forum/student`, {
      method: "POST",
      body: JSON.stringify({
        post,
        _id: user._id,
        role: user.role,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: CREATE,
          payload: res.data,
        });
        history.push(`/forum/${res.data._id}`);
      });
        dispatch({ type: STOP_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  const token = localStorage.getItem("jwtToken");
  const user = jwt_decode(token);
  try {
    await fetch(`/api/forum/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        post,
        _id: user._id,
        role: user.role,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
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

export const commentPost = (id, value) => async (dispatch) => {
  const token = localStorage.getItem("jwtToken");
  const user = jwt_decode(token);
  try {
    const data = await fetch(`/api/forum/${id}/commentPost`, {
      method: "POST",
      body: JSON.stringify({
        value,
        _id: user._id,
        role: user.role,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    }).then((res) => res.json())
     
        dispatch({
          type: COMMENT,
          payload: data,
        });
       
     return data.comments
      
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  try {
    const data = await fetch(`/api/forum/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
      .then((res) => res.json())
      
        dispatch({
          type: DELETE,
          payload:data.result._id,
        })
        
       dispatch({ type: STOP_LOADING });
  } catch (error) {
    console.log(error);
  }
};
