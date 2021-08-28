import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import ForumPostComponent from "../ForumPostComponent/ForumPostComponent";
const ForumPostsComponent = (setCurrentId) => {
  const posts = [
    {
      id: 1,
      name: "shlomo",
      email: "shlomo@gmail.com",
      createdAt: new Date().toISOString(),
      message: "how do i react to react?",
    },
    {
      id: 2,
      name: "kiba",
      email: "kiba@gmail.com",
      createdAt: new Date().toISOString(),
      message: "can i use use ref to get input value?",
    },
  ];
  return !posts.length ? (
    <CircularProgress />
  ) : (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <ForumPostComponent post={post} setCurrentId={setCurrentId} />
        </div>
      ))}
    </div>
  );
};

export default ForumPostsComponent;
