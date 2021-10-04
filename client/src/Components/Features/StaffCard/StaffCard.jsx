import React, { useState, useEffect } from "react";
import "./Staff.css";
import { useDispatch, useSelector } from "react-redux";
import { updateStaff } from "../../../Redux/actions/staffAction";
import handleChange from "../../../utils/handleChange";
import { hebrewVariables } from "../../../utils/hebrewVariables";
import Dialog from "@material-ui/core/Dialog";
import ConfirmDialog from "../../Features/ConfirmDialog/ConfirmComponent";

const StaffCard = ({ staffItem }) => {
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const [staffUpdate, setStaffUpdate] = useState({ ...staffItem });
  const [dialogOpen, setDialogOpen] = useState(false);
  const user = useSelector(state => state.user.user)


  const { firstName, lastName, phone, email, jod, responsible, profileImg } =
    staffItem;

  const IMAGE_PATH =
    profileImg?.slice(profileImg.lastIndexOf("\\") + 1, profileImg.length) ||
    "";
  console.log(jod)
  return (
    <div className="big-card">
      <ConfirmDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        staff={staffItem}
      />

      <Dialog aria-labelledby="form-dialog-title" open={isEdit}>
        <article className="card-article">
          <div className="card-box">
            {IMAGE_PATH.length === 0 ? (
              <img
                src="https://img.lovepik.com/element/40170/3915.png_860.png"
                alt={"staff profile"}
                style={{ width: "1500", height: "1368" }}
              />
            ) : (
              <img
                src={`/images/${IMAGE_PATH}`}
                alt={"staff profile"}
                style={{ width: "1500", height: "1368" }}
              />
            )}
          </div>
          <div className="article-content">
            <p className="article-tags">
              <span className="article-tag"> {responsible}</span>
              <span className="article-tag">{jod}</span>
            </p>
            <h1 className="article-title">
              <a href="#">
                {firstName} {lastName}
              </a>
            </h1>

            <p className="article-metadata">
              <span className="article-rating"></span>
              <span className="article-votes"></span>
            </p>

            <p className="article-desc">
              <h3>{hebrewVariables.contact}</h3>
              <ul>
                <label>{hebrewVariables.responsibleFor}</label>
                <br />
                <input
                  name="responsible"
                  label
                  type="text"
                  onChange={(e) => { handleChange(e, staffUpdate, setStaffUpdate); console.log(staffUpdate) }}
                  value={staffUpdate.responsible}
                />{" "}
                <br />
                <label>{hebrewVariables.job}</label>
                <br />
                <input
                  name="jod"
                  label
                  type="text"
                  onChange={(e) => handleChange(e, staffUpdate, setStaffUpdate)}
                  value={staffUpdate.jod}
                />
                <div>
                  <h3>{hebrewVariables.contact}</h3>
                  <ul>
                    <li>
                      <input
                        type="phone"
                        name="phone"
                        onChange={(e) =>
                          handleChange(e, staffUpdate, setStaffUpdate)
                        }
                        value={staffUpdate.phone}
                      />
                    </li>
                  </ul>
                </div>
              </ul>
            </p>
            <button
              className="article-button"
              onClick={() => {
                dispatch(updateStaff(staffUpdate));
                setIsEdit(!isEdit)
              }}
            >
              {hebrewVariables.update}
            </button>
            <button
              className="article-button"
              onClick={() => {
                setIsEdit(!isEdit);
              }}
            >
              {hebrewVariables.closeBtn}
            </button>
          </div>
        </article>
      </Dialog>

      <article className="card-article">
        <div className="card-box">
          {IMAGE_PATH.length === 0 ? (
            <img
              src="https://img.lovepik.com/element/40170/3915.png_860.png"
              alt={"staff profile"}
              style={{ width: "1500", height: "1368" }}
            />
          ) : (
            <img
              src={`/images/${IMAGE_PATH}`}
              alt={"staff profile"}
              style={{ width: "1500", height: "1368" }}
            />
          )}
        </div>
        <div className="article-content">
          <p className="article-tags">
            <span className="article-tag"> {responsible}</span>
            <span className="article-tag">{jod}</span>
          </p>
          <h1 className="article-title">
            <a href="#">
              {firstName} {lastName}
            </a>
          </h1>

          <p className="article-metadata">
            <span className="article-rating"></span>
            <span className="article-votes"></span>
          </p>

          <p className="article-desc">
            <h3>{hebrewVariables.contact} :</h3>
            <ul>
              <li>{phone}</li>
              <li>{email}</li>
            </ul>
          </p>

          {
            user.role === "Staff" ?
              <>
                <button
                  className="article-button"
                  onClick={() => {
                    setIsEdit(!isEdit);
                    setStaffUpdate({ ...staffUpdate, _id: staffItem._id });
                  }}
                >
                  {hebrewVariables.update}
                </button>
                <button className="article-button" onClick={() => setDialogOpen(!dialogOpen)} >
                  {hebrewVariables.delete}
                </button>
              </>
              :
              ""
          }


        </div>
      </article>
    </div>
  );
};

export default StaffCard;
