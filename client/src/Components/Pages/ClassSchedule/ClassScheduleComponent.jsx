import "./Class.css";
import { useState, useEffect } from "react";
import {
  WorkWeek,
  Month,
  Agenda,
  Inject,
  ScheduleComponent,
  Day,
  Week,
  ViewsDirective,
  Resize,
  ViewDirective,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";
import { loadCldr } from "@syncfusion/ej2-base";
import { DataManager,UrlAdaptor} from "@syncfusion/ej2-data";
import { useSelector } from "react-redux";


const ClassScheduleComponent = () => {
  const course = useSelector((state) => state.course);
  const  [saveChe, setSaveChe] = useState(false)
  const token = localStorage.getItem("jwtToken");
  
  const dataManager = new DataManager({
    url:"http://localhost:8080/api/classSchedule",
    crudUrl:"http://localhost:8080/api/classSchedule/update",
    crossDomain: true,
    adaptor: new UrlAdaptor(),
    headers: [{ 'Authorization': `Bearer ${token}`}] 
  })
 
  loadCldr(
    require("cldr-data/main/he/ca-gregorian.json"),
    require("cldr-data/main/he/numbers.json"),
    require("cldr-data/main/he/timeZoneNames.json")
  );
  

  return (
    <div className="BodyClass">
      <div id="schedule">
        <ScheduleComponent
        dateFormat={"yyyy/MM/dd"} 
        
          locale="he"
          height="500px"
          width="800px"
          selectedDate={new Date()}
          eventSettings={{ dataSource: dataManager }}
          enableRtl={true}
          firstDayOfWorkWeek={0}
        >
          <ViewsDirective>
            <ViewDirective option="Day" displayName="היום" />
            <ViewDirective option="Week" displayName="שבוע" />
            <ViewDirective option="WorkWeek" displayName="שבוע עבודה" />
            <ViewDirective option="Month" displayName="חודש" />
          </ViewsDirective>
          <Inject
            services={[Day, Week, WorkWeek, Month, Agenda, DragAndDrop, Resize]}
          />
        </ScheduleComponent>
        <button type="button" onClick={()=>{setSaveChe(saveChe? false:true)}}>עדכן שינוים</button>
      </div>
    </div>

    
  );
};
export default ClassScheduleComponent;
