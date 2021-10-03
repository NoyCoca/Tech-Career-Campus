import { useEffect, useState } from "react";
import fetcher from "../../../utils/fetcher";
import "./selectCourse.css";

const SelectCourseSubjects = ({
  corseType,
  courseInformation,
  setCourseInformation,
}) => {
  const [courseOptions, setCourseOptions] = useState([]);
  const [subjectOpen, setSubjectOpen] = useState();
  const [topics, setTopics] = useState([]);
  const [subject, setSubject] = useState({});
  const [inputValue, setInputValue] = useState();
  const [isMarked, setisMarked] = useState(false);

  useEffect(() => {
    fetcher(`/api/course/search?term=${corseType}`).then(
      (response) =>
        setCourseOptions(response ? response[0]?.CourseInformation : [])
    );
  }, [corseType]);

  useEffect(() => {
    if (subject?.topics) setCourseInformation([...courseInformation, subject]);
  }, [subject]);

  return (
    <div className='select-course-form'>
      {courseOptions?.map((option) => (
        <>
          <h3>{option.nameSubject}</h3>
          <p>{option.summery}</p>
          <button onClick={() => setSubjectOpen(option._id)}>
            בחר תתי נושאים
          </button>
          {subjectOpen === option._id ? (
            <form
              onSubmit={(e) => e.preventDefault()}
            >
              {option?.topics?.map((topic) => (
                <>
                  <label>
                    <input
                      type="checkbox"
                      id="vehicle1"
                      name="subject"
                      value={topic.subject}
                      onClick={() => {
                        setisMarked(isMarked ? false : true)
                      }}
                      onChange={(e) =>

                        isMarked && topics._id != topic._id ? "" :
                          setTopics([
                            ...topics,
                            { [e.target.name]: e.target.value },
                          ])
                      }
                    />
                    {topic.subject}
                  </label>
                </>
              ))}
              {topics.map((topic) => (
                <label>{topic.subject}</label>
              ))}
              <label>תת נושא</label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />

              <button
                onClick={() => {
                  setTopics([...topics, { subject: inputValue }]);
                  setInputValue("");
                }}
              >
                הוסף
              </button>

              <button
                onClick={() => {
                  setSubject({
                    nameSubject: option.nameSubject,
                    topics: topics,
                    summery: option.summery,
                  });
                  setTopics([]);
                }}
              >
                הוסף נושא
              </button>
            </form>
          ) : (
            ""
          )}
        </>
      ))}
    </div>
  );
};

export default SelectCourseSubjects;
