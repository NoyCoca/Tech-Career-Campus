import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import "./forum-comment.css";
import { commentPost } from '../../../../../Redux/actions/postsActions'

const ForumPostComponents = ({post}) => {
  const [comments, setComments]= useState(post?.data?.comments)
  const [comment, setComment] = useState("")

  const token = localStorage.getItem("jwtToken");
  const user = jwt_decode(token);
   const dispatch = useDispatch()
   const commentRef = useRef()
  const handleClick = async ()=>{
    const finalComment =`${user.firstName} ${user.lastName}: ${comment}`
   const newComments= await dispatch(commentPost(post.data._id,finalComment))
   setComments(newComments)
   setComment("")
   commentRef.current.scrollIntoView({behavior:"smooth"})
  }
  return (
      <div className="chat-container">
              <ul className="chat-thread">
      {comments.map((c,i)=>(
        <li  key={i}>
       <strong>{c.split(": ")[0]}: </strong> 
       {c.split(":")[1]}
        </li>
      ))}
      <li ref={commentRef}></li>
      </ul>
      <div className="chat-window">
       
        <input
          className="chat-window-message"
          name="chat-window-message"
          type="text"
          autocomplete="off"
          autofocus
          placeholder='הקלד כאן...'
          value={comment}
          onChange={(e)=> setComment(e.target.value)}
        />
        <button style={{width:"100%",marginTop:"10px"}} disabled={!comment} className="btn" onClick={handleClick}>הגב</button>
      </div>
    </div>
  );
};

export default ForumPostComponents;
