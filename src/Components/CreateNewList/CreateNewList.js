import React, { useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Jumbo } from "../Jumbo/Jumbo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCandyCane,
  faBirthdayCake,
  faPray,
  faGifts,
} from "@fortawesome/free-solid-svg-icons";
import { faGem } from "@fortawesome/free-regular-svg-icons";

import "./CreateNewList.css";

export const CreateNewList = () => {
  const xmasIcon = <FontAwesomeIcon icon={faCandyCane} />;
  const bdayIcon = <FontAwesomeIcon icon={faBirthdayCake} />;
  const wishIcon = <FontAwesomeIcon icon={faPray} />;
  const wedIcon = <FontAwesomeIcon icon={faGem} />;
  const giftsIcon = <FontAwesomeIcon icon={faGifts} />;

  const [listType, setListType] = useState("notset");

  const handleBtnClick = (type) => {
    setListType(type);
  };

  return (
    <>
      <Jumbo />
      <Container className="create-new-list-container">
        <div className="create-new-list">
          <div className="create-new-list-title">
            <h1>Create New List</h1>
          </div>
          <Container className="d-flex flex-column">
            {listType === "notset" && (
              <Container className="d-flex flex-row justify-content-center">
                <div className="alist-type flex-col">
                  <Button className="alist-button" onClick={() => handleBtnClick("xmas")}>
                    {xmasIcon}
                  </Button>
                  <div>Christmas</div>
                </div>
                <div className="alist-type flex-col">
                  <Button className="alist-button" onClick={() => handleBtnClick("bday")}>
                    {bdayIcon}
                  </Button>
                  <div>Birthday</div>
                </div>
                <div className="alist-type flex-col">
                  <Button className="alist-button" onClick={() => handleBtnClick("wish")}>
                    {wishIcon}
                  </Button>
                  <div>Wish</div>
                </div>
                <div className="alist-type flex-col">
                  <Button className="alist-button" onClick={() => handleBtnClick("wed")}>
                    {wedIcon}
                  </Button>
                  <div>Wedding</div>
                </div>
                <div className="alist-type flex-col">
                  <Button className="alist-button" onClick={() => handleBtnClick("other")}>
                    {giftsIcon}
                  </Button>
                  <div>Other</div>
                </div>
              </Container>
            )}
          </Container>
        </div>
      </Container>
    </>
  );
};
