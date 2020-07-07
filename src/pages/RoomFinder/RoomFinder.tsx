import Typography from '@material-ui/core/Typography';
import React, { useReducer } from 'react';
import RoomFilterContext, { defaultFilter, init, reducer } from '../../components/Contexts/RoomFilterContext';
import RoomFilterView from '../../components/RoomFilter/RoomFilter';
import { RoomsViewWrapper } from '../../components/RoomsView/RoomsView';
import './RoomFinder.scss';

const RoomFinder: React.FC = () => {
  const [filterState, dispatch] = useReducer(reducer, defaultFilter, init);

  return (
    <div className="roomView">
      <div className="info">
        <Typography variant="body1">Need a room? Find a room.</Typography>
      </div>
      <RoomFilterContext.Provider value={{ filterState, dispatch }}>
        <div className="filterHolder">
          <RoomFilterView />
        </div>
        <RoomsViewWrapper />
      </RoomFilterContext.Provider>
    </div>
  );
};

export default RoomFinder;
