import React from 'react';
import Select from 'react-select';
import { RoomFilterState, IntSelectValueType } from '../../interface/utils';
import './RoomFilter.scss';


interface RoomFilterProps {
  roomFilter: RoomFilterState;
  setRoomFilter: Function;
  hourOptions: Array<IntSelectValueType>;
}

const RoomFilterView: React.FC<RoomFilterProps> = ({
  roomFilter, setRoomFilter, hourOptions,
}) => {
  const handleHoursChange = (selectedOption: any) => {
    const temp = roomFilter;
    temp.hours = selectedOption;
    temp.endDate.setHours(temp.startDate.getHours() + temp.hours.value);
    setRoomFilter(temp);
  };
  console.log(roomFilter);

  return (
    <div className="roomFilterView">
      <span>I need a room right now, for</span>
      <Select value={roomFilter.hours} onChange={handleHoursChange} options={hourOptions} className="selector" />
      <span>hours</span>
    </div>
  );
};

export default RoomFilterView;
