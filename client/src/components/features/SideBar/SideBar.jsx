import { Link } from "react-router-dom";
const SideBar = ({children})=>{
    return (
      <div>
        <Link to={"/daily-schedule"}>לו"ז יומי</Link>
        <Link to={"/grades"}>הציונים שלי</Link>
        <Link to={"/syllabus"}>סילבוס</Link>
        {children}
        
      </div>
    );
}

export default SideBar;