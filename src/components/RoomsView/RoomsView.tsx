import React, { useContext, useState, useEffect } from 'react';
import { Location } from '../../interface/db-types';
import RoomView from '../RoomView/RoomView';
import './RoomsView.scss';
import RoomFilterContext from '../Contexts/RoomFilterContext';
import { getRooms } from '../../interface/api';

export const RoomsViewWrapper: React.FC = () => {
  const { filterState } = useContext(RoomFilterContext);

  const [rooms, setRooms] = useState<Array<Location>>([]);

  useEffect(() => {
    getRooms(filterState).then((result) => {
      if (result) {
        setRooms(result);
      }
    });
  }, [filterState]);

  return (
    <RoomsView rooms={rooms} />
  );
};


interface RoomsViewProps {
  rooms: Array<Location>;
}

const RoomsView: React.FC<RoomsViewProps> = ({ rooms }) => (
  <div className="roomsView">
    {rooms.map((value, index) => {
      const rand = Math.random() * 100 * index;
      return (
        <RoomView room={value} key={rand} />);
    })}
  </div>
);

export default RoomsView;
