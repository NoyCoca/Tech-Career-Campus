import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import techLogo from "../../../images/tech-logo.jpeg";
import "./Navbar.css";

//Ticker moving news
export default function Navbar() {
  const user = useSelector(state => state.user)
  return (
    <>
      <div className="navbar">
        <ul className="navbar-links">
          <li>
            <Link to={"/"}>דף בית</Link>
          </li>
          <li>
            <Link to={"/forum"}>פורום</Link>
          </li>
          <li>
            <Link to={"/my-course"}>הקורס שלי</Link>
          </li>
          <li>
            <Link to={"/class-schedule"}>לו"ז כיתות</Link>
          </li>
        </ul>
        <div className="navbar-logo">
          <img src={techLogo} alt="" />
        </div>
      </div>
    </>
  );
}
