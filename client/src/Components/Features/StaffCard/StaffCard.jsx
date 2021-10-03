import React, { useState, useEffect } from "react";
import "./Staff.css";
import { useDispatch } from "react-redux";
import { updateStaff } from "../../../Redux/actions/staffAction";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import handleChange from "../../../utils/handleChange";
import { hebrewVariables } from "../../../utils/hebrewVariables";
import Dialog from '@material-ui/core/Dialog';
import ConfirmDialog from '../../Features/ConfirmDialog/ConfirmComponent'


const StaffCard = ({ staffItem }) => {

  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const [staffUpdate, setStaffUpdate] = useState({ ...staffItem });
  const [dialogOpen, setDialogOpen] = useState(false)

  const { firstName, lastName, phone, email, jod, responsible, profileImg } =
    staffItem;

  const IMAGE_PATH = profileImg?.slice(profileImg.lastIndexOf('\\') + 1, profileImg.length) || "";


  return (
    <div className="staff-card">

      <ConfirmDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen} 
        staff={staffItem}/>

      <Dialog aria-labelledby="form-dialog-title" open={isEdit}  >
        <div className="s-card-body-form">
          <div className="staff-card-img">
            {
              IMAGE_PATH.length === 0 ?
                <img
                  src="https://img.lovepik.com/element/40170/3915.png_860.png"
                  alt={"staff profile"}

                />
                :

                <img
                  src={`/images/${IMAGE_PATH}`}
                  alt={"staff profile"}
                />
            }
          </div>
          <div className="staff-card-body">
            <h1>
              {firstName} {lastName}
            </h1>
          </div>
          <div>
            <lable>{hebrewVariables.responsibleFor}</lable>
            <input
              name="responsible"
              label
              type="text"
              onChange={(e) => handleChange(e, staffUpdate, setStaffUpdate)}
              value={staffUpdate.responsible}
            />
            <lable>{hebrewVariables.job}</lable>
            <input
              name="jod"
              label
              type="text"
              onChange={(e) => handleChange(e, staffUpdate, setStaffUpdate)}
              value={staffUpdate.jod}
            />
            <div variant="body2" color="text.secondary">
              <h3>{hebrewVariables.contact}</h3>
              <ul>
                <li>
                  <input
                    type="phone"
                    value={staffUpdate.phone}
                    onChange={(e) => handleChange(e, staffUpdate, setStaffUpdate)}
                  />
                </li>
              </ul>
            </div>
            <Button
              onClick={() => {
                setIsEdit(!isEdit);
              }}
            >
              {hebrewVariables.closeBtn}
            </Button>

            <Button
              onClick={() => {
                dispatch(updateStaff(staffUpdate));
              }}
            >
              {hebrewVariables.update}
            </Button>

          </div>
        </div>
      </Dialog>


      <div className="s-card-body-form">
        <div className="staff-card-img">
          {
            IMAGE_PATH.length === 0 ?
              <img
                src="https://img.lovepik.com/element/40170/3915.png_860.png"
                alt={"staff profile"}

              />
              :

              <img
                src={`/images/${IMAGE_PATH}`}
                alt={"staff profile"}
              />
          }
        </div>
        <div>
          <div>
            <h1>
              {firstName} {lastName}
            </h1>
          </div>
          <div>
            <h3>{jod}</h3>
          </div>
          <div variant="body2" color="text.secondary">
            <p>
              <h4>{hebrewVariables.responsibleFor}</h4>
              {responsible}
            </p>
          </div>
          <div variant="body2" color="text.secondary">
            <h3>{hebrewVariables.contact}</h3>
            <ul>
              <li>{phone}</li>
              <li>{email}</li>
            </ul>
          </div>
        </div>
        <div className="staff-card-body-btn">
          <Button>
            <DeleteIcon onClick={() => setDialogOpen(!dialogOpen)} />
          </Button>
          <Button
            onClick={() => {
              setIsEdit(!isEdit);
              setStaffUpdate({ ...staffUpdate, _id: staffItem._id });
            }}
          >
            {hebrewVariables.update}
          </Button>

        </div>
      </div>
    </div>
  );
};

export default StaffCard;
