import React from "react";
import { Jumbotron, Container } from "react-bootstrap";
import styled from "styled-components";

import jumboImage from "../../assets/jumboImage2.png";

import "./Jumbo.css";

const Styles = styled.div`
  .jumbo {
    background: url(${jumboImage});
    background-size: cover;
    color: #ccc;
    height: 200px;
    position: relative;
    z-index: -2;
  }
`;

export const Jumbo = () => (
  <>
    <Styles>
    <Jumbotron fluid className="jumbo desktop">
      <div className="overlay"></div>
      <Container>
        <h1>GIFTr</h1>
      </Container>
    </Jumbotron>
    </Styles>
  </>
);
