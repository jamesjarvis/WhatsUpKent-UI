import React, { useReducer } from 'react';
import './MainView.scss';
import FilterView from '../../components/Filter/Filter';
import CalendarWrapper from '../../components/CalendarWrapper/CalendarWrapper';
import FilterContext, { defaultFilter, reducer, init } from '../../components/Contexts/FilterContext';

const MainView: React.FC = () => {
  const [filterState, dispatch] = useReducer(reducer, defaultFilter, init);

  return (
    <div className="MainView">
      <FilterContext.Provider value={{ filterState, dispatch }}>
        <div className="filterHolder">
          <FilterView />
        </div>
        <CalendarWrapper />
      </FilterContext.Provider>
    </div>
  );
};

export default MainView;
