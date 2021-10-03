import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteStudent,
  updateStudent,
} from "../../../Redux/actions/studentsActions";
import handleChange from "../../../utils/handleChange";
import { hebrewVariables } from "../../../utils/hebrewVariables";
import maleAvatar from '../../../images/male-avatar.jpg'
import femaleAvatar from '../../../images/female-avatar.jpg'
import "./studentCard.css";
const StudentCard = ({ student }) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [studentUpdate, setStudentUpdate] = useState({ ...student });
  const { user } = useSelector((state) => state.user);
  const { profileImg } = studentUpdate

  const IMAGE_PATH = profileImg?.slice(profileImg.lastIndexOf('\\') + 1, profileImg.length) || "";



  return (
    <div className="big-card">
       <article className="card-article">
       <div className="card-box">
       {
          IMAGE_PATH.length > 0 ?
            <img
              src={`/images/${IMAGE_PATH}`}
              alt={"Student"}
              style={{ width: "1500", height: "1368" }}
            />
            :
            <img
              src={studentUpdate.gender === "זכר" ? maleAvatar : femaleAvatar}
              alt={"Student"}
              style={{ width: "1500", height: "1368" }}
            />

        }

            </div>
      
      {!isEdit ? (
        <div className="article-content">
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
                <button
                style={{marginLeft:'5px'}}
                   className="article-button"
                   onClick={() => {
                    setIsDelete(isDelete ? false : true);
                    dispatch(deleteStudent(student))
                  }
                  }
                >
                  {hebrewVariables.delete}
                </button>
                <button
                   className="article-button"
                  onClick={() => {
                    setIsEdit(isEdit ? false : true); setStudentUpdate({ ...studentUpdate, _id: student._id })
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
        <div className="article-content">
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
              className="article-button"
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
          </article>
    </div>
  );
};
export default StudentCard;
