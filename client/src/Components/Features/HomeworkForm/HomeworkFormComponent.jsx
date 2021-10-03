import { useEffect, useState } from "react";
import "./HomeworkFrom.css";
import { useDispatch } from "react-redux";
import {
  createHomework,
  editHomework,
} from "../../../Redux/actions/homeworkActions";
import handleChange from "../../../utils/handleChange";
import { hebrewVariables } from "../../../utils/hebrewVariables";
import homeworkValidator from "./homeworkValidator";


const HomeworkFrom = ({
  state,
  setState,
  type,
  setIsCreateHomework,
  setIsEditHomework,
}) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (errors.isValid) {
      if (type === "edit") {
        dispatch(editHomework(state));
        setIsEditHomework(false);
      }
      if (type === "create") {
        dispatch(createHomework(state));
        setIsCreateHomework(false);
      }
      setState({
        ...state,
        subject: "",
        description: "",
      });
    }
  }, [errors]);

  return (

    <div className="body-from">
      <div className="create-from">
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
      <label>{hebrewVariables.subject}</label>
      <label>{errors.errors ? errors.errors?.subject : ""}</label>
      <input
        name={"subject"}
        value={state.subject}
        type="text"
        onChange={(e) => handleChange(e, state, setState)}
      />
      </div>
      <div>
      <label>{hebrewVariables.description}</label>
      <label>{errors.errors ? errors.errors?.description : ""}</label>
      <textarea
        name={"description"}
        value={state.description}
        type="text"
        onChange={(e) => handleChange(e, state, setState)}
      />
      </div>
      <div >
      <button className="btn"
        onClick={() => {
          setErrors(homeworkValidator(state));
        }}
      >
        {type === "edit" ? hebrewVariables.update : hebrewVariables.addHomework}
      </button>
      </div>
    </form>
    </div>
    </div>
  );
};

export default HomeworkFrom;
