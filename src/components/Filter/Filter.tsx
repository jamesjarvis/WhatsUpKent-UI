import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { getAllLectureTypes, getAllModules } from '../../interface/api';
import './Filter.scss';
import { Module } from '../../interface/db-types';

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
function formatSubjectTypes(modules: Array<Module>): Array<GroupedSelectType> {
  const tempSubTypes = new Array<GroupedSelectType>();
  modules.forEach((mod: Module) => {
    let found = false;
    const newSelectType: SelectType = { value: mod.code, label: `${mod.code}: ${mod.name}` };
    for (let i = 0; i < tempSubTypes.length; i += 1) {
      if (tempSubTypes[i].label === mod.subject) {
        found = true;
        tempSubTypes[i].options.push(newSelectType);
      }
    }
    if (!found) {
      tempSubTypes.push({ label: mod.subject ? mod.subject : 'Other', options: new Array<SelectType>(newSelectType) });
    }
  });
  return tempSubTypes;
}

const FilterView: React.FC = () => {
  const [eventTypes, setEventTypes] = useState();
  const [availableEventTypes, setAvailableEventTypes] = useState();
  useEffect(() => {
    setAvailableEventTypes(formatEventTypes(getAllLectureTypes()));
  }, []);

  const handleTypeChange = (selectedOption: any) => {
    setEventTypes(selectedOption);
  };

  const [subjectTypes, setSubjectTypes] = useState();

  const [availableSubjectTypes, setAvailableSubjectTypes] = useState();
  useEffect(() => {
    getAllModules().then((data) => {
      if (data) {
        setAvailableSubjectTypes(formatSubjectTypes(data));
      }
    });
  }, []);


  const handleSubjectChange = (selectedOption: any) => {
    setSubjectTypes(selectedOption);
  };

  return (
    <div className="filterView">
      <span>Show me</span>
      <Select value={eventTypes} onChange={handleTypeChange} options={availableEventTypes} className="selector" placeholder="All" isMulti />
      <span>events for</span>
      <Select value={subjectTypes} onChange={handleSubjectChange} options={availableSubjectTypes} className="selector" placeholder="All subjects" isMulti />
    </div>
  );
};

export default FilterView;
