import { About } from "../components/About";
import { Navbar } from "../components/Navbar";
import { RentVehicles } from "../components/RentVehicles/RentVehicles";
import { CarGallery } from "../components/CarGallery";
import { Col, Container, Row } from "react-bootstrap";
import './Pages.css';
import { Contact } from "../components/Contact";

export function Home(): JSX.Element {
  return (
    <>
      <Navbar />
      <Container>
        <Row className="home-section">
          <h1>Welcome to RoW Car Rental</h1>
          <Col lg={6}>
            <p className="lead">
              We offer a wide range of high-quality rental cars to suit your
              needs and budget. Whether you're here for business or pleasure,
              we've got you covered. Our friendly and professional staff are
              ready to help you find the perfect car for your trip, so you can
              sit back, relax, and enjoy the ride.{" "}
            </p>
          </Col>
          <Col lg={6}>
            <img src="" alt="aestetic-photo"/>
          </Col>
        </Row>
      </Container>
      <CarGallery />
      <About />
      <RentVehicles />
      <Contact/>
    </>
  );
}
