import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
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
import { NewListForm } from "./NewListForm/NewListForm";

export const CreateNewList = () => {
  const xmasIcon = <FontAwesomeIcon icon={faCandyCane} />;
  const bdayIcon = <FontAwesomeIcon icon={faBirthdayCake} />;
  const wishIcon = <FontAwesomeIcon icon={faPray} />;
  const wedIcon = <FontAwesomeIcon icon={faGem} />;
  const otherIcon = <FontAwesomeIcon icon={faGifts} />;

  const [listType, setListType] = useState("notset");

  const handleBtnClick = (type) => {
    setListType(type);
  };

  return (
    <>
      <Jumbo />
      <div className="create-new-list-container">
        <div className="create-new-list">
          {listType === "notset" && (
            <div className="create-new-list-title">
              <h1>Create New List</h1>
            </div>
          )}
          <Container className="d-flex flex-column">
            {listType === "notset" && (
              <Container className="d-flex flex-row flex-wrap alist-icons">
                <div className="alist-type flex-col">
                  <Button
                    className="alist-button"
                    onClick={() => handleBtnClick("xmas")}
                  >
                    {xmasIcon}
                  </Button>
                  <div className="alist-text">Christmas</div>
                </div>
                <div className="alist-type flex-col">
                  <Button
                    className="alist-button"
                    onClick={() => handleBtnClick("bday")}
                  >
                    {bdayIcon}
                  </Button>
                  <div className="alist-text">Birthday</div>
                </div>
                <div className="alist-type flex-col">
                  <Button
                    className="alist-button"
                    onClick={() => handleBtnClick("wish")}
                  >
                    {wishIcon}
                  </Button>
                  <div className="alist-text">Wish</div>
                </div>
                <div className="alist-type flex-col">
                  <Button
                    className="alist-button"
                    onClick={() => handleBtnClick("wed")}
                  >
                    {wedIcon}
                  </Button>
                  <div className="alist-text">Wedding</div>
                </div>
                <div className="alist-type flex-col">
                  <Button
                    className="alist-button"
                    onClick={() => handleBtnClick("other")}
                  >
                    {otherIcon}
                  </Button>
                  <div className="alist-text">Other</div>
                </div>
              </Container>
            )}

            {listType === "xmas" && (
              <NewListForm icon={xmasIcon} title={"Christmas Gift"} />
            )}

            {listType === "bday" && (
              <NewListForm icon={bdayIcon} title={"Birthday Gift"} />
            )}

            {listType === "wish" && (
              <NewListForm icon={wishIcon} title={"Wish Gift"} />
            )}
            
            {listType === "wed" && (
              <NewListForm icon={wedIcon} title={"Wedding Gift"} />
            )}

            {listType === "other" && (
              <NewListForm icon={otherIcon} title={"Gift"} />
            )}


          </Container>
        </div>
      </div>
    </>
  );
};
