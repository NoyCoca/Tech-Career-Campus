
import React, { useState } from "react";
import { getUser } from "../../../Redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

import "./Login.css";
import handleChange from "../../../utils/handleChange";
import { hebrewVariables } from "../../../utils/hebrewVariables";

const Login = () => {
  const { errors } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
    role: "",
  });
  return (
    <div className="login">
      <div className="login-root">
        <div
          className="box-root flex-flex flex-direction--column"
          style={{ minHeight: " 100vh", flexGrow: "1" }}
        >
          <div className="login_background box-background--white padding-top--64">
            <div className="login_background-gridContainer">
              <div
                className="box-root flex-flex"
                style={{ gridArea: " top / start / 8 / end" }}
              >
                <div
                  className="box-root"
                  style={{
                    backgroundImage:
                      " linear-gradient(white 0%, rgb(247, 250, 252) 33%)",
                    flexGrow: "1",
                  }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: " 4 / 2 / auto / 5" }}
              >
                <div
                  className="box-root box-divider--light-all-2 animationLeftRight tans3s"
                  style={{ flexGrow: "1" }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: " 6 / start / auto / 2" }}
              >
                <div
                  className="box-root box-background--blue800"
                  style={{ flexGrow: "1" }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: " 7 / start / auto / 4" }}
              >
                <div
                  className="box-root box-background--blue animationLeftRight"
                  style={{ flexGrow: "1" }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: " 8 / 4 / auto / 6" }}
              >
                <div
                  className="box-root box-background--gray100 animationLeftRight tans3s"
                  style={{ flexGrow: "1" }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: " 2 / 15 / auto / end" }}
              >
                <div
                  className="box-root box-background--cyan200 animationRightLeft tans4s"
                  style={{ flexGrow: "1" }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "3 / 14 / auto / end" }}
              >
                <div
                  className="box-root box-background--blue animationRightLeft"
                  style={{ flexGrow: "1" }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: " 4 / 17 / auto / 20" }}
              >
                <div
                  className="box-root box-background--gray100 animationRightLeft tans4s"
                  style={{ flexGrow: "1" }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: " 5 / 14 / auto / 17" }}
              >
                <div
                  className="box-root box-divider--light-all-2 animationRightLeft tans3s"
                  style={{ flexGrow: "1" }}
                ></div>
              </div>
            </div>
          </div>
          <div
            className="box-root padding-top--24 flex-flex flex-direction--column"
            style={{ flexGrow: "1", zIndex: "9" }}
          >
            <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
              <h1>
                <a
                  href="https://www.tech-career.org/"
                  rel="dofollow"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {hebrewVariables.techCareer}
                </a>
              </h1>
            </div>
            <div className="formbg-outer">
              <div className="formbg">
                <div className="formbg-inner padding-horizontal--48">
                  <span className="padding-bottom--15">{hebrewVariables.login}</span>
                  <form id="stripe-login">
                    <div className="field padding-bottom--24">
                      <label htmlFor="email">{hebrewVariables.email}</label>
                      <input
                        type="email"
                        name="email"
                        value={loginInfo.email}
                        onChange={(e) =>
                          handleChange(e, loginInfo, setLoginInfo)
                        }
                        required
                      />
                      <p className="errors">{errors?.email}</p>
                    </div>
                    <div className="field padding-bottom--24">
                      <input
                        type="password"
                        name="password"
                        onChange={(e) =>
                          handleChange(e, loginInfo, setLoginInfo)
                        }
                        value={loginInfo.password}
                        autoComplete="off"
                        required
                      />
                      <p className="errors">{errors?.password}</p>
                    </div>
                    <div>
                      <p>{hebrewVariables.loginAs}</p>
                      <label>
                        <input
                          type="radio"
                          onChange={(e) =>
                            handleChange(e, loginInfo, setLoginInfo)
                          }
                          name="role"
                          value="Student"
                        />
                        {hebrewVariables.student}
                      </label>
                      <label>
                        <input
                          type="radio"
                          onChange={(e) =>
                            handleChange(e, loginInfo, setLoginInfo)
                          }
                          name="role"
                          value="Staff"
                        />
                        {hebrewVariables.staff}
                      </label>
                    </div>
                    <div className="field padding-bottom--24">
                      <input
                        type="submit"
                        name="submit"
                        value="Continue"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(getUser(loginInfo));
                        }}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
