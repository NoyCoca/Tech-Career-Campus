import React from 'react'
import {
    Route,
    Switch
} from "react-router-dom";
import Forum from '../Components/Pages/Forum/ForumComponent'
import MyCourse from '../Components/Pages/MyCourse/MyCourseComponent';
import ClassSchedule from '../Components/Pages/ClassSchedule/ClassScheduleComponent';
import Home from '../Components/Pages/Home/HomeComponent';

const MainRouting = () =>{
    return(
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/forum" component={Forum} />
            <Route path="/my-course" component={MyCourse} />
            <Route path="/class-schedule" component={ClassSchedule} />
        </Switch>
    )
}

export default MainRouting;