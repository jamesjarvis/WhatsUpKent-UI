import React, { useEffect, useState } from 'react';
// import {DBEvent} from './interface/db-types';
import { Event } from 'react-big-calendar';
import './App.scss';
import MyCalendar from './components/Calendar/Calendar';
import { getAllThisWeek } from './interface/api';


const App: React.FC = () => {
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
  }, []);

  return (
    <div className="App">
      <MyCalendar eventList={events} />
    </div>
  );
};

export default App;
