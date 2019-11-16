import Typography from '@material-ui/core/Typography';
import React from 'react';
import './RoomFilter.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface RoomFilterProps {
  // hourOptions: Array<IntSelectValueType>;
}

const RoomFilterView: React.FC<RoomFilterProps> = () => (
  // {
  // hourOptions,
  // }
  // const { filterState, dispatch } = useContext(RoomFilterContext);

  // const handleHoursChange = (selectedOption: any) => {
  //   const temp = filterState;
  //   temp.hours = selectedOption;
  //   temp.endDate.setHours(temp.startDate.getHours() + temp.hours.value);
  //   dispatch({ type: ActionType.UPDATE, payload: temp });
  // };

  <div className="roomFilterView">
    {/* <span>I need a room right now, for</span>
      <Select value={filterState.hours} onChange={handleHoursChange} options={hourOptions} className="selector" />
      <span>hours</span> */}
    <Typography variant="body1">
      Showing all rooms available for the next hour
    </Typography>
  </div>
);
export default RoomFilterView;
