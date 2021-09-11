import React, { useEffect } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useSelector, useDispatch } from "react-redux";
import { getSyllabus } from "../../../Redux/actions/SyllabusAction";
import fetcher from "../../../utils/fetcher";

const SyllabusComponent = () => {
  const syllabus = useSelector((state) => state.syllabus.state);
  const dispatch = useDispatch();
  useEffect(() => {
    fetcher("/api/course")
    .then((data) => {
      dispatch(getSyllabus(data?.data[1]));
    });
  }, []);
  return (
    <>
      <VerticalTimeline>
        <h1>{syllabus?.name}</h1>
        {syllabus?.CourseInformation.map((courseItem) => {
          return (
            <VerticalTimelineElement
              key={courseItem.nameSubject}
              className="vertical-timeline-element--work"
              contentStyle={{
                background: "rgba(255, 99, 38, 0.9)",
                color: "#fff",
              }}
              contentArrowStyle={{
                borderRight: "7px solid  rgba(255, 99, 38, 0.9)",
              }}
              date="2011 - present"
              iconStyle={{
                background: "rgba(255, 99, 38, 0.9)",
                color: "rgba(255, 99, 38, 0.9)",
              }}
            >
              <h2 className="vertical-timeline-element-title">
                {courseItem.nameSubject}
              </h2>
              <h4 className="vertical-timeline-element-subtitle">
                <ul>
                  {courseItem.topics.map((topic, index) => {
                    return <li key={index}>{topic.subject}</li>;
                  })}
                </ul>
              </h4>
              <p>{courseItem.summery}</p>
              <ul>
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
                        <a href={link.Presentations}>Presentation</a>{" "}
                      </li>
                    </>
                  );
                })}
              </ul>
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
      ;
    </>
  )
};
export default SyllabusComponent;