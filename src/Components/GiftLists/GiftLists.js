import React from 'react'
import { Container, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCandyCane,
  faBirthdayCake,
  faPray,
  faGifts
} from "@fortawesome/free-solid-svg-icons";
import {
  faGem
} from "@fortawesome/free-regular-svg-icons";
import {Jumbo} from "../Jumbo/Jumbo";

import "./GiftLists.css";

export const GiftLists = () => {

  const xmasIcon = <FontAwesomeIcon icon={faCandyCane} />;
  const bdayIcon = <FontAwesomeIcon icon={faBirthdayCake} />;
  const wishIcon = <FontAwesomeIcon icon={faPray} />;
  const wedIcon = <FontAwesomeIcon icon={faGem} />;
  const otherIcon = <FontAwesomeIcon icon={faGifts} />;

  return (
    <>
      <Jumbo />
    <div className="yourlist-container">
      <div className="yourlist">
        <div className="yourlist-title">
          <h1>GIFTr Lists</h1>
        </div>
        <div>
          <p>Here you will find the GIFTr lists that you have subscribed to.</p>
        </div>
        <Container className="d-flex flex-column">
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
                <td className="table-date-closing">21/10/2022</td>
              </tr>
              <tr>
                <td className="table-date-icon">{wedIcon}</td>
                <td className="table-date-name">Wedding List</td>
                <td className="table-date-created">21/10/2021</td>
                <td className="table-date-closing">21/10/2022</td>
              </tr>
              <tr>
                <td className="table-date-icon">{otherIcon}</td>
                <td className="table-date-name">Gift List</td>
                <td className="table-date-created">21/10/2021</td>
                <td className="table-date-closing">21/10/2022</td>
              </tr>
            </tbody>
          </Table>
        </Container>
      </div>
    </div>
    </>
  )
}
