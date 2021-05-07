import React from 'react';
import '../../styles/Calender.css';

import {Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule';

function Calender(){
  return (
    <ScheduleComponent currentView='Month' >
      <ViewsDirective>
        <ViewDirective option='Day'></ViewDirective>
        <ViewDirective option='Month'></ViewDirective>
      </ViewsDirective>
      <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
    </ScheduleComponent>
    
  );
}
export default Calender;