import React from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

function Header() {
  return (
    <Navbar expand="lg" bg="primary" data-bs-theme="light">
      <Container fluid>
        <Navbar.Brand style={{ color: "#ffffff" }}>Weather App</Navbar.Brand>
        <Form className="d-flex">
          <Form.Control type="search" className="me-2" placeholder="Search" />
          <Button variant="primary" style={{ borderColor: "#000000" }}>
            Search
          </Button>
        </Form>
        <Navbar.Text style={{ color: "#ffffff" }}>By Mark Vargas</Navbar.Text>
      </Container>
    </Navbar>
  );
}

export default Header;
