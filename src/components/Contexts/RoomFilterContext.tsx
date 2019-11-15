import { createContext } from 'react';
import {
  getCurrentHour, RoomFilterState, ActionType, IntSelectValueType,
} from '../../interface/utils';


export const availableHours: Array<IntSelectValueType> = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
];

const currentHour = getCurrentHour();
const endHour = new Date(currentHour);
endHour.setHours(currentHour.getHours() + 4);
export const defaultFilter: RoomFilterState = {
  startDate: currentHour,
  endDate: endHour,
  hours: availableHours[0],
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

export function init(initialFilter: RoomFilterState): RoomFilterState {
  return initialFilter;
}

const RoomFilterContext = createContext<any>(0);

export default RoomFilterContext;
