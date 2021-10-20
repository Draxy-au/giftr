import React from "react";
import { Button, Container, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCandyCane,
  faBirthdayCake,
  faPray
} from "@fortawesome/free-solid-svg-icons";
import {
  faGem
} from "@fortawesome/free-regular-svg-icons";
import {Jumbo} from "../Jumbo/Jumbo";

//import { Link } from "react-router-dom";

import "./YourList.css";
import { Link } from "react-router-dom";

export const YourList = () => {
  const xmasIcon = <FontAwesomeIcon icon={faCandyCane} />;
  const bdayIcon = <FontAwesomeIcon icon={faBirthdayCake} />;
  const wishIcon = <FontAwesomeIcon icon={faPray} />;
  const wedIcon = <FontAwesomeIcon icon={faGem} />;


  return (
    <>
    <Jumbo />
    <div className="yourlist-container">
      <div className="yourlist">
        <div className="yourlist-title">
          <h1>Your Lists</h1>
        </div>
        <Container className="d-flex flex-column">
          <Link to="/createnewlist">
            <Button className="btnCreateNewList mt-2">Create a New List</Button>
          </Link>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="table-date-icon"></th>
                <th className="table-date-name">List Name</th>
                <th className="table-date-created">Date Created</th>
                <th className="table-date-closing">Date Closing</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="table-date-icon">{xmasIcon}</td>
                <td className="table-date-name">Xmas List</td>
                <td className="table-date-created">21/10/2021</td>
                <td className="table-date-closing">25/12/2021</td>
              </tr>
              <tr>
                <td className="table-date-icon">{bdayIcon}</td>
                <td className="table-date-name">Birthday List</td>
                <td className="table-date-created">21/10/2021</td>
                <td className="table-date-closing">02/08/2022</td>
              </tr>
              <tr>
                <td className="table-date-icon">{wishIcon}</td>
                <td className="table-date-name">Wish List</td>
                <td className="table-date-created">21/10/2021</td>
                <td className="table-date-closing">No End Date</td>
              </tr>
              <tr>
                <td className="table-date-icon">{wedIcon}</td>
                <td className="table-date-name">Wedding List</td>
                <td className="table-date-created">21/10/2021</td>
                <td className="table-date-closing">No End Date</td>
              </tr>
            </tbody>
          </Table>
        </Container>
      </div>
    </div>
    </>
  );
};