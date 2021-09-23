import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageHeader from "../../Features/PageHeader/PageHeaderComponent";
import { hebrewVariables } from "../../../utils/hebrewVariables";
import SelectCourseSubjects from "../../Features/SelectCourseSubjects/SelectCourseSubjectsComponent";
import CreateNewSubject from "../../Features/CreateNewSubject/CreateNewSubjectComponent";
import { createCourse } from "../../../Redux/actions/coursesActions";


const CreatCourse = () => {
  const [corseType, setCourseType] = useState();
  const [newCourse, setNewCourse] = useState();
  const [newSubjectForm, setNewSubjectForm] = useState(false);
  const [courseInformation, setCourseInformation] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { errors } = useSelector((state) => state.courses);
  const { courses } = useSelector((state) => state.courses);
  const [createCourseErrors, setCreateCourseErrors] = useState(true);

  useEffect(() => {
    if (newCourse?.CourseInformation) {
      dispatch(createCourse(newCourse));
    }
  }, [newCourse]);

  useEffect(() => {
    if (newCourse?.CourseInformation) setCreateCourseErrors(false);
  }, [courses]);

  return (
    <div>
      <PageHeader title={hebrewVariables.createCourse} />
      {createCourseErrors ? (
        <>
          <form>
            <label>{hebrewVariables.courseName}</label>
            <input
              type={"text"}
              onChange={(e) =>
                setNewCourse({
                  ...newCourse,
                  name: e.target.value,
                  id: user._id,
                })
              }
            />
            {errors?.name ? "שם הקורס הינו שדה חובה" : ""}
            <label>{hebrewVariables.courseType}</label>
            {errors?.courseType ? "סוג הקורס הינו שדה חובה" : ""}

            <select
              onChange={(e) => {
                setCourseType(e.target.value);
                setNewCourse({ ...newCourse, courseType: e.target.value });
              }}
            >
              <option></option>
              <option value={hebrewVariables.developer}>
                {hebrewVariables.developer}
              </option>
              <option value={hebrewVariables.devNetEngineers}>
                {hebrewVariables.devNetEngineers}
              </option>
              <option value={hebrewVariables.SOCAnalyst}>
                {hebrewVariables.SOCAnalyst}
              </option>
            </select>
          </form>
          <button
            onClick={() => setNewSubjectForm(newSubjectForm ? false : true)}
          >
            {hebrewVariables.createNewSubject}
          </button>
          {newSubjectForm ? (
            <CreateNewSubject
              courseInformation={courseInformation}
              setCourseInformation={setCourseInformation}
              setNewSubjectForm={setNewSubjectForm}
            />
          ) : (
            ""
          )}

          <SelectCourseSubjects
            corseType={corseType}
            setCourseInformation={setCourseInformation}
            courseInformation={courseInformation}
          />
          <button
            onClick={() =>
              setNewCourse({
                ...newCourse,
                CourseInformation: courseInformation,
              })
            }
          >
            {hebrewVariables.createCourse}
          </button>
        </>
      ) : (
        <div>
          <p>נוצר בהצלחה. {newCourse.name}</p>
          <button
            onClick={() => {
              setCreateCourseErrors(true);
              setNewCourse();
              setCourseType();
            }}
          >
            {hebrewVariables.createCourse}
          </button>
        </div>
      )}
    </div>
  );
};
export default CreatCourse;
