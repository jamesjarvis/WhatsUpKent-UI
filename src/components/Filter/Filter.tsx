import React, { useState } from 'react';
import Select from 'react-select';
import { getAllLectureTypes } from '../../interface/api';

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

const FilterView: React.FC = () => {
  const [eventTypes, setEventTypes] = useState();
  const eventSelects = formatEventTypes(getAllLectureTypes());

  const handleChange = (selectedOption: any) => {
    setEventTypes(selectedOption);
  };

  return (
    <div className="filterView">
      <span>Show me</span>
      <Select value={eventTypes} onChange={handleChange} options={eventSelects} />
      <span>events for</span>
      <span>All subjects</span>
    </div>
  );
};

export default FilterView;
