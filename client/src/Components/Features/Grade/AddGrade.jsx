import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTest } from "../../../Redux/actions/studentActions";

const AddGrade = ({ studentId }) => {
  const [newTest, setNewTest] = useState({
    grade: "",
    name: "",
  });
  const dispatch = useDispatch();

  const HandleChange = (e) => {
    setNewTest({
      ...newTest,
      [e.target.name]: e.target.value,
      studentId,
    });
  };

  return (
    <form className="grade-form" onSubmit={(e)=> e.preventDefault()}>
      <label>Test name</label>
      <input
        type={"text"}
        placeholder={"Test name"}
        value={newTest.name}
        name={"name"}
        onChange={(e) => HandleChange(e)}
        required
      />
      <label>Grade</label>
      <input
      type={"number"}
        value={newTest.grade}
        placeholder={"Grade"}
        name={"grade"}
        onChange={(e) => HandleChange(e)}
        required
      />
      <button
        className="btn"
        onClick={(e) => {
          dispatch(addTest(newTest));
          // e.preventDefault();
        }}
      >
        Add test
      </button>
    </form>
  );
};

export default AddGrade;
