import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCandyCane,
  faBirthdayCake,
  faPray,
  faGifts,
} from "@fortawesome/free-solid-svg-icons";
import { faGem } from "@fortawesome/free-regular-svg-icons";
import { Jumbo } from "../Jumbo/Jumbo";
import api from "../../api/user.api";
import { setSelectedGiftList } from "../../redux/user.slice";

import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./YourList.css";

export const YourList = () => {
  const xmasIcon = <FontAwesomeIcon icon={faCandyCane} />;
  const bdayIcon = <FontAwesomeIcon icon={faBirthdayCake} />;
  const wishIcon = <FontAwesomeIcon icon={faPray} />;
  const wedIcon = <FontAwesomeIcon icon={faGem} />;
  const otherIcon = <FontAwesomeIcon icon={faGifts} />;

  const history = useHistory();
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.id);
  //const list_id = useSelector((state) => state.user.selectedGiftList);

  const [userList, setUserList] = useState([]);

  const getUserLists = async (id) => {
    const response = await api.get(`/user/lists/${id}`);
    setUserList(response.data[0].lists);
  };

  useEffect(() => {
    getUserLists(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleClickList = async (id) => {
    await dispatch(setSelectedGiftList({id: id}));
    history.push("/giftlist");
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

  const handleCreateNewList = () => {
    history.push('/createnewlist');
  }

  return (
    <>
      <Jumbo />
      <div className="yourlist-container">
        <div className="yourlist">
          <div className="title">
            <h1>Your GIFTr Lists</h1>
          </div>
          <div>
            <p>
              Here are all the GIFTr Lists that you have created.
            </p>
          </div>
          <div className="d-flex flex-column w-100">
            <div className="createnewlist-btn">
              <button className="btnCoffee std-big-btn" onClick={()=>handleCreateNewList()}>Create a New List</button>
              </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="table-icon"></th>
                  <th className="table-name">List Name</th>
                  <th className="table-date-created">Date Created</th>
                  <th className="table-date-closing">Date Closing</th>
                </tr>
              </thead>
              <tbody>
                {userList.length > 0 &&
                  userList.map((list) => {
                    return (
                      <tr
                        className="click-row"
                        key={list.id}
                        onClick={() => {
                          handleClickList(list.id);
                        }}
                      >
                        <td className="table-icon">{displayIcon(list.type)}</td>
                        <td className="table-name">{list.name}</td>
                        <td className="table-date-created">
                          {new Date(list.created_at).toDateString()}
                        </td>
                        <td className="table-date-closing">
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
