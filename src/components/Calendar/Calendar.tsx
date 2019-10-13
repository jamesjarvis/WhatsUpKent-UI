import { Calendar, momentLocalizer, Event } from 'react-big-calendar';
import React from 'react';
import moment from 'moment';
// import {Event} from './interface/db-types'
import './Calendar.scss';

const localiser = momentLocalizer(moment);

interface MyCalendarProps {
  eventList: Event[];
}

const MyCalendar: React.FC<MyCalendarProps> = ({ eventList }) => {
  const currentDate = new Date(Date.now());
  const am = new Date(Date.now());
  am.setMinutes(0);
  am.setSeconds(0);
  am.setHours(7);
  const pm = new Date(am);
  pm.setHours(22);
  return (
    <div className="calendarContainer">
      <Calendar
        events={eventList}
        localizer={localiser}
        startAccessor="start"
        endAccessor="end"
        views={
          ['week', 'day', 'agenda']
        }
        defaultView="week"
        scrollToTime={currentDate}
        min={am}
        max={pm}
      />
    </div>
  );
};

export default MyCalendar;
