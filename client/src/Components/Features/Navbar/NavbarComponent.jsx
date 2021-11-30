import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import techLogo from "../../../images/tech-logo.jpeg";
import "./Navbar.css";
import { hebrewVariables } from "../../../utils/hebrewVariables";
import EditProfile from "../EditProfile/EditProfileConponent";
import maleAvatar from '../../../images/male-avatar.jpg'
import femaleAvatar from '../../../images/female-avatar.jpg'
const logout = () => {
  localStorage.removeItem("jwtToken");
  window.location.href = "./";
};

const Navbar = () => {
  const [editProfile, setEditProfile] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);

  const { profileImg } = user;

  const IMAGE_PATH =
    profileImg?.slice(profileImg.lastIndexOf("\\") + 1, profileImg.length) ||
    "";
  console.log(user);
  return (
    <>
      <div className="navbar-main">
        <div className="navbar-logo">
          <img src={techLogo} alt="" />
        </div>{" "}
        <div className="navbar-links-container">
          <div className="navbar-links-header">
            <ul className="navbar-links">
              <li>
                <Link to={"/"}>{hebrewVariables.homePage}</Link>
              </li>
              <li>
                <Link to={"/forum"}>{hebrewVariables.forum}</Link>
              </li>
              <li>
                <Link to={"/my-course"}>{hebrewVariables.myCourse}</Link>
              </li>
              <li>
                <Link to={"/class-schedule"}>
                  {hebrewVariables.classSchedule}
                </Link>
              </li>
              {user.job === "מנהלת פדגוגית" || user.job === "מנהל פדגוגי" ? (
                <li>
                  <Link to={"/creatCourse"}> צור קורס</Link>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
        <div className="navbar-log-user">
          <div className="navbar-user">
            <h4>
              היי, {user.firstName} {user.lastName}
            </h4>
            {
              IMAGE_PATH.length === 0 ?
                <img
                  src={user.gender==="זכר"?maleAvatar:femaleAvatar}
                  alt={"Student"}

                />
                :
                <img
                  src={`/images/${IMAGE_PATH}`}
                  alt={"Student"}
                />
            }

            {editProfile ? (
              <EditProfile
                open={open}
                setOpen={setOpen}
                user={user}
                setEditProfile={setEditProfile}
              />
            ) : (
              ""
            )}
          </div>
          <div className="article-button-continer">
          <button
            className="btn"
            onClick={() => {
              setEditProfile(editProfile ? false : true);
              setOpen(true);
            }}
          >
            <i className="fas fa-cog"></i>
          </button>
          <button className="btn" onClick={() => logout()}>
            {hebrewVariables.logout}
          </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
