import { useState } from "react";

const CreateNewSubject = ({
  setCourseInformation,
  courseInformation,
  setNewSubjectForm,
}) => {
  const [newSubject, setNewSubject] = useState({
    nameSubject: "",
    topics: [],
    summery: "",
  });
  const [inputValue, setInputValue] = useState();
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label>שם הנושא</label>
      <input
        type="text"
        onChange={(e) =>
          setNewSubject({ ...newSubject, nameSubject: e.target.value })
        }
      />
      <label>תקציר</label>
      <input
        type="text"
        onChange={(e) =>
          setNewSubject({ ...newSubject, summery: e.target.value })
        }
      />
      <label>תת נושא</label>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        onClick={() => {
          setNewSubject({
            ...newSubject,
            topics: [...newSubject.topics, { subject: inputValue }],
          });
          setInputValue("");
        }}
      >
        הוסף תת נושא
      </button>
      <label>שם הנושא {newSubject.nameSubject  } </label>
      <label>תתי נושאים</label>
      {newSubject.topics.map((topic) => (
        <label>{topic.subject}</label>
      ))}
      <button
        onClick={() => {
          setNewSubjectForm(false);
          setCourseInformation([...courseInformation, newSubject]);
        }}
      >
        הוסף נושא
      </button>
    </form>
  );
};

export default CreateNewSubject;
