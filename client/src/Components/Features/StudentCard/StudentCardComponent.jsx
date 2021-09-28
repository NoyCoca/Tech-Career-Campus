import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteStudent,
  updateStudent,
} from "../../../Redux/actions/studentsActions";
import handleChange from "../../../utils/handleChange";
import { hebrewVariables } from "../../../utils/hebrewVariables";
import "./studentCard.css";
const StudentCard = ({ student }) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [studentUpdate, setStudentUpdate] = useState({ ...student });
  const { user } = useSelector((state) => state.user);

  return (
    <div className="student-card">
      <div className="student-card-img">
        <img
          src="https://img.lovepik.com/element/40170/3915.png_860.png"
          alt={"Student"}
        />
      </div>
      {!isEdit ? (
        <div className="student-card-body">
          <h3>
            {hebrewVariables.fullName}: {student.firstName} {student.lastName}
          </h3>
          <p>
            {hebrewVariables.course}: {student.courseName}
          </p>
          <p>
            {hebrewVariables.email}: {student.email}
          </p>
          <p>
            {hebrewVariables.phone}: {student.phone}
          </p>
          <p>
            {hebrewVariables.age}: {student.age}
          </p>
          <div className="student-card-body-btn">
            {user.role === "Staff" ? (
              <>
                {" "}
                <button
                  className="btn"
                  onClick={() => dispatch(deleteStudent(student._id))}
                >
                  {hebrewVariables.delete}
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    setIsEdit(true);
                    setStudentUpdate({ ...studentUpdate, _id: student._id });
                  }}
                >
                  {hebrewVariables.edit}
                </button>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <div className="student-card-body">
          <form className="student-card-body-form">
            <label>{hebrewVariables.firstName}</label>
            <input
              name="firstName"
              onChange={(e) => handleChange(e, studentUpdate, setStudentUpdate)}
              type={"text"}
              value={studentUpdate.firstName}
            />
            <label>{hebrewVariables.lastName}</label>
            <input
              name="lastName"
              onChange={(e) => handleChange(e, studentUpdate, setStudentUpdate)}
              type={"text"}
              value={studentUpdate.lastName}
            />
            <label>{hebrewVariables.email}</label>
            <input
              name="email"
              onChange={(e) => handleChange(e, studentUpdate, setStudentUpdate)}
              type={"email"}
              value={studentUpdate.email}
            />
            <label>{hebrewVariables.phone}</label>
            <input
              name="phone"
              onChange={(e) => handleChange(e, studentUpdate, setStudentUpdate)}
              type={"text"}
              value={studentUpdate.phone}
            />
            <label>{hebrewVariables.age}</label>
            <input
              name="age"
              onChange={(e) => handleChange(e, studentUpdate, setStudentUpdate)}
              type={"number"}
              value={studentUpdate.age}
            />
            <button
              className="btn"
              onClick={() => {
                setIsEdit(false);
                dispatch(updateStudent(studentUpdate));
              }}
            >
              {hebrewVariables.ok}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
export default StudentCard;
