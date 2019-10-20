import React, { useState, useEffect, useContext } from 'react';
import MyCalendar from '../Calendar/Calendar';
import { getFilteredThisWeekExact } from '../../interface/api';
import FilterContext from '../Contexts/FilterContext';
import { MyEvent } from '../../interface/db-types';
import { intToARGB, hashCode } from '../../interface/utils';

/**
 * CalendarWrapper is a functional component which recieves the query filter
 * then retrieves that data from the database and passes it onto the calendar view
 */
const CalendarWrapper: React.FC = () => {
  const { filterState } = useContext(FilterContext);

  const [events, setEvents] = useState<MyEvent[]>([]);

  useEffect(() => {
    getFilteredThisWeekExact(filterState).then((result) => {
      if (result) {
        const tempEvents = new Array<MyEvent>();
        result.map((thing) => {
          // eslint-disable-next-line no-nested-ternary
          const tempColour = intToARGB(hashCode(thing.module ? thing.module[0].subject ? thing.module[0].subject : 'default' : 'default'));
          const tempEvent: MyEvent = {
            allDay: false,
            title: thing.title,
            description: thing.description,
            start: new Date(thing.startDate),
            end: new Date(thing.endDate),
            module: thing.module,
            location: thing.location,
            id: thing.id,
            colour: `#${tempColour}`,
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
