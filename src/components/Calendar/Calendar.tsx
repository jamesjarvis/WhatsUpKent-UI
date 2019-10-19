import {
  Calendar, momentLocalizer, Event, stringOrDate,
} from 'react-big-calendar';
import React, { useContext } from 'react';
import moment from 'moment';
// import {Event} from './interface/db-types'
import './Calendar.scss';
import FilterContext, { ActionType } from '../Contexts/FilterContext';
import { Filter, getSundayDate, getEndOfWeek } from '../../interface/utils';

const localiser = momentLocalizer(moment);

interface MyCalendarProps {
  eventList: Event[];
}

const MyCalendar: React.FC<MyCalendarProps> = ({ eventList }) => {
  const { filterState, dispatch } = useContext(FilterContext);

  const currentDate = new Date(Date.now());
  const am = new Date(Date.now());
  am.setMinutes(0);
  am.setSeconds(0);
  am.setHours(7);
  const pm = new Date(am);
  pm.setHours(22);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dateChange = (range: any): void => {
    const temp: Filter = {
      startDate: filterState.startDate,
      endDate: filterState.endDate,
      subjects: filterState.subjects,
      eventTypes: filterState.eventTypes,
    };

    if (range.length) {
      // IF is a list of the week dates
      if (range.length === 7) {
        // eslint-disable-next-line prefer-destructuring
        temp.startDate = range[0];
        // eslint-disable-next-line prefer-destructuring
        temp.endDate = range[6];
        temp.endDate.setHours(5);
      } else { // IF it is a list of the current day
        const date = range[0];
        if (date < temp.startDate || date > temp.endDate) {
          temp.startDate = getSundayDate(date);
          temp.endDate = getEndOfWeek(date);
        }
      }
    } else { // IF it is a range object
      temp.startDate = range.start;
      temp.endDate = range.end;
      temp.endDate.setHours(5);
    }

    if (temp.startDate !== filterState.startDate && temp.endDate !== filterState.endDate) {
      dispatch({ type: ActionType.UPDATE, payload: temp });
    }
  };

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
        onRangeChange={dateChange}
      />
    </div>
  );
};

export default MyCalendar;
