// src/components/RouteWrapper.tsx
import React from 'react';
import Route from './Location_det/Route';

const RouteWrapper: React.FC = () => {
  // Set or derive pickup and destination values
  const pickup = "Some Pickup Location";
  const destination = "Some Destination Location";

  return <Route pickup={pickup} destination={destination} />;
};

export default RouteWrapper;
