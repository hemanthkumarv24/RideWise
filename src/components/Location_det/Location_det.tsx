import  { useContext } from 'react';
import './Location_det.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CiLocationOn } from "react-icons/ci";
import { LocationContext } from './LocationContext';
import { Input } from 'antd';

const Location_det = () => {
  const navigate = useNavigate();
  const { pickupLocation, setPickupLocation, destinationLocation, setDestinationLocation } = useContext(LocationContext);

  const handleSearch = () => {
    navigate('/route', {
      state: {
        pickupLocation,
        destinationLocation
      }
    });
  };

  const handleLocationClick = (type: 'pickup' | 'destination') => {
    navigate('/map', { state: { from: type } });
  };

  return (
    <div className='box'>
      <div className='Input'>
        <Input
          type="text"
          placeholder='Enter Pickup Location'
          value={pickupLocation || ''}
          onChange={(e) => setPickupLocation(e.target.value)}
        />
        <CiLocationOn className="location-icon" onClick={() => handleLocationClick('pickup')} />

        <Input
          type='text'
          placeholder='Enter Destination'
          value={destinationLocation || ''}
          onChange={(e) => setDestinationLocation(e.target.value)}
        />
        <CiLocationOn className="location-icon" onClick={() => handleLocationClick('destination')} />

        <div>
          <motion.button
            className='Search'
            onClick={handleSearch}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            Preview Location
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Location_det;
