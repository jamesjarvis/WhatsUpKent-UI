import React, { useState, useEffect, useContext } from 'react';
import { Event } from 'react-big-calendar';
import MyCalendar from '../Calendar/Calendar';
import { getAllThisWeek } from '../../interface/api';
import FilterContext from '../Contexts/FilterContext';


/**
 * CalendarWrapper is a functional component which recieves the query filter
 * then retrieves that data from the database and passes it onto the calendar view
 */
const CalendarWrapper: React.FC = () => {
  const { filterState, dispatch } = useContext(FilterContext);

  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    getAllThisWeek(new Date()).then((result) => {
      if (result) {
        const tempEvents = new Array<Event>();
        result.map((thing) => {
          const tempEvent: Event = {
            allDay: false,
            title: thing.title,
            start: new Date(thing.startDate),
            end: new Date(thing.endDate),
          };
          tempEvents.push(tempEvent);
          return result;
        });
        setEvents(tempEvents);
      }
    });
  }, [filterState]);

  return (
    <>
      <MyCalendar eventList={events} />
    </>
  );
};

export default CalendarWrapper;
