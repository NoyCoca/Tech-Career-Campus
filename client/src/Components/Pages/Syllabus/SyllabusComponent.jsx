import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getSyllabus,
  updateSyllabus,
  updateSubSubject,
} from "../../../Redux/actions/SyllabusAction";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { hebrewVariables } from "../../../utils/hebrewVariables";
import SchoolIcon from "@material-ui/icons/School";


const SyllabusComponent = () => {
  const syllabus = useSelector((state) => state.syllabus);
  const course = useSelector((state) => state.course);
  const [isClicked, setIsClicked] = useState(false);
  const [courseId, setcourseId] = useState("");
  const [topicSubject, setTopicSubject] = useState("");
  const [newSyllabus, setNewSyllabus] = useState({});
  const [subSubject, setsubSubject] = useState({});
  const HandleChange = (e, subjectId) => {
    setNewSyllabus({
      ...newSyllabus,
      _id: courseId,
      name: e.target.name,
      value: e.target.value,
      SubjectId: subjectId,
    });
  };
  const HandleTopicChange = (e, subjectId, array, array_id) => {
    setsubSubject({
      ...subSubject,
      _id: courseId,
      courseInformationId: subjectId,
      array,
      array_id: array_id,
      arrayField: e.target.name,
      newValue: e.target.value,
    });
  };

  const dispatch = useDispatch();
  useEffect(() => dispatch(getSyllabus(course)), [dispatch, course]);
  useEffect(() => {
    setcourseId(syllabus._id);
  }, [HandleChange, HandleTopicChange]);
  return (
   
        <div>
          <h1>{syllabus.name}</h1>

          <VerticalTimeline>
            {syllabus?.CourseInformation?.map((courseItem, index) => {
              return (
                  <VerticalTimelineElement
                  key={index}
                    contentStyle={{
                      background: "transparent",
                      color: "#fff",
                      padding: "0"
                    }}
                    contentArrowStyle={{
                      borderRight: "7px solid  rgb(0, 0, 0)",
                    }} 
                    icon={<SchoolIcon/>}
                    iconStyle={{
                      background: "rgb(210, 235, 255)",
                      color: "#000000",
                    }}
                   position={index % 2 === 0 ? "right" : "left "}
                  
                  >
                    <Paper elevation={6} style={{ backgroundColor: "#f1f1f1" }}>
                      <Typography variant="h6" component="h1">
                        <h2>{courseItem.nameSubject}</h2>

                        <button
                          className="btn"
                          onClick={(e) => {
                            setIsClicked(true);
                          }}
                        >
                          {hebrewVariables.edit}
                        </button>
                        {isClicked ? (
                          <div>
                            <input
                              placeholder={courseItem.nameSubject}
                              name="nameSubject"
                              type="text"
                              onChange={(e) => HandleChange(e, courseItem._id)}
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                setIsClicked(false);
                                dispatch(updateSyllabus(newSyllabus, e));
                              }}
                              className="btn"
                            >
                              {hebrewVariables.addChanges}
                            </button>
                          </div>
                        ) : null}
                      </Typography>
                      <Typography style={{ padding: "20px" }} sx={{ m: 3 }}>
                        <h4>
                          <ul style={{ listStyleType: "none" }}>
                            {courseItem.topics.map((topic, index) => {
                              return (
                                <div>
                                  <li key={topic._id}>{topic.subject} </li>
                                  {isClicked ? (
                                    <div>
                                      <label
                                        htmlFor=""
                                        style={{ display: "inline" }}
                                      >
                                        {` ${++index}`}
                                      </label>
                                      <input
                                        key={topic._id}
                                        name="subject"
                                        type="text"
                                        placeholder={topic.subject}
                                        onChange={(e) =>
                                          HandleTopicChange(
                                            e,
                                            courseItem._id,
                                            "topics",
                                            topic._id
                                          )
                                        }
                                      />
                                      <button
                                        type="button"
                                        value={topic._id}
                                        onClick={() => {
                                          setIsClicked(false);
                                          dispatch(
                                            updateSubSubject(subSubject)
                                          );
                                        }}
                                        className="btn"
                                      >
                                        {hebrewVariables.addChanges}
                                      </button>
                                    </div>
                                  ) : null}
                                </div>
                              );
                            })}
                          </ul>
                        </h4>
                        <p>{courseItem.summery}</p>

                        <ul style={{ listStyleType: "none" }}>
                          <h3>Links:</h3>
                          {courseItem.links.map((link) => {
                            return (
                              <>
                                <li>
                                  {" "}
                                  <a href={link.tasks}>Google Drive</a>{" "}
                                </li>
                                <li>
                                  {" "}
                                  <a href={link.Presentations}>
                                    Presentation
                                  </a>{" "}
                                </li>
                              </>
                            );
                          })}
                        </ul>
                      </Typography>
                    </Paper>
                  </VerticalTimelineElement>
              );
            })}
          </VerticalTimeline>
        </div>
     
      )
   
};
export default SyllabusComponent;
