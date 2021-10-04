import React from 'react'
import {
    Route,
    Switch
} from "react-router-dom";
import Forum from '../Components/Pages/Forum/ForumComponent'
import MyCourse from '../Components/Pages/MyCourse/MyCourseComponent';
import ClassSchedule from '../Components/Pages/ClassSchedule/ClassScheduleComponent';
import Home from '../Components/Pages/Home/HomeComponent';
import PostDetails from '../Components/Pages/Forum/ForumComponents/PostDetails/PostDetails';
import PageNotFound from '../Components/Pages/404-Page/PageNotFound';
import CreatCourse from '../Components/Pages/CreatCourse/CreatCourseComponent'

const MainRouting = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/forum/:id" component={PostDetails} />
            <Route path="/forum" component={Forum} />
            <Route path="/my-course" component={MyCourse} />
            <Route path="/class-schedule" component={ClassSchedule} />
            <Route path="/creatCourse" component={CreatCourse} />
            <Route component={PageNotFound} />
        </Switch>
    )
}

export default MainRouting;