import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStudent } from "../../../Redux/actions/studentsActions";
import handleChange from "../../../utils/handleChange";
import { hebrewVariables } from "../../../utils/hebrewVariables";
import maleAvatar from '../../../images/male-avatar.jpg'
import femaleAvatar from '../../../images/female-avatar.jpg'
import "./registerForm.css";

let generator = require("generate-password");

let password = generator.generate({
  length: 8,
  numbers: true,
});
const RegisterForm = ({ SetIsRegister }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { errors } = useSelector((state) => state.students);
  const course = useSelector((state) => state.course);

  const [newStudent, setNewStudent] = useState({
    registeredAs: "Student",
    id: user._id,
    courseId: course._id,
    courseName: course.name,
    password: password,
  });

  const [isSend, setIsSend] = useState(false);

  return (
    <>
      {!isSend ? (
        <form
          className="register-form-form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label>{hebrewVariables.firstName}</label>
          <input
            name="firstName"
            onChange={(e) => handleChange(e, newStudent, setNewStudent)}
            type={"text"}
          />
          <p> {errors?.firstName ? errors.firstName : ""} </p>

          <label>{hebrewVariables.lastName}</label>
          <input
            name="lastName"
            onChange={(e) => handleChange(e, newStudent, setNewStudent)}
            type={"text"}
          />
          <p> {errors?.lastName ? errors.lastName : ""} </p>

          <label>{hebrewVariables.email}</label>
          <input
            name="email"
            onChange={(e) => handleChange(e, newStudent, setNewStudent)}
            type={"email"}
          />
          <p> {errors?.email ? errors.email : ""} </p>
          <label>{hebrewVariables.phone}</label>
          <input
            name="phone"
            onChange={(e) => handleChange(e, newStudent, setNewStudent)}
            type={"text"}
          />
          <p> {errors?.phone ? errors.phone : ""} </p>

          <label>{hebrewVariables.selectGender}</label>
          <input
            type="radio"
            onChange={(e) =>
              handleChange(e, newStudent, setNewStudent)
            }
            name="gender"
            value="זכר"
          />
           <input
            type="radio"
            onChange={(e) =>
              handleChange(e, newStudent, setNewStudent)
            }
            name="gender"
            value="נקבה"
          />

          <label>{hebrewVariables.age}</label>
          <input
            name="age"
            onChange={(e) => handleChange(e, newStudent, setNewStudent)}
            type={"number"}
          />
          <p> {errors?.age ? errors.age : ""} </p>

          <label>{hebrewVariables.password}</label>
          <input
            name="password"
            onChange={(e) => handleChange(e, newStudent, setNewStudent)}
            type={"text"}
            value={newStudent.password}
          />
          <button
            onClick={() => dispatch(createStudent(newStudent))}>
            {hebrewVariables.add}
          </button>
        </form>
      ) : (
        <div>
          <h3>
            {newStudent.firstName} {newStudent.lastName}{hebrewVariables.registered}
          </h3>
          <p> {hebrewVariables.emailSent} {newStudent.email}</p>
          <button onClick={() => {
            SetIsRegister();
            setIsSend(false)
          }}>{hebrewVariables.closeBtn}</button>
        </div>
      )}
    </>
  );
};
export default RegisterForm;

