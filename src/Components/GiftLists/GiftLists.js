import React from 'react'
import { Container, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCandyCane,
  faBirthdayCake,
  faPray,
  faGifts,
  faCheck, 
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import {
  faGem
} from "@fortawesome/free-regular-svg-icons";
import {Jumbo} from "../Jumbo/Jumbo";

import "./GiftLists.css";
import { useHistory } from 'react-router-dom';

export const GiftLists = () => {

  const xmasIcon = <FontAwesomeIcon icon={faCandyCane} />;
  const bdayIcon = <FontAwesomeIcon icon={faBirthdayCake} />;
  const wishIcon = <FontAwesomeIcon icon={faPray} />;
  const wedIcon = <FontAwesomeIcon icon={faGem} />;
  const otherIcon = <FontAwesomeIcon icon={faGifts} />;
  const checkIcon = <FontAwesomeIcon icon={faCheck} />;
  const crossIcon = <FontAwesomeIcon icon={faTimes} />;

  const stylered = { color: "red" }
  const stylegreen = { color: "green" }

  const history = useHistory();

  const handleClickListItem = () => {
    history.push('/giftlist')
  }

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
                <th className="table-giftr-icon"></th>
                <th className="table-giftr-name">List Name</th>
                <th className="table-giftr-created">Gift Sorted</th>
                <th className="table-giftr-created">Date Created</th>
                <th className="table-giftr-closing">Date Closing</th>
              </tr>
            </thead>
            <tbody>
              
              <tr onClick={() => {handleClickListItem()}}>
                <td className="table-giftr-icon">{xmasIcon}</td>
                <td className="table-giftr-name">Emma's Xmas List</td>
                <th className="table-giftr-chosen" style={stylegreen}>{checkIcon}</th>
                <td className="table-giftr-created">21/10/2021</td>
                <td className="table-giftr-closing">25/12/2021</td>
              </tr>
              
              <tr>
                <td className="table-giftr-icon">{bdayIcon}</td>
                <td className="table-giftr-name">Greg's Birthday List</td>
                <th className="table-giftr-chosen red">{crossIcon}</th>
                <td className="table-giftr-created">21/10/2021</td>
                <td className="table-giftr-closing">02/08/2022</td>
              </tr>
              <tr>
                <td className="table-giftr-icon">{wishIcon}</td>
                <td className="table-giftr-name">Charles' Wish List</td>
                <th className="table-giftr-chosen" style={stylegreen}>{checkIcon}</th>
                <td className="table-giftr-created">21/10/2021</td>
                <td className="table-giftr-closing">21/10/2022</td>
              </tr>
              <tr>
                <td className="table-giftr-icon">{wedIcon}</td>
                <td className="table-giftr-name">Rhonda and Ketut Wedding List</td>
                <th className="table-giftr-chosen red">{crossIcon}</th>
                <td className="table-giftr-created">21/10/2021</td>
                <td className="table-giftr-closing">21/10/2022</td>
              </tr>
              <tr>
                <td className="table-giftr-icon">{otherIcon}</td>
                <td className="table-giftr-name">John's Gift List</td>
                <th className="table-giftr-chosen"  style={stylered}>{crossIcon}</th>
                <td className="table-giftr-created">21/10/2021</td>
                <td className="table-giftr-closing">21/10/2022</td>
              </tr>
            </tbody>
          </Table>
        </Container>
      </div>
    </div>
    </>
  )
}
