import React from 'react';
import '../../styles/Calender.css';

import {Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, ViewsDirective, ViewDirective, DragAndDrop} from '@syncfusion/ej2-react-schedule';

function Calender(){
  const handleCalendarChange = (e)=>{
    
  }
  return (
    <ScheduleComponent currentView='Month' allowDragAndDrop = {true} enablePersistence={true} onChange={handleCalendarChange}>
      <ViewsDirective>
        <ViewDirective option='Day'></ViewDirective>
        <ViewDirective option='Month'></ViewDirective>
      </ViewsDirective>
      <Inject services={[Day, Week, WorkWeek, Month, Agenda, DragAndDrop]} />
    </ScheduleComponent>
    
  );
}
export default Calender;