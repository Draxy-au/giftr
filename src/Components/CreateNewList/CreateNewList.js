import React, { useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import DatePicker from "react-date-picker";
import { Jumbo } from "../Jumbo/Jumbo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCandyCane,
  faBirthdayCake,
  faPray,
  faGifts,
  faFeatherAlt,
  faCalendarAlt,
  faInfo
} from "@fortawesome/free-solid-svg-icons";
import { faGem } from "@fortawesome/free-regular-svg-icons";

import "./CreateNewList.css";

export const CreateNewList = () => {
  const xmasIcon = <FontAwesomeIcon icon={faCandyCane} />;
  const bdayIcon = <FontAwesomeIcon icon={faBirthdayCake} />;
  const wishIcon = <FontAwesomeIcon icon={faPray} />;
  const wedIcon = <FontAwesomeIcon icon={faGem} />;
  const giftsIcon = <FontAwesomeIcon icon={faGifts} />;
  const listIcon = <FontAwesomeIcon icon={faFeatherAlt} />;
  const calIcon = <FontAwesomeIcon icon={faCalendarAlt} />;
  const descIcon = <FontAwesomeIcon icon={faInfo} />;

  const [listType, setListType] = useState("notset");
  const [formName, setFormName] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formDate, setFormDate] = useState(new Date());
 
  const handleFormName = (e) => {
    setFormName(e.target.value);
  }

  const handleFormDesc = (e) => {
    setFormDesc(e.target.value);
  }

  const handleBtnClick = (type) => {
    setListType(type);
  };

  
  return (
    <>
      <Jumbo />
      <Container className="create-new-list-container">
        <div className="create-new-list">
          {listType === "notset" && (
            <div className="create-new-list-title">
              <h1>Create New List</h1>
            </div>
          )}
          <Container className="d-flex flex-column">
            {listType === "notset" && (
              <Container className="d-flex flex-row justify-content-center">
                <div className="alist-type flex-col">
                  <Button
                    className="alist-button"
                    onClick={() => handleBtnClick("xmas")}
                  >
                    {xmasIcon}
                  </Button>
                  <div>Christmas</div>
                </div>
                <div className="alist-type flex-col">
                  <Button
                    className="alist-button"
                    onClick={() => handleBtnClick("bday")}
                  >
                    {bdayIcon}
                  </Button>
                  <div>Birthday</div>
                </div>
                <div className="alist-type flex-col">
                  <Button
                    className="alist-button"
                    onClick={() => handleBtnClick("wish")}
                  >
                    {wishIcon}
                  </Button>
                  <div>Wish</div>
                </div>
                <div className="alist-type flex-col">
                  <Button
                    className="alist-button"
                    onClick={() => handleBtnClick("wed")}
                  >
                    {wedIcon}
                  </Button>
                  <div>Wedding</div>
                </div>
                <div className="alist-type flex-col">
                  <Button
                    className="alist-button"
                    onClick={() => handleBtnClick("other")}
                  >
                    {giftsIcon}
                  </Button>
                  <div>Other</div>
                </div>
              </Container>
            )}

            {listType === "xmas" && (
              <Container className="chosen-header-container">
                <div className="chosen-title-container">
                  <div className="chosen-icon">{xmasIcon}</div>
                  <div className="chosen-title">Christmas List</div>
                </div>
                <Form className="list-form">
                    <Form.Group className="m-3">
                      <Form.Label>List Name</Form.Label>
                      <InputGroup className="mb-3">
                        <InputGroup.Text className="text-icon">{listIcon}</InputGroup.Text>
                        <Form.Control
                          id="Form-ListName"
                          type="text"
                          placeholder="Enter a descriptive name"
                          value={formName}
                          onChange={handleFormName}
                          required
                        />
                      </InputGroup>
                    </Form.Group>

                    <Form.Group className="m-3">
                      <Form.Label>Please describe this list</Form.Label>
                      <InputGroup className="mb-3">
                        <InputGroup.Text className="text-icon">{descIcon}</InputGroup.Text>
                        <Form.Control
                          id="Form-ListDesc"
                          type="textarea"
                          placeholder="A brief description for guests"
                          value={formDesc}
                          onChange={handleFormDesc}
                        />
                      </InputGroup>
                    </Form.Group>

                    <Form.Group className="m-3">
                      <Form.Label>What date will the list close?</Form.Label>                      
                      <InputGroup className="mb-3">
                        <InputGroup.Text className="text-icon">{calIcon}</InputGroup.Text>
                        <DatePicker 
                          className="form-control"
                          onChange={setFormDate}
                          value={formDate}
                          calendarIcon={null}
                          clearIcon={null}
                          format="dd/MM/yyyy"
                          minDate={new Date()}
                          required
                        />                        
                      </InputGroup>
                      <Button className="btnCreateNewList w-100 mt-3">Create New {} List!</Button>                      
                    </Form.Group>

                  </Form>
              </Container>
            )}
            

          </Container>
        </div>
      </Container>
    </>
  );
};
