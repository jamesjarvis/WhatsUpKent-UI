import React, { createContext } from 'react';
import {
  getSundayDate, getEndOfWeek, Filter, SelectValueType, ActionType,
} from '../../interface/utils';

export const defaultFilter: Filter = {
  startDate: getSundayDate(new Date()),
  endDate: getEndOfWeek(new Date()),
  subjects: new Array<SelectValueType>(),
  eventTypes: new Array<SelectValueType>(),
};

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
