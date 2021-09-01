import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "../../../Redux/actions/postsActions";
import ForumFormComponent from "../../ForumComponents/ForumFormComponent/ForumFormComponent";
import ForumPostsComponent from "../../ForumComponents/ForumPostsComponent/ForumPostsComponent";
import "./forum.css";
const Forum = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <div className="forum-container">
      <div>
        <ForumPostsComponent setCurrentId={setCurrentId} />
      </div>
      <div>
        <ForumFormComponent currentId={currentId} setCurrentId={setCurrentId} />
      </div>
    </div>
  );
};
export default Forum;
