import React from 'react'

const CourseSchedule = ()=>{
  return (
    <div>
      <iframe
        title={"Course schedule"}
        src="https://calendar.google.com/calendar/embed?src=104sovb0e3cdrk1rplkap2b91g%40group.calendar.google.com&ctz=Asia%2FJerusalem"
        style={{ border: " 0" }}
        fontSize="12"
        width="300"
        height="300"
        frameBorder="1"
        scrolling="yes"
      ></iframe>
    </div>
  );
}
export default CourseSchedule
