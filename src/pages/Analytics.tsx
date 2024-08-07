import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Row } from "antd";
import Navbar from "../components/Navbar/Navbar";
import DonutChart from "../components/Analytics/AvgMetrics";
import PopularRoutesList from "../components/Analytics/RouteList";
import LineChart from "../components/Analytics/LineChart";
import ServiceUsageList from "../components/Analytics/ServiceUsageList";
import AverageRatings from "../components/Analytics/AverageRatings";

const Analytics = () => {
  const [data, setData] = useState({
    total_trips_by_service: [],
    average_ratings: [],
    average_price_by_service: [],
    average_rating_by_service: [],
    peak_usage_times: [],
    peak_usage_times_per_service: [],
    popular_routes: [],
    service_usage_by_vehicle: [],
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

  // Extracting data for DonutChart components
  const avg = data.service_comparison.trip_data;
  const serviceNames = avg.map((trip) => trip["service_name"]);
  const distanceData = avg.map((trip) => trip["avg_distance"]);
  const durationData = avg.map((trip) => trip["avg_duration"]);
  const priceData = avg.map((trip) => trip["avg_price"]);

  const responsiveStyle = {
    display: "flex",
    justifyContent: "center",
    width: "90%",
    '@media (max-width: 768px)': {
      width: "100%",
    },
  };

  return (
    <>
      <Navbar />

      <div style={{ display: "flex", justifyContent: "center"}}>
        <Row gutter={10} style={responsiveStyle}>
          {data.total_trips_by_service.map((trip, index) => (
            <Col key={index} xs={24} md={12} lg={8} xl={8}>
              <Card style={{ marginTop: "10px" }}>
                <h2>{trip["service_name"]}</h2>
                <h3>Total Trips: {trip["count"]}</h3>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <div style={{ display: "flex", justifyContent: "center",  }}>
        <Row gutter={10} style={responsiveStyle}>
          <Col xs={24} md={8} lg={8} xl={8}>
            <Card title="Average Distance" style={{ marginTop: "10px" }}>
              <h2></h2>
              <DonutChart data={distanceData} labels={serviceNames} />
            </Card>
          </Col>
          <Col xs={24} md={8} lg={8} xl={8}>
            <Card title="Average Duration" style={{ marginTop: "10px" }}>
              <DonutChart data={durationData} labels={serviceNames} />
            </Card>
          </Col>
          <Col xs={24} md={8} lg={8} xl={8} style={{ marginTop: "10px" }}>
            <Card title="Average Price">
              <DonutChart data={priceData} labels={serviceNames} />
            </Card>
          </Col>
        </Row>
      </div>

      <div style={{ display: "flex", justifyContent: "center",  }}>
        <Row gutter={10} style={responsiveStyle}>
          <Col xs={24} md={12} lg={12} xl={12} style={{ marginTop: "10px" }}>
            <Card style={{ minHeight: "100%", maxHeight: "100%" }}>
              <AverageRatings ratings={data.average_ratings} />
            </Card>
          </Col>
          <Col xs={24} md={12} lg={12} xl={12} style={{ marginTop: "10px" }}>
            <Card style={{ minHeight: "100%", maxHeight: "100%" }}>
              <LineChart data={data.peak_usage_times_per_service} />
            </Card>
          </Col>
        </Row>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Row gutter={10} style={responsiveStyle}>
          <Col xs={24} md={12} lg={12} xl={12} style={{ marginTop: "10px" }}>
            <Card style={{ minHeight: "100%", maxHeight: "100%", overflow: "scroll" }}>
              <h2>Popular Routes</h2>
              <PopularRoutesList popular_routes={data.popular_routes} />
            </Card>
          </Col>
          <Col xs={24} md={12} lg={12} xl={12} style={{ marginTop: "10px" }}>
            <Card style={{ minHeight: "100%", maxHeight: "100%", overflow: "scroll" }}>
              <h2>Frequent Service Usage</h2>
              <ServiceUsageList service_usage={data.service_usage_by_vehicle} />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Analytics;
