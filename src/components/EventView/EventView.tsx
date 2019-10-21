import React, { Fragment } from 'react';
import SubjectOutlinedIcon from '@material-ui/icons/SubjectOutlined';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import EventOutlinedIcon from '@material-ui/icons/EventOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Link from '@material-ui/core/Link';
import { MyEvent } from '../../interface/db-types';
import { formatDateRangeString } from '../../interface/utils';
import './EventView.scss';

interface EventViewProps {
  event: MyEvent | null;
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

const EventView: React.FC<EventViewProps> = ({ event }) => (
  <div className="eventHolder">
    <div className="eventSection">
      <div className="eventSectionIcon">
        <InfoOutlinedIcon fontSize="small" />
      </div>
      <div className="eventSectionDeepdive">
        <span className="bold1">
          {event && event.title}
        </span>
        <span className="quiet1">
          {event && event.module && event.module[0].name}
        </span>
        <span className="quiet2">
          {event && event.module && event.module[0].subject}
        </span>
      </div>
    </div>
    <div className="eventSection">
      <div className="eventSectionIcon">
        <EventOutlinedIcon fontSize="small" />
      </div>
      <div className="eventSectionDeepdive">
        <span className="quiet1">
          {event && formatDateRangeString(event.start, event.end)}
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
            href={`http://www.kent.ac.uk/timetabling/rooms/room.html?room=${event && event.location && event.location[0].id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {event && event.location && event.location[0].id}
          </Link>
        </span>
        <span className="quiet2">
          {event && event.location && event.location[0].name}
        </span>
      </div>
    </div>
    <div className="eventSection">
      <div className="eventSectionIcon">
        <SubjectOutlinedIcon fontSize="small" />
      </div>
      <div className="eventSectionDeepdive">
        <div>
          {event && newlineToBreak(event.description)}
        </div>
      </div>
    </div>
  </div>
);

export default EventView;
