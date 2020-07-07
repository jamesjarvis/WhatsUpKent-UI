/* eslint-disable react/style-prop-object */
import Typography from '@material-ui/core/Typography';
import React, { useState, useEffect } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import { getAllLocations } from '../../interface/api';
import { Location, Loc } from '../../interface/db-types';
import './MapView.scss';

const MapView: React.FC = () => {
  const token = 'pk.eyJ1IjoiampoYXNsYW5kZWQiLCJhIjoiY2tjYTd2cG5mMXNzNTJ2bG1lbXMzaHZkaiJ9.PJE9eEHukd9yDckihlJQgA';
  const center = [1.0675, 51.2975] as [number, number];
  const zoom = [15] as [number];

  const [locations, setLocations] = useState<Array<Location>>([]);

  useEffect(() => {
    getAllLocations().then((result) => {
      if (result) {
        setLocations(result);
      }
    });
  }, []);

  const layerPaint = {
    'heatmap-weight': {
      property: 'priceIndicator',
      type: 'exponential',
      stops: [
        [0, 0],
        [5, 2],
      ],
    },
    // Increase the heatmap color weight weight by zoom level
    // heatmap-ntensity is a multiplier on top of heatmap-weight
    'heatmap-intensity': {
      stops: [
        [0, 0],
        [5, 1.2],
      ],
    },
    // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
    // Begin color ramp at 0-stop with a 0-transparancy color
    // to create a blur-like effect.
    'heatmap-color': [
      'interpolate',
      ['linear'],
      ['heatmap-density'],
      0,
      'rgba(33,102,172,0)',
      0.25,
      'rgb(103,169,207)',
      0.5,
      'rgb(209,229,240)',
      0.8,
      'rgb(253,219,199)',
      1,
      'rgb(239,138,98)',
      2,
      'rgb(178,24,43)',
    ],
    // Adjust the heatmap radius by zoom level
    'heatmap-radius': {
      stops: [
        [0, 1],
        [5, 35],
      ],
    },
  };

  const Map = ReactMapboxGl({
    accessToken: token,
  });
  return (
    <div className="mapView">
      <div className="info">
        <Typography variant="body1">Where is everyone?</Typography>
      </div>
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: '100%',
          minHeight: '80vh',
          width: '100%',
        }}
        center={center}
        zoom={zoom}
      >
        <Layer type="heatmap" paint={layerPaint}>
          {locations.map((el: Location) => {
            const latlon = el.loc as Loc;
            return (
              <Feature
                key={el.id}
                coordinates={latlon.coordinates}
                properties={el}
              />
            );
          })}
        </Layer>
      </Map>
    </div>
  );
};

export default MapView;
