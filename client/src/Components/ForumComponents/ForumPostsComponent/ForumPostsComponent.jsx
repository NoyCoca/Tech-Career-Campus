import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import ForumPostComponent from "../ForumPostComponent/ForumPostComponent";
import { useSelector } from "react-redux";
import "./posts.css";

const ForumPostsComponent = ({setCurrentId}) => {
  const posts = useSelector((state) => state.posts);

  return !posts.length ? (
    <CircularProgress />
  ) : (
    <div className="posts">
      {posts.map((post) => (
        <div key={post._id}>
          <ForumPostComponent post={post} setCurrentId={setCurrentId} />
        </div>
      ))}
    </div>
  );
};

export default ForumPostsComponent;
