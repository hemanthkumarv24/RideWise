import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Row } from "antd";
import Navbar from "../components/Navbar/Navbar";

const Analytics = () => {
  const [data, setData] = useState({
    total_trips_by_service: [],
    average_price_by_service: [],
    average_rating_by_service: [],
    peak_usage_times: [],
    popular_routes: [],
    service_comparison: { trip_data: [], rating_data: [] },
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/analytics/`
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          minHeight: "100vh",
          marginTop: "20px",
        }}
      >
        <Row gutter={16} style={{ width: "80%" }}>
          {data.total_trips_by_service.map((trip, index) => (
            <Col key={index} xs={24} md={12} lg={8} xl={8}>
              <Card>
                <h2>{trip["service_name"]}</h2>
                <h3>Total Trips: {trip["count"]}</h3>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default Analytics;
