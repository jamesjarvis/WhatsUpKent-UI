import {
  Calendar, momentLocalizer, Event,
} from 'react-big-calendar';
import React, { useContext, useState } from 'react';
import moment from 'moment';
import Popover from '@material-ui/core/Popover';
import './Calendar.scss';
import FilterContext, { ActionType } from '../Contexts/FilterContext';
import { Filter, getSundayDate, getEndOfWeek } from '../../interface/utils';
import EventView from '../EventView/EventView';
import { MyEvent } from '../../interface/db-types';

const localiser = momentLocalizer(moment);

interface MyCalendarProps {
  eventList: Event[];
}

const MyCalendar: React.FC<MyCalendarProps> = ({ eventList }) => {
  const { filterState, dispatch } = useContext(FilterContext);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const handleClick = (event: React.SyntheticEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [selectedEvent, setSelectedEvent] = useState<MyEvent | null>(null);

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
        onSelectEvent={(event: MyEvent, e): void => {
          setSelectedEvent(event);
          handleClick(e);
        }}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <EventView event={selectedEvent} />
      </Popover>
    </div>
  );
};

export default MyCalendar;
