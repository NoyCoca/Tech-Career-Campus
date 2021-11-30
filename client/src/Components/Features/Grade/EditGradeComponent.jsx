import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editGrade, deleteTest } from "../../../Redux/actions/studentActions";
import "./EditGradeComponent.css";
import AddGrade from "./AddGrade";
import {hebrewVariables} from '../../../utils/hebrewVariables'
const EditGradeComponent = ({ handleFnc , students }) => {
  const student = useSelector((state) => state.student);
  console.log(student)
  const dispatch = useDispatch();
  
  const [editTest, setEditTest] = useState({ isEdit: false, testId: "" });
  
  const [updateTest, setUpdateTest] = useState({
    studentId: student._id,
  });
 console.log(updateTest);

  const [testDelete, setTestDelete] = useState({
    studentId: student._id,
  });
  // useEffect(() => dispatch(deleteTest(testDelete)), [testDelete, dispatch]);

  const HandleChange = (e) => {
    setUpdateTest({
      ...updateTest,
      [e.target.name]: e.target.value,
      gradeId: editTest.testId,
    });

    console.log(updateTest)
  };
  return (
    <div className="student-info">
      <div> &nbsp;</div>
      <h1>
        {student?.firstName} {student?.lastName}
      </h1>
      <hr />
      {student?.tests?.map((test, index) => {

{
  console.log(test)
}
        return (
          <div className="grade-form" key={test._id}>
            <h4>{test.name}</h4>
            {editTest.isEdit && editTest.testId === test._id ? (
              <>
                <input
                  type="number"
                  placeholder={test.grade}
                  name="grade"
                  onChange={(e) => HandleChange(e)}
                />
                <i
                  onClick={() => {
                    dispatch(editGrade(updateTest));
                    setEditTest({
                      isEdit: false,
                      testId: test._id,
                    });
                  }}
                  className="fas fa-check-square"
                ></i>
              </>
            ) : (
              <div className="grade-icon">        
                <i
                  onClick={() => {
                    setEditTest({ isEdit: true, testId: test._id });
                  }}
                  className="far fa-edit"
                ></i>
                <i
                  onClick={() => {
                    setTestDelete({ ...testDelete, testId: test._id });
                  }}
                  className="far fa-trash-alt"
                ></i>
                 &nbsp; &nbsp; <span>{test.grade}</span>
              </div>
              
            )}
            <hr />
          </div>
        );
      })}
      <AddGrade studentId={student._id} />
      <button className="btn" onClick={() => handleFnc()}>
        {hebrewVariables.closeBtn}
      </button>
    </div>
  );
};

export default EditGradeComponent;
