import React from "react";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Navbar.Brand href="#home" style={{ marginLeft: "1%" }}>
        Weather App
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text style={{ marginRight: "1%" }}>By Mark Vargas</Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
