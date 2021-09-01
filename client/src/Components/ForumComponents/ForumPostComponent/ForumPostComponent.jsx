import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import jwt_decode from "jwt-decode";
import "./post.css";
import { useDispatch } from "react-redux";
import { deletePost } from "../../../Redux/actions/postsActions";

const ForumPostComponent = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("jwtToken");
  const user = jwt_decode(token);
  return (
    <div className="card">
      <div className="media" title={post.title} />
      <div className="overlay">
        <h6>{post.firstName}</h6>
        <p>{post.createdAt}</p>
      </div>
      {user?._id === post?.creator && (
        <div className="overlay2">
          <button
            className="post-btn"
            style={{ color: "white" }}
            size="small"
            onClick={() => setCurrentId(post._id)}
          >
            <MoreHorizIcon fontSize="medium" />
          </button>
        </div>
      )}
      <h5 className="title">{post.title}</h5>
      <div>
        <p>{post.message}</p>
      </div>
      <div className="cardActions">
        {user?._id === post?.creator && (
          <button
            size="small"
            className="btn post-btn"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default ForumPostComponent;
