import React from 'react';
import { Location } from '../../interface/db-types';
import RoomView from '../RoomView/RoomView';

interface RoomsViewProps {
  rooms: Array<Location>;
}

const RoomsView: React.FC<RoomsViewProps> = ({ rooms }) => (
  <div>
    {rooms.map((value) => <RoomView room={value} />)}
  </div>
);

export default RoomsView;
