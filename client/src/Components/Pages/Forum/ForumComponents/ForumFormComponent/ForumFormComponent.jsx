import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPostStaff,
  createPostStudent,
  updatePost,
} from "../../../../../Redux/actions/postsActions";
import { useHistory } from "react-router-dom";
import "./form.css";
const ForumFormComponent = ({ currentId, setCurrentId }) => {
  const history = useHistory();
  const [postData, setPostData] = useState({
    title: "",
    message: "",
  });
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updatePost(currentId, {
          ...postData,
          firstName: user?.firstName,
          email: user?.email,
        })
      );
    } else {
      if (user?.role === "Staff") {
        dispatch(
          createPostStaff(
            {
              ...postData,
              firstName: user?.firstName,
              email: user?.email,
            },
            history
          )
        );
      } else {
        dispatch(
          createPostStudent(
            {
              ...postData,
              firstName: user?.firstName,
              email: user?.email,
            },
            history
          )
        );
      }
    }
    clear();
  };
  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
    });
  };
  return (
    <div id="form-div">
      <form onSubmit={handleSubmit} className="forum-form" id="form1">
        <p className="name">
          <input
            name="title"
            type="text"
            className="validate[required,custom[onlyLetter],length[0,100]] feedback-input"
            placeholder="כותרת..."
            value={postData.title}
            id="name"
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
        </p>
        <p className="text">
          <input
            name="message"
            className="validate[required,length[6,300]] feedback-input"
            id="comment"
            placeholder="תוכן הפוסט..."
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          ></input>
        </p>

        <div className="submit">
          <button type="submit" value="SEND" id="button-forum-submit">
            {currentId ? "ערוך" : "שלח"}
          </button>
          <div className="ease"></div>
        </div>
      </form>
    </div>
  );
};

export default ForumFormComponent;
