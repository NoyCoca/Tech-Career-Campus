import React from 'react'
import CourseSchedule from '../Components/Pages/CourseSchedule/CourseScheduleComponent';

import StudentGradesComponent from '../Components/Pages/Grades/StudentGradesComponent'
import AdminGradesComponent from '../Components/Pages/Grades/AdminGradesComponent'
import Syllabus from '../Components/Pages/Syllabus/SyllabusComponent'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { useSelector } from 'react-redux';
import Students from '../Components/Pages/Sudents/StudentsComponent';
import CreatCourse from '../Components/Pages/CreatCourse/CreatCourseComponent';


const MyCourseRouting = () => {
    const user = useSelector(state => state.user)
    return (
        <>
            <Tabs
                defaultActiveKey="home"
                transition={false}
                id="noanim-tab-example"
                className="mb-3"

            >
                {/* nice to have

                <Tab eventKey="daily-schedule" title="לוז יומי">
                    <DailySchedule />
                </Tab> */}
                <Tab eventKey="course-schedule" title="לוז קורס"  >
                    <CourseSchedule />
                </Tab>
                <Tab eventKey="syllabus" title="סילבוס" >
                    <Syllabus />
                </Tab>
                {
                    user.role === "Staff" ?
                        <Tab eventKey="Student-grades" title="ציוני סטודנטים" >
                            <AdminGradesComponent />
                        </Tab>
                        :
                        <Tab eventKey="grades" title="הציונים שלי" >
                            <StudentGradesComponent />
                        </Tab>
                }
                {
                    user.role === "Staff" ? <Tab eventKey="Students" title="סטודנטים" >
                        <Students />
                    </Tab> : ""
                }
                {
                    user.role === "Staff" ? <Tab eventKey="Creat-course" title="יצירת קורס" >
                        <CreatCourse />
                    </Tab> : ""
                }



            </Tabs>
        </>
    )
}
export default MyCourseRouting;