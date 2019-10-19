import React from 'react';
import { MyEvent } from '../../interface/db-types';
import { formatDateRangeString } from '../../interface/utils';
import './EventView.scss';

interface EventViewProps {
  event: MyEvent | null;
}

const EventView: React.FC<EventViewProps> = ({ event }) => (
  <div className="eventHolder">
    <div className="eventSection">
      <div className="eventSectionIcon">
        T:
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
        W:
      </div>
      <div className="eventSectionDeepdive">
        <span className="quiet1">
          {event && formatDateRangeString(event.start, event.end)}
        </span>
      </div>
    </div>
    <div className="eventSection">
      <div className="eventSectionIcon">
        L:
      </div>
      <div className="eventSectionDeepdive">
        <span className="quiet1">
          {event && event.location && event.location[0].id}
        </span>
        <span className="quiet2">
          {event && event.location && event.location[0].name}
        </span>
      </div>
    </div>
    <div className="eventSection">
      <div className="eventSectionIcon">
        D:
      </div>
      <div className="eventSectionDeepdive">
        <span>
          {event && event.description}
        </span>
      </div>
    </div>
  </div>
);

export default EventView;
