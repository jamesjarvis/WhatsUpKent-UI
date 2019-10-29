import React, { useReducer } from 'react';
import './MainView.scss';
import Typography from '@material-ui/core/Typography';
import FilterView from '../../components/Filter/Filter';
import CalendarWrapper from '../../components/CalendarWrapper/CalendarWrapper';
import FilterContext, { defaultFilter, reducer, init } from '../../components/Contexts/FilterContext';

const MainView: React.FC = () => {
  const [filterState, dispatch] = useReducer(reducer, defaultFilter, init);

  return (
    <div className="MainView">
      <div className="info">
        <Typography variant="body1">
          See everything going on at the
          <a
            href="https://www.kent.ac.uk/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {' '}
            University of Kent
          </a>
          , without nagging all of your mates.
        </Typography>
      </div>
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
