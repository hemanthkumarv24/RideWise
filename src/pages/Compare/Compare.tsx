import React from 'react';
import './Compare.css';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar/Navbar';

interface Car {
  imgUrl: string;
  service: string;
  multiplier: number;
  details: string;
  time: string;
}

const uberCarList: Car[] = [
  // {
  //   imgUrl: 'https://i.ibb.co/cyvcpfF/uberx.png',
  //   service: 'Mini',
  //   multiplier: 1.2,
  //   details: "Affordable, compact rides without AC",
  //   time: "12 min away"
  // },
  
  {
    imgUrl: 'https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/TukTuk_Green_v1.png',
    service: 'Auto',
    multiplier: 1.5,
    details: "Auto rickshaws at the tap of a button",
    time: "15 min away"
  },
  {
    imgUrl: 'https://i.ibb.co/cyvcpfF/uberx.png',
    service: 'UberGo',
    multiplier: 2,
    details: "Everyday rides with AC",
    time: "30 min away"
  },
  {
    imgUrl: 'https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/Moto_v1.png',
    service: 'Moto',
    multiplier: 1,
    details: "Affordable and quick motorcycle rides",
    time: "10 min away"
  },
  {
    imgUrl: 'https://i.ibb.co/cyvcpfF/uberx.png',
    service: 'UberXL',
    multiplier: 3,
    details: "Spacious rides for groups",
    time: "25 min away"
  }
];

const olaCarList: Car[] = [
  {
    imgUrl: 'https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/TukTuk_Green_v1.png',
    service: 'Auto',
    multiplier: 1.5,
    details: "Affordable auto rides",
    time: "10 min away"
  },
  {
    imgUrl: 'https://i.ibb.co/cyvcpfF/uberx.png',
    service: 'Mini',
    multiplier: 1.2,
    details: "Affordable, compact rides with AC",
    time: "15 min away"
  },
  {
    imgUrl: 'https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/Moto_v1.png',
    service: 'Bike',
    multiplier: 1,
    details: "Quick bike rides",
    time: "5 min away"
  },
  {
    imgUrl: 'https://i.ibb.co/cyvcpfF/uberx.png',
    service: 'Prime SUV',
    multiplier: 3,
    details: "Premium SUV rides",
    time: "20 min away"
  }
];

const rapidoCarList: Car[] = [
  {
    imgUrl: 'https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/TukTuk_Green_v1.png',
    service: 'Auto',
    multiplier: 1.5,
    details: "Affordable auto rides",
    time: "8 min away"
  },
  {
    imgUrl: 'https://i.ibb.co/cyvcpfF/uberx.png',
    service: 'Cab Economy',
    multiplier: 1.2,
    details: "Economical cab rides",
    time: "12 min away"
  },
  {
    imgUrl: 'https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/Moto_v1.png',
    service: 'Bike',
    multiplier: 1,
    details: "Quick bike rides",
    time: "5 min away"
  },
  {
    imgUrl: 'https://i.ibb.co/cyvcpfF/uberx.png',
    service: 'Cab Premium',
    multiplier: 2.5,
    details: "Premium cab rides",
    time: "15 min away"
  }
];

const ComparePage: React.FC = () => {
  return (
    <>
      <div><Navbar /></div>
      <motion.div
        className="compare-container"
        initial={{ opacity: 0, x: '100vw' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: '-100vw' }}
        transition={{ duration: 0.6 }}
      >
        <div className="compare-box">
          <h3>Uber</h3>
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" className="service-logo" />
          {uberCarList.map((car, index) => (
            <div key={index} className="car">
              <img src={car.imgUrl} alt={car.service} className="car-img" />
              <div className="car-details">
                <span className="service">{car.service}</span>
                <span className="details">{car.details}</span>
                <span className="time">{car.time}</span>
                
              </div>
              
            </div>
            
          ))}
          <button className='Book'>Book Now</button>
        </div>

        <div className="compare-box">
          <h3>Ola</h3>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGfpXJEukauSGD7cV6jEloG_APEYiWhDwieg&s" alt="Ola Logo" className="service-logo" />
          {olaCarList.map((car, index) => (
            <div key={index} className="car">
              <img src={car.imgUrl} alt={car.service} className="car-img" />
              <div className="car-details">
                <span className="service">{car.service}</span>
                <span className="details">{car.details}</span>
                <span className="time">{car.time}</span>
              </div>
            </div>
          ))}
          <button className='Book'>Book Now</button>
        </div>

        <div className="compare-box">
          <h3>Rapido</h3>
          <img src="https://1000logos.net/wp-content/uploads/2023/09/Rapido-Logo.jpg" alt="Rapido Logo" className="rapido-logo" />
          {rapidoCarList.map((car, index) => (
            <div key={index} className="car">
              <img src={car.imgUrl} alt={car.service} className="car-img" />
              <div className="car-details">
                <span className="service">{car.service}</span>
                <span className="details">{car.details}</span>
                <span className="time">{car.time}</span>
              </div>
            </div>
          ))}
          <button className='Book'>Book Now</button>
        </div>
      </motion.div>
    </>
  );
};

export default ComparePage;
