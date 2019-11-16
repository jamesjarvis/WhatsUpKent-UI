import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import AccessibleIcon from '@material-ui/icons/Accessible';
import React from 'react';
import { Location } from '../../interface/db-types';
import './RoomView.scss';

interface RoomViewProps {
  room: Location;
}

const RoomView: React.FC<RoomViewProps> = ({ room }) => (

  <Paper className="location">
    <span className="locationSection">
      <Link
        href={`http://www.kent.ac.uk/timetabling/rooms/room.html?room=${room.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Typography variant="h5">
          {room.id}
        </Typography>
      </Link>
      {room.disabledAccess
      && (
        <Tooltip title="This room is accessible" placement="right">
          <AccessibleIcon color="secondary" />
        </Tooltip>
      )}
    </span>
    <span className="locationSection">
      <Typography variant="body2">
        {room.name}
      </Typography>
    </span>
  </Paper>
);

export default RoomView;
