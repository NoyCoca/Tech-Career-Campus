import "./Class.css";
import {WorkWeek,Month,Agenda,Inject,ScheduleComponent,Day,Week,ViewsDirective,ViewDirective} from "@syncfusion/ej2-react-schedule";
import { loadCldr} from "@syncfusion/ej2-base";


const ClassScheduleComponent = () => {
  // const [myData, setMyData] = useState();

  // useEffect(() => {
  //   fetchDailySchedule().then((response) => setMyData(response));
  // }, []);

  loadCldr(
    require("cldr-data/main/he/ca-gregorian.json"),
    require("cldr-data/main/he/numbers.json"),
    require("cldr-data/main/he/timeZoneNames.json")
  );
 

  return (
    <div className="BodyClass">
    <div id="schedule">
      <ScheduleComponent
        locale="he"
        height="500px"
        width="800px"
        enableRtl={true} 
        firstDayOfWorkWeek={0}
      >
            <ViewsDirective>
            <ViewDirective option='Day' displayName="היום"/>
            <ViewDirective option='Week' displayName="שבוע"/>
            <ViewDirective option='WorkWeek' displayName="שבוע עבודה"/>
            <ViewDirective option='Month' displayName="חודש"/>
    </ViewsDirective>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    </div>
    </div>
  );
};
export default ClassScheduleComponent;
