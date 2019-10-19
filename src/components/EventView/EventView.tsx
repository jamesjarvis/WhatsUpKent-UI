import React from 'react';
import { MyEvent } from '../../interface/db-types';
import './EventView.scss';

interface EventViewProps {
  event: MyEvent | null;
}

const EventView: React.FC<EventViewProps> = ({ event }) => (
  <div className="eventHolder">
    <div className="eventSection">
      <div>
        T
      </div>
      <div>
        {event && event.title}
      </div>
    </div>
    <div className="eventSection">
      <div>
        L
      </div>
      <div>
        {event && event.location && event.location[0].id}
        {event && event.location && event.location[0].name}
      </div>
    </div>
    <div className="eventSection">
      <div>
        D
      </div>
      <div>
        {event && event.description}
      </div>
    </div>
  </div>
);

export default EventView;
