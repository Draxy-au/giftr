import React from "react";
import { Container } from "react-bootstrap";
import {Jumbo} from "../Jumbo/Jumbo";

export default function Home() {
  return (
    <>
      <Jumbo page="Home" />
      <Container className="homepage-container">
        <h1>GIFTr</h1>
        <p>Start creating gift lists in a simple and easy manner.</p>
      </Container>
    </>
  );
}
