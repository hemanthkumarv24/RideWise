// Location_det.tsx

import './Location_det.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import { CiLocationOn } from "react-icons/ci";

const Location_det = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate('/Compare',{ state: { transition: 'slide' } });
  };

  return (
    <div className='box'>
      <div className='Input'>
     
        <input type="text" placeholder='Enter Pickup Location' />
        <CiLocationOn className="location-icon" />
        
        <input type='text' placeholder='Enter Destination' />
        <CiLocationOn className="location-icon" />
        <div>
          {/* Wrap button with motion.div for sliding animation */}
          <motion.button
            className='Search'
            onClick={handleSearch}
            whileHover={{ scale: 1.1 }} // Example hover effect
            whileTap={{ scale: 0.9 }}    // Example tap effect
            transition={{ duration: 0.3 }} // Example transition duration
          >
            Search Prices
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Location_det;