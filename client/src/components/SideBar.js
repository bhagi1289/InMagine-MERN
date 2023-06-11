import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';

const Sidebar = () => {
  return (
    <Container>
      <Row>
        <Col md={3}>
          <Nav className="flex-column bg-dark text-light">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#services">Services</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
        </Col>
        <Col md={9}>
          {/* Main content goes here */}
        </Col>
      </Row>
    </Container>
  );
};

export default Sidebar;
