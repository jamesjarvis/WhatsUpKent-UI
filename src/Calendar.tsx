import {Calendar, momentLocalizer, Event} from 'react-big-calendar';
import React from 'react';
import moment from 'moment';
// import {Event} from './interface/db-types'
import "react-big-calendar/lib/css/react-big-calendar.css";

const localiser = momentLocalizer(moment)

export const MyCalendar = (props: {eventList: Array<Event>}) => {
  console.log(props.eventList)
  return (<div>
    <Calendar 
      events={props.eventList}
      localizer={localiser}
      startAccessor="start"
      endAccessor="end"
    />
  </div>);
}