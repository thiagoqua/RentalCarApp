import { Col, Container, Row } from "react-bootstrap";

export function Contact():JSX.Element{
  return (
    <Container id="contact" fluid>
      <Row>
        <Col className="c-info" lg={4} md={6} sm={12}>
          <h3>RoW contact</h3>
            <span>0341-1234567</span>
            <br/>
            <span>cityros@onwheels.car.ar</span>
            <br/>
            <span>0341-8912345</span>
        </Col>
        <Col className="c-info" lg={4} md={6} sm={12}>
          <h3>Working hours</h3>
          <b>Mon - Fri</b><span> 08:00 to 20:00</span>
          <br/>
          <b>Sat</b><span> 08:00 to 12:00</span>
          <b>Sun</b><span> closed</span>
        </Col>
        <Col className="c-info" lg={4} md={6} sm={12}>
          <h3>Social media</h3>
          <span>https://instagram.com/rosario-on-wheels</span>
          <br/>
          <span>https://facebook.com/rosario-on-wheels</span>
          <br/>
          <span>https://linkedin.com/rosario-on-wheels</span>
        </Col>
      </Row>
    </Container>
  )
}