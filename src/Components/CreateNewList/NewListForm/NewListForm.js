import React, { useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import DatePicker from "react-date-picker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFeatherAlt,
  faCalendarAlt,
  faInfo
} from "@fortawesome/free-solid-svg-icons";

import "./NewListForm.css";

export const NewListForm = ({ icon, title, }) => {

  const listIcon = <FontAwesomeIcon icon={faFeatherAlt} />;
  const calIcon = <FontAwesomeIcon icon={faCalendarAlt} />;
  const descIcon = <FontAwesomeIcon icon={faInfo} />;


  const [formName, setFormName] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formDate, setFormDate] = useState(new Date());
 
  const handleFormName = (e) => {
    setFormName(e.target.value);
  }

  const handleFormDesc = (e) => {
    setFormDesc(e.target.value);
  }

  return (
    <Container className="new-list-form-container">
                <div className="new-list-form-title-container">
                  <div className="new-list-form-icon">{icon}</div>
                  <div className="new-list-form-title">{title} List</div>
                </div>
                <Form className="new-list-form">
                    <Form.Group className="m-3">
                      <Form.Label>List Name</Form.Label>
                      <InputGroup className="mb-3">
                        <InputGroup.Text className="text-icon">{listIcon}</InputGroup.Text>
                        <Form.Control
                          id="Form-ListName"
                          type="text"
                          maxLength="60"
                          placeholder="Enter a descriptive name"
                          value={formName}
                          onChange={handleFormName}
                          required
                        />
                      </InputGroup>
                    </Form.Group>

                    <Form.Group className="m-3">
                      <Form.Label>Please describe this list for guests</Form.Label>
                      <InputGroup className="mb-3">
                        <InputGroup.Text className="text-icon">{descIcon}</InputGroup.Text>
                        <Form.Control
                          id="Form-ListDesc"
                          type="textarea"
                          maxLength="350"
                          placeholder="To celebrate..."
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
                      <Button className="btnCreateList w-100 mt-3">Create New {title} List!</Button>                      
                    </Form.Group>

                  </Form>
              </Container>
  )
}
