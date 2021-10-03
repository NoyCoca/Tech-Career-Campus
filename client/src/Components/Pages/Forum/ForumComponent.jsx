import React, { useState } from "react";
import Pagination from "../../Features/ForumPosts/Pagination";
import ForumFormComponent from "./ForumComponents/ForumFormComponent/ForumFormComponent";
import ForumPostsComponent from "./ForumComponents/ForumPostsComponent/ForumPostsComponent";
import "./forum.css";
import { useLocation } from "react-router";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Forum = () => {
  const [currentId, setCurrentId] = useState(null);
  const query = useQuery();
  const page = query.get("page") || 1;

  return (
    <div className="forum-container">
      <div>
        <ForumPostsComponent setCurrentId={setCurrentId} />
        <div>
          <Pagination page={page} />
        </div>
      </div>
      <div>
        <ForumFormComponent currentId={currentId} setCurrentId={setCurrentId} />
      </div>
    </div>
  );
};
export default Forum;
