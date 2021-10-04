import moment from "moment";
import { useState } from "react";
import "./HomeworkCard.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteHomework } from "../../../Redux/actions/homeworkActions";
import { hebrewVariables } from "../../../utils/hebrewVariables";

const HomeworkCard = ({
  work,
  setIsEditHomework,
  isEditHomework,
  setUpdateHomework,
}) => {

  const [isDelete, setIsDelete] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div className="body-card-work">
      <div className="info-cardwork">

      <h2>{work.subject}</h2>
      <h4>{work.description}</h4>
      <p>{moment(work.createdAt).calendar()}</p>
      </div>
      {user.role === "Staff" ? (
        <div className="btn-card">
          <div>
          <button className="btn"
            onClick={() => {
              setIsEditHomework(isEditHomework ? false : true);
              setUpdateHomework({...work});
            }}
          >
            {hebrewVariables.edit}
          </button>
          <button className="btn" onClick={() =>{setIsDelete(isDelete ? false : true); dispatch(deleteHomework(work._id))}}>
            {hebrewVariables.delete}
          </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default HomeworkCard;
