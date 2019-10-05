import React, {useState, useEffect} from 'react';
import './App.scss';
import {getAllThisWeek} from './interface/api';
import {MyCalendar} from './Calendar';
// import {DBEvent} from './interface/db-types';
import {Event} from 'react-big-calendar';


const App: React.FC = () => {
  const [events, setEvents] = useState<Array<Event>>([])

  useEffect(() => {
    getAllThisWeek(new Date()).then(result => {
      if (result) {
        console.log(result.weekView);

        let tempEvents = new Array<Event>();
        result.weekView.map(thing => {
          let tempEvent: Event = {
            allDay: false,
            title: thing.title,
            start: new Date(thing.startDate),
            end: new Date(thing.endDate)
          }
          tempEvents.push(tempEvent)
          return result;
        });
        setEvents(tempEvents)
      }
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hello, Kent.
        </p>
        <MyCalendar eventList={events}/>
      </header>
    </div>
  );
}

export default App;
