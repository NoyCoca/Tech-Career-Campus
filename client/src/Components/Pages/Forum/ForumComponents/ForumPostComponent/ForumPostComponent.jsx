import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { ButtonBase } from "@material-ui/core";
import "./post.css";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../../../../Redux/actions/postsActions";
import { useHistory } from "react-router";
import moment from "moment";
import { hebrewVariables } from "../../../../../utils/hebrewVariables";

const ForumPostComponent = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const [isDelete, setIsDelete] = useState(false);
  const { user } = useSelector((state) => state.user);
  const history = useHistory();

  const openPost = () => {
    history.push(`/forum/${post._id}`);
  };

  return (
    <div className="card">
      <ButtonBase onClick={openPost}>
        <div className="media" title={post.title} />
        <div className="overlay">
          <h3>{post.firstName}</h3>
          <p style={{ direction: "ltr" }}>{moment(post.createdAt).fromNow()}</p>
        </div>
        <h5 className="title">{post.title}</h5>
        <div>
          <p>{post.message}</p>
        </div>
      </ButtonBase>
      {user?.email === post?.email && (
        <div className="overlay2">
          <button
            className="post-btn"
            style={{ color: "black" }}
            size="small"
            onClick={() =>  setCurrentId(post._id)}
          >
            <MoreHorizIcon fontSize="medium" />
          </button>
        </div>
      )}

      <div className="cardActions">
        {user?.email === post?.email && (
          <button
            size="small"
            className="btn"
            onClick={() =>{setIsDelete(isDelete ? false : true);dispatch(deletePost(post._id))}}
          >
            <DeleteIcon fontSize="small" />
            {hebrewVariables.delete}
          </button>
        )}
      </div>
    </div>
  );
};

export default ForumPostComponent;
