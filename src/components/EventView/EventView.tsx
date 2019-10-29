import React, { Fragment } from 'react';
import SubjectOutlinedIcon from '@material-ui/icons/SubjectOutlined';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import EventOutlinedIcon from '@material-ui/icons/EventOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Link from '@material-ui/core/Link';
import AddToCalendar, { AddToCalendarEvent } from 'react-add-to-calendar';
import { MyEvent } from '../../interface/db-types';
import { formatDateRangeString } from '../../interface/utils';
import './EventView.scss';
import 'react-add-to-calendar/dist/react-add-to-calendar.css';

interface EventViewProps {
  event: MyEvent;
}

function newlineToBreak(s: string | undefined): JSX.Element[] {
  if (s) {
    return s.split('\\n').map((value, index) => {
      const rand = Math.random() * 100 * index;
      return (
        <Fragment key={rand}>
          {value}
          <br />
        </Fragment>
      );
    });
  }
  return [];
}

const EventView: React.FC<EventViewProps> = ({ event }) => {
  const calEvent: AddToCalendarEvent = {
    title: event.title,
    description: event.description,
    startTime: event.start,
    endTime: event.end,
    location: event.location && event.location[0].id,
  };

  return (
    <div className="eventHolder">
      <div className="eventSection">
        <div className="eventSectionIcon">
          <InfoOutlinedIcon fontSize="small" />
        </div>
        <div className="eventSectionDeepdive">
          <span className="bold1">
            {event.title}
          </span>
          <span className="quiet1">
            {event.module && event.module[0].name}
          </span>
          <span className="quiet2">
            {event.module && event.module[0].subject}
          </span>
        </div>
      </div>
      <div className="eventSection">
        <div className="eventSectionIcon">
          <EventOutlinedIcon fontSize="small" />
        </div>
        <div className="eventSectionDeepdive">
          <span className="quiet1">
            {formatDateRangeString(event.start, event.end)}
          </span>
          <span>
            <AddToCalendar
              buttonLabel="Add to Calendar"
              event={calEvent}
              listItems={[{ apple: 'Apple Calendar' }, { google: 'Google' }, { outlook: 'Outlook' }, { outlookcom: 'Outlook.com' }]}
            />
          </span>
        </div>
      </div>
      <div className="eventSection">
        <div className="eventSectionIcon">
          <RoomOutlinedIcon fontSize="small" />
        </div>
        <div className="eventSectionDeepdive">
          <span className="quiet1">
            <Link
              href={`http://www.kent.ac.uk/timetabling/rooms/room.html?room=${event.location && event.location[0].id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {event.location && event.location[0].id}
            </Link>
          </span>
          <span className="quiet2">
            {event.location && event.location[0].name}
          </span>
        </div>
      </div>
      <div className="eventSection">
        <div className="eventSectionIcon">
          <SubjectOutlinedIcon fontSize="small" />
        </div>
        <div className="eventSectionDeepdive">
          <div>
            {newlineToBreak(event.description)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventView;
