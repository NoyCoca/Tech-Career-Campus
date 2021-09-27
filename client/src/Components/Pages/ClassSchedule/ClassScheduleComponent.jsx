// import "./Class.css";
// import { WorkWeek, Month, Agenda, Inject, ScheduleComponent, Day, Week, ViewsDirective, ViewDirective } from "@syncfusion/ej2-react-schedule";
// import { loadCldr } from "@syncfusion/ej2-base";
// // import { useState, useMemo } from 'react';
// // import { useTable } from 'react-table';

// const ClassScheduleComponent = () => {
//  // const [myData, setMyData] = useState();

//  // useEffect(() => {
// //    fetchDailySchedule().then((response) => setMyData(response));
//  // }, []);

//   loadCldr(
//     require("cldr-data/main/he/ca-gregorian.json"),
//     require("cldr-data/main/he/numbers.json"),
//     require("cldr-data/main/he/timeZoneNames.json")
//   );


//   return (
//     <div className="BodyClass">
//       <div id="schedule">
//         <ScheduleComponent
//           locale="he"
//           height="500px"
//           enableRtl={true}
//           firstDayOfWorkWeek={0}
//         >
//           <ViewsDirective>
//             <ViewDirective option='Day' displayName="היום" />
//             <ViewDirective option='Week' displayName="שבוע" />
//             <ViewDirective option='WorkWeek' displayName="שבוע עבודה" />
//             <ViewDirective option='Month' displayName="חודש" />
//           </ViewsDirective>
//           <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
//         </ScheduleComponent>
//       </div>
//     </div>
//   );
// };
// export default ClassScheduleComponent;


// // const ClassScheduleComponent = () => {
// //   const [isTaken, setIsTaken] = useState(false);
// //   const [className, setClassName] = useState("פיתוח");

// //   const data = useMemo(
// //     () => [
// //       {
// //         col1: '8-10',
// //         col2: isTaken,
// //         col3: ''
// //       },
// //       {
// //         col1: '10-12',
// //         col2: isTaken ,
// //       },
// //       {
// //         col1: '12-14',
// //         col2: isTaken,
// //       },
// //       {
// //         col1: '14-16',
// //         col2: isTaken ,
// //       },
// //       {
// //         col1: '16-18',
// //         col2: isTaken ,
// //       },
// //       {
// //         col1: '18-20',
// //         col2: isTaken ,
// //       },
// //       {
// //         col1: '20-22',
// //         col2: isTaken ,
// //       },
// //     ],
// //     []
// //   )

// //   const columns = useMemo(
// //     () => [
// //       {
// //         Header: 'שעות',
// //         accessor: 'col1', // accessor is the "key" in the data
// //         id:1
// //       },
// //       {
// //         Header: 'ראשון',
// //         // accessor: 'col1', // accessor is the "key" in the data
// //       },
// //       {
// //         Header: 'שני',
// //         // accessor: 'col2',
// //       },
// //       {
// //         Header: 'שלישי',
// //         // accessor: 'col3', // accessor is the "key" in the data
// //       },
// //       {
// //         Header: 'רביעי',
// //         // accessor: 'col1', // accessor is the "key" in the data
// //       },
// //       {
// //         Header: 'חמישי',
// //         // accessor: 'col2', // accessor is the "key" in the data
// //       },
// //     ],
// //     []
// //   )

// //   const {
// //     getTableProps,
// //     getTableBodyProps,
// //     headerGroups,
// //     rows,
// //     prepareRow,
// //   } = useTable({ columns, data })

// //   const onOrOff = () => {
// //     console.log(columns);
// //     setIsTaken(
// //       isTaken ? false : true
// //     )
// //     }
// //     return (

// //       <div>
// //         <table {...getTableProps()} style={{ border: 'solid 1px black' }}>
// //           <thead>
// //             {headerGroups.map(headerGroup => (
// //               <tr {...headerGroup.getHeaderGroupProps()}>
// //                 {headerGroup.headers.map(column => (
// //                   <th
// //                     {...column.getHeaderProps()}
// //                     style={{
// //                       borderBottom: 'solid 3px red',
// //                       color: 'black',
// //                     }}
// //                   >
// //                     {column.render('Header')}
// //                   </th>
// //                 ))}
// //               </tr>
// //             ))}
// //           </thead>
// //           <tbody {...getTableBodyProps()}>
// //             {rows.map(row => {
// //               prepareRow(row)
// //               return (
// //                 <tr {...row.getRowProps()}>
// //                   {row.cells.map(cell => {

// //                     return (
// //                       <td 
// //                         {...cell.getCellProps()}
// //                         style={{
// //                           padding: '20px',
// //                           border: 'solid 1px gray',
// //                         }}
// //                       >

// //                         <input onClick={onOrOff} style={{ width: '30px', height: '20px', backgroundColor:isTaken?"red":"green",display: {...columns[0].Header === 'שעות'?'none':'block'} }}/>
// //                         :

// //                         {cell.render('Cell')}
// //                       </td>
// //                     )
// //                   })}
// //                 </tr>
// //               )
// //             })}
// //           </tbody>
// //         </table >
// //       </div >
// //     );

// //   }
// //   export default ClassScheduleComponent;
