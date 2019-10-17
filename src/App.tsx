import React, { useReducer } from 'react';
import './App.scss';
import FilterView from './components/Filter/Filter';
import CalendarWrapper from './components/CalendarWrapper/CalendarWrapper';
import FilterContext, { defaultFilter, reducer, init } from './components/Contexts/FilterContext';


const App: React.FC = () => {
  const [filterState, dispatch] = useReducer(reducer, defaultFilter, init);

  return (
    <div className="App">
      <FilterContext.Provider value={{ filterState, dispatch }}>
        <div className="filterHolder">
          <FilterView />
        </div>
        <CalendarWrapper />
      </FilterContext.Provider>
    </div>
  );
};

export default App;
