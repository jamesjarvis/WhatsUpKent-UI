import React, { createContext } from 'react';
import { getSundayDate, getEndOfWeek, Filter } from '../../interface/utils';

export const defaultFilter: Filter = {
  startDate: getSundayDate(new Date()),
  endDate: getEndOfWeek(new Date()),
  subjects: new Array<string>(),
  eventTypes: new Array<string>(),
};

export enum ActionType {
  UPDATE,
}

interface ReducerType {
  payload: Filter;
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

export function init(initialFilter: Filter) {
  return initialFilter;
}

const FilterContext: React.Context<any> = createContext(defaultFilter);

export default FilterContext;
