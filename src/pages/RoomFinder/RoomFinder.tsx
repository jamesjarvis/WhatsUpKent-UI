import React, { useState, useEffect, useReducer } from 'react';
import './RoomFinder.scss';
import Typography from '@material-ui/core/Typography';
import {
  RoomFilterState,
  IntSelectValueType,
  getCurrentHour, ActionType,
} from '../../interface/utils';
import RoomFilterView from '../../components/RoomFilter/RoomFilter';
import RoomsView from '../../components/RoomsView/RoomsView';
import { getRooms } from '../../interface/api';
import { Location } from '../../interface/db-types';

const availableHours: Array<IntSelectValueType> = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
];

const currentHour = getCurrentHour();
const endHour = new Date(currentHour);
endHour.setHours(currentHour.getHours() + 4);
const defaultFilter: RoomFilterState = {
  startDate: currentHour,
  endDate: endHour,
  hours: availableHours[3],
};

interface ReducerType {
  payload: RoomFilterState;
  type: ActionType;
}

export const reducer = (state = defaultFilter, action: ReducerType) => {
  switch (action.type) {
    case ActionType.UPDATE:
      return action.payload;
    default:
      return state;
  }
};

export function init(initialFilter: RoomFilterState) {
  return initialFilter;
}


const MainView: React.FC = () => {
  const [roomFilter, dispatch] = useReducer(reducer, defaultFilter, init);
  const [rooms, setRooms] = useState<Array<Location>>([]);

  useEffect(() => {
    getRooms(roomFilter).then((result) => {
      console.log(result);
      if (result) {
        setRooms(result);
      }
    });
  }, [roomFilter]);
  return (
    <div className="RoomView">
      <div className="info">
        <Typography variant="body1">Need a room? Find a room.</Typography>
      </div>
      <div className="filterHolder">
        <RoomFilterView
          roomFilter={roomFilter}
          setRoomFilter={dispatch}
          hourOptions={availableHours}
        />
      </div>
      <RoomsView rooms={rooms} />
    </div>
  );
};

export default MainView;
