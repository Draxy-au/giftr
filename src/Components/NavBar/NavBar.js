import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift } from "@fortawesome/free-solid-svg-icons";

import "./NavBar.css";

const Styles = styled.div`
  .navbar {
    background-color: #222;
    padding-left: 5px;
    padding-right: 5px;
  }

  .brand-link {
    color: #bbb;
    text-decoration: none;
    
    &:hover {
      color: #fff;
    }
  }

  .navbar-brand, .navbar-nav, .nav-link, .navbar-collapse {
    color: #bbb;
  
    &:hover {
      color: #fff;
    }
  }
`;

export default function NavigationBar() {
  const giftIcon = <FontAwesomeIcon icon={faGift} />;

  const [expanded, setExpanded] = useState(false);

  const navToggle = () => {
    setExpanded(expanded ? false : true);
  };

  const closeNav = () => {
    setExpanded(false);
  };

  return (
    <Styles>
      <Navbar variant="dark" expand="lg" expanded={expanded}>
        <Navbar.Brand><Link className="brand-link" onClick={closeNav} to="/">GIFTr {giftIcon}</Link></Navbar.Brand>
        <Navbar.Toggle onClick={navToggle} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end">
            <Nav.Item><Link className="nav-link" onClick={closeNav} to="/howitworks">How It Works</Link></Nav.Item>
            <Nav.Item><Link className="nav-link" onClick={closeNav} to="/giftlists">GIFTr Lists</Link></Nav.Item>
            <Nav.Item><Link className="nav-link" onClick={closeNav} to="/yourlists">Your Lists</Link></Nav.Item>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Item><Link className="nav-link" onClick={closeNav} to="/register">Register</Link></Nav.Item>
            <Nav.Item><Link className="nav-link" onClick={closeNav} to="/login">Login</Link></Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Styles>
  );
}
