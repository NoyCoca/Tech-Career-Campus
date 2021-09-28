import React, { useState } from "react";
import "./Staff.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteStaff, updateStaff } from "../../../Redux/actions/staffAction";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import staffImg from "../../../images/1632247546163.jpg";
import handleChange from "../../../utils/handleChange";
import { hebrewVariables } from "../../../utils/hebrewVariables";

const StaffCard = ({ staffItem }) => {
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const [staffUpate, setStaffUpdate] = useState({ ...staffItem });

  const deletestaffHandler = (_id) => {
    dispatch(deleteStaff(_id));
  };

  const { firstName, lastName, phone, email, jod, responsible, _id } =
    staffItem;

  return (
    <div className="staff-card">
      {isEdit ? (
        <div className="body-staff">
          <div className="staff-card-img">
            <img
              src={staffImg}
              alt={"staff"}
            />
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
            onChange={(e) => handleChange(e, staffUpate, setStaffUpdate)}
            value={staffUpate.responsible}
          />
          <lable>{hebrewVariables.job}</lable>
          <input
            name="jod"
            label
            type="text"
            onChange={(e) => handleChange(e, staffUpate, setStaffUpdate)}
            value={staffUpate.jod}
          />
          <div variant="body2" color="text.secondary">
            <h3>{hebrewVariables.contact}</h3>
            <ul>
              <li>
                <input
                  type="phone"
                  value={staffUpate.phone}
                  onChange={(e) => handleChange(e, staffUpate, setStaffUpdate)}
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
              dispatch(updateStaff(staffUpate));
            }}
          >
            {hebrewVariables.update}
          </Button>
          </div>
        </div>
      ) : (
        <div  className="s-card-body-form">
          <div className="staff-card-img">
            <img
              src={staffImg}
              alt={"staff"}
            />
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
              <DeleteIcon onClick={() => deletestaffHandler(_id)} />
            </Button>
            <Button
              onClick={() => {
                setIsEdit(!isEdit);
                setStaffUpdate({ ...staffUpate, _id: staffItem._id });
              }}
            >
              {hebrewVariables.update}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffCard;
