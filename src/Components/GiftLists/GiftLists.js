import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCandyCane,
  faBirthdayCake,
  faPray,
  faGifts,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { faGem } from "@fortawesome/free-regular-svg-icons";
import { Jumbo } from "../Jumbo/Jumbo";
import api from "../../api/user.api";
import "./GiftLists.css";
import { useHistory } from "react-router-dom";

export const GiftLists = () => {
  const xmasIcon = <FontAwesomeIcon icon={faCandyCane} />;
  const bdayIcon = <FontAwesomeIcon icon={faBirthdayCake} />;
  const wishIcon = <FontAwesomeIcon icon={faPray} />;
  const wedIcon = <FontAwesomeIcon icon={faGem} />;
  const otherIcon = <FontAwesomeIcon icon={faGifts} />;
  const checkIcon = <FontAwesomeIcon icon={faCheck} />;
  const crossIcon = <FontAwesomeIcon icon={faTimes} />;

  const stylered = { color: "red" };
  const stylegreen = { color: "green" };

  const history = useHistory();
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const id = useSelector((state) => state.user.id);

  const [allList, setAllList] = useState([]);
  const [userSubs, setUserSubs] = useState([]);
  const [userPurchases, setUserPurchases] = useState([]);

  const getAllLists = async () => {
    const response = await api.get(`/list`);
    setAllList(response.data);
  };

  const getUserSubscriptions = async () => {
    const response = await api.get(`/user/subscriptions/${id}`);
    if (response.data.length > 0) {
      setUserSubs(response.data[0].subscriptions);
    }
  };

  const getUserPurchases = async () => {
    const response = await api.get(`/user/purchases/${id}`);
    
    if (response.data.length > 0) {
      setUserPurchases(response.data[0].purchases);
    }
  };

  useEffect(() => {
    getAllLists();
    if (id){
      getUserSubscriptions();
      getUserPurchases();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleClickList = (list_id) => {
    if (loggedIn) {
      alert(`Logged in user click list ${list_id}`)
    } else {
      history.push("/login");
    }
    
  };

  const displayPurchased = (l_id) => {
    if (userPurchases?.find(({ list_id }) => list_id === l_id)) {
      return (
        <th className="table-giftr-chosen" style={stylegreen}>
          {checkIcon}
        </th>
      );
    } else {
      return (
        <th className="table-giftr-chosen" style={stylered}>
          {crossIcon}
        </th>
      );
    }
  };

  const displaySubscribed = (l_id) => {    
    if (userSubs?.find(({ id }) => id === l_id)) {
      return (
        <th className="table-giftr-chosen" style={stylegreen}>
          {checkIcon}
        </th>
      );
    } else {
      return (
        <th className="table-giftr-chosen" style={stylered}>
          {crossIcon}
        </th>
      );
    }
  };

  const displayIcon = (type) => {
    switch (type) {
      case "xmas":
        return xmasIcon;
      case "bday":
        return bdayIcon;
      case "wish":
        return wishIcon;
      case "wed":
        return wedIcon;
      default:
        return otherIcon;
    }
  };

  return (
    <>
      <Jumbo />
      <div className="yourlist-container">
        <div className="yourlist">
          <div className="title">
            <h1>GIFTr Lists</h1>
          </div>
          <div>
            <p>
              Here you will find the GIFTr lists that you have subscribed to.
            </p>
          </div>
          <div className="d-flex flex-column w-100">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="table-giftr-icon"></th>
                  <th className="table-giftr-name">List Name</th>
                  {loggedIn && (
                    <th className="table-giftr-created">Subscribed To</th>
                  )}
                  {loggedIn && (
                    <th className="table-giftr-created">Purchased Gift</th>
                  )}
                  <th className="table-giftr-created">Date Created</th>
                  <th className="table-giftr-closing">Date Closing</th>
                </tr>
              </thead>
              <tbody>
                {allList.length > 1 &&
                  allList.map((list) => {
                    return (
                      <tr
                        key={list.id}
                        onClick={() => {
                          handleClickList(list.id);
                        }}
                      >
                        <td className="table-giftr-icon">
                          {displayIcon(list.type)}
                        </td>
                        <td className="table-giftr-name">{list.name}</td>
                        {loggedIn && displaySubscribed(list.id)}
                        {loggedIn && displayPurchased(list.id)}
                        <td className="table-giftr-created">
                          {new Date(list.created_at).toDateString()}
                        </td>
                        <td className="table-giftr-closing">
                          {new Date(list.closing).toDateString()}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};
