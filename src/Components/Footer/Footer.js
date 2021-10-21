import React from "react";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Footer.css";

export const Footer = () => {
  const copyrightIcon = <FontAwesomeIcon icon={faCopyright} />;
  const date = new Date().getFullYear();
  return (
    <>
      <footer className="py-2 text-center">
        <div className="footerbg">
          <span className="footer-text">{copyrightIcon} {date} William Hamilton. All rights reserved.</span>
        </div>
      </footer>
    </>
  );
};
