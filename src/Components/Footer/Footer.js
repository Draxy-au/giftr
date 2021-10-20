import React from "react";
import { Container } from "react-bootstrap";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Footer = () => {
  const copyrightIcon = <FontAwesomeIcon icon={faCopyright} />;
  const date = new Date().getFullYear();
  return (
    <>
      <footer className="py-3 text-center ">
        <Container className="footerbg">
          <span className="text-muted ">{copyrightIcon} {date} William Hamilton. All rights reserved.</span>
        </Container>
      </footer>
    </>
  );
};
