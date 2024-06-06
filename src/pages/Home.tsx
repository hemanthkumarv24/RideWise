// src/Home.tsx

import React from 'react';
import HomeNav from '../components/HomeNav';
import About from '../components/About';
import { Row, Col, Button } from 'antd';

const Home: React.FC = () => {
  return (
    <>
    <div className="home-container">
      <HomeNav />
      <Row gutter={24}>
        <Col className='home-content'>
        <div className="justified-text">
        <h3>
          Search and Compare cabs from 
          <span style={{ color: 'yellow' }}> Uber,<br /> Ola and Rapido </span> 
          in one go
        </h3>
        <h5>The best ride, every time</h5>
        <Button type="primary" className='button'>Browse now</Button>
      </div>
        </Col>
      </Row>
    </div>
    <About/>
    </>

  );
};

export default Home;
