import React from 'react';
import { Location } from '../../interface/db-types';
import RoomView from '../RoomView/RoomView';
import './RoomsView.scss';

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
