import React from 'react';
import { Location } from '../../interface/db-types';

interface RoomViewProps {
  room: Location;
}

const RoomView: React.FC<RoomViewProps> = ({ room }) => (
  <div>
    {room.name}
  </div>
);

export default RoomView;
