import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { getAllLectureTypes, getAllSubjects } from '../../interface/api';
import { Filter } from '../../interface/utils';
import './Filter.scss';
import FilterContext, { ActionType } from '../Contexts/FilterContext';

interface SelectType {
  value: string;
  label: string;
}

interface GroupedSelectType {
  label: string;
  options: Array<SelectType>;
}

function formatEventTypes(eventTypes: Array<string>): Array<SelectType> {
  const tempSelectTypes = new Array<SelectType>();
  eventTypes.forEach((val) => {
    tempSelectTypes.push({ value: val, label: val });
  });
  return tempSelectTypes;
}

/**
 * formatSubjectTypes formats the module database objects into the select types
 *
 * @param modules Information about all modules associated with the events
 */
function formatSubjectTypes(subjects: Array<string>): Array<SelectType> {
  const tempSubTypes = new Array<SelectType>();
  subjects.forEach((val) => {
    tempSubTypes.push({ value: val, label: val });
  });
  return tempSubTypes;
}

const FilterView: React.FC = () => {
  const { filterState, dispatch } = useContext(FilterContext);

  const [availableEventTypes, setAvailableEventTypes] = useState();
  useEffect(() => {
    setAvailableEventTypes(formatEventTypes(getAllLectureTypes()));
  }, []);

  const handleTypeChange = (selectedOption: any) => {
    const temp: Filter = {
      startDate: filterState.startDate,
      endDate: filterState.endDate,
      subjects: filterState.subjects,
      eventTypes: selectedOption,
    };
    dispatch({ type: ActionType.UPDATE, payload: temp });
  };


  const [availableSubjectTypes, setAvailableSubjectTypes] = useState();
  useEffect(() => {
    getAllSubjects().then((data) => {
      if (data) {
        setAvailableSubjectTypes(formatSubjectTypes(data));
      }
    });
  }, []);


  const handleSubjectChange = (selectedOption: any) => {
    const temp: Filter = {
      startDate: filterState.startDate,
      endDate: filterState.endDate,
      subjects: selectedOption,
      eventTypes: filterState.eventTypes,
    };
    dispatch({ type: ActionType.UPDATE, payload: temp });
  };

  return (
    <div className="filterView">
      <span>Show me</span>
      <Select value={filterState.eventTypes} onChange={handleTypeChange} options={availableEventTypes} className="selector" placeholder="All" isMulti />
      <span>events for</span>
      <Select value={filterState.subjects} onChange={handleSubjectChange} options={availableSubjectTypes} className="selector" placeholder="All subjects" isMulti />
    </div>
  );
};

export default FilterView;
