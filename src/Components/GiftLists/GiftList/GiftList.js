import React, { useEffect, useState } from "react";
import { Jumbo } from "../../Jumbo/Jumbo";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import api from "../../../api/user.api";
import DatePicker from "react-date-picker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave } from "@fortawesome/free-solid-svg-icons";

import "./GiftList.css";
import { WEBSITE_URL } from "../../../constants/api";

import { GiftListCard } from "./GiftListCard/GiftListCard";
import { useHistory } from "react-router";
import { ShareList } from "./ShareList";
import axios from "axios";

export const GiftList = () => {
  const editIcon = <FontAwesomeIcon icon={faEdit} />;
  const saveIcon = <FontAwesomeIcon icon={faSave} />;

  const history = useHistory();

  const state_id = useSelector((state) => state.user.id);
  const list_id = useSelector((state) => state.user.selectedGiftList);
  const loggedIn = useSelector((state) => state.user.loggedIn);

  const [buttonsVisible, setbuttonsVisible] = useState({
    visible: false,
    id: 0,
  });
  const [findID, setFindID] = useState("");
  const [listDetails, setListDetails] = useState([]);
  const [giftList, setGiftList] = useState([]);
  const [giftListID, setGiftListID] = useState("");
  const [giftListOwner, setGiftListOwner] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [editClosingDate, setEditClosingDate] = useState(false);
  const [editTitleText, setEditTitleText] = useState("");
  const [newClosingDate, setNewClosingDate] = useState("");
  const [shareVisible, setShareVisible] = useState(false);
  const [sharedURL, setSharedURL] = useState(false);
  const [subd, setSubd] = useState(false);

  const { findid } = useParams();

  const getListTitleDate = async () => {
    if (listDetails.name){
    await setEditTitleText(listDetails.name);
    await setNewClosingDate(new Date(listDetails.closing));
    }
  };

  const subdToList = async (uid) => {
    if (uid > 0) {
      try {
        const response = await api.get(`/user/subscriptions/${uid}`);
        if (response.data.length > 0) {
          response.data[0].subscriptions.map((sub) => {
            if (findid) {
              let fid = new Buffer.from(findid, "base64").toString();
              if (sub.id === parseInt(fid)) {
                setSubd(true);
                return true;
              }
            }
            return false;
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (findid) {
      let fid = new Buffer.from(findid, "base64").toString();
      if (findid.length < 4) {
        history.push("/");
      }
      setFindID(fid);
      getList(fid);
      setGiftListID(fid);
    }
    if (state_id && !findid) {
      getList(list_id);
      setGiftListID(list_id);
    }
    if (state_id && subdToList(state_id) === true) {
      setSubd(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list_id]);

  useEffect(() => {
    
    //getList(list_id);
  }, [listDetails.items])

  useEffect(() => {
    getListTitleDate();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listDetails]);

  const getList = async (l_id) => {
    try {
      const response = await api.get(`list/items/${l_id}`);

      if (response.data.length > 0) {
        setGiftList(response.data[0].items);
        setListDetails(response.data[0]);
        if (response.data[0].user_id === state_id) {
          setGiftListOwner(true);
        }
      } else {
        history.push("/");
      }
    } catch (err) {
      history.push("/");
    }
  };

  const handleUpdate = () => {
    findID?getList(findID):getList(list_id);
  }

  const handleCardClick = (c_id) => {
    setbuttonsVisible({
      visible: true,
      id: c_id,
    });
  };

  const handleEditClick = () => {
    setEditTitle(true);
  };

  const handleEditDateClick = () => {
    setEditClosingDate(true);
  };

  const handleSaveDateClick = async () => {
    let ncd = new Date(newClosingDate);
    let datestring =
      ncd.getFullYear().toString() +
      "\\" +
      (ncd.getMonth() + 1).toString() +
      "\\" +
      ncd.getDate().toString();
    await api.put(`/list/${list_id}`, {
      name: listDetails.name,
      type: listDetails.type,
      user_id: listDetails.user_id,
      closing: datestring,
    });
    setEditClosingDate(false);
  };

  const handleSaveClick = async () => {
    await api.put(`/list/${list_id}`, {
      name: editTitleText,
      type: listDetails.type,
      user_id: listDetails.user_id,
      closing: listDetails.closing,
    });
    setEditTitle(false);
  };

  const handleEnterKey = async (e) => {
    if (e.key === "Enter") {
      setEditTitleText(editTitleText);
      await api.put(`/list/${list_id}`, {
        name: editTitleText,
        type: listDetails.type,
        user_id: listDetails.user_id,
        closing: listDetails.closing,
      });
      setEditTitle(false);
    }
  };

  const handleAddGiftBtn = async (li_id) => {
    history.push("/addgift");
  };

  const handleDeleteGiftListBtn = async (li_id) => {
    await axios.delete(`http://localhost:3001/api/v1/list/${li_id}`);
    history.push("/yourlists");
  };

  const handleShareGiftListBtn = async () => {
    var b = new Buffer.from(list_id.toString());
    var s = b.toString("base64");
    setShareVisible(true);
    setSharedURL(WEBSITE_URL + "/giftlist/" + s);
    // var d = new Buffer.from(s, "base64");
    // var e = d.toString();
  };

  const ownerList = () => {
    if (state_id === listDetails.user_id) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubscribe = async () => {
    if (loggedIn) {
      // Add to their subscribed list if not THEIR list
      if (!ownerList()) {
        await api.post(`subscribe`, {
          user_id: state_id,
          list_id: parseInt(findID),
        });
        history.push("/giftlists");
      } else {
        alert("You made this list...");
      }
    } else {
      // Prompt user to log in/register
      // Set the list to Pending Subscribe
      // Prompt user if they want to subscribe to pending list after Logged In
      history.push("/login");
    }
  };

  return (
    <>
      <Jumbo />
      {shareVisible && <ShareList url={sharedURL} />}
      {!shareVisible && (
        <div className="yourlist-container">
          <div className="yourlist">
            <div className="title">
              {editTitle && (
                <>
                  <input
                    className="edit-title-edit"
                    onKeyDown={(e) => handleEnterKey(e)}
                    onChange={(e) => setEditTitleText(e.target.value)}
                    value={editTitleText}
                    type="text"
                  ></input>{" "}
                  <div
                    className="edit-title-save-icon"
                    onClick={() => handleSaveClick()}
                  >
                    {saveIcon}
                  </div>
                </>
              )}
              {!editTitle && (
                <h1 className="edit-title">
                  {editTitleText}{" "}
                  <div
                    className="edit-title-edit-icon"
                    onClick={() => handleEditClick()}
                  >
                    {!findID && editIcon}
                  </div>
                </h1>
              )}
            </div>
            {!editClosingDate && (
              <div className="closing-date">
                <div className="closing-date-text">Closing Date:</div>
                <div className="closing-date-value">
                  {new Date(newClosingDate).toDateString()}
                </div>{" "}
                <div
                  className="edit-date-edit-icon"
                  onClick={() => handleEditDateClick()}
                >
                  {!findID && editIcon}
                </div>
              </div>
            )}
            {editClosingDate && (
              <div className="closing-date">
                <div className="closing-date-text">Closing Date:</div>
                <div className="closing-date-dp">
                  <DatePicker
                    className="form-control"
                    onChange={setNewClosingDate}
                    value={newClosingDate}
                    calendarIcon={null}
                    clearIcon={null}
                    format="dd/MM/yyyy"
                    minDate={new Date()}
                    required
                  />
                </div>{" "}
                <div
                  className="edit-date-edit-icon"
                  onClick={() => handleSaveDateClick()}
                >
                  {saveIcon}
                </div>
              </div>
            )}
            <div className="info">
              {!findid && (
                <>
                  Please add items to your list here. To share this list, press
                  the Share GIFTr List button.
                </>
              )}
              {findid && (
                <>
                  Select an item to reserve it and let others know you are
                  getting it. The 'Chip In' option allows you to let others know
                  you want to help with a gift.
                </>
              )}
            </div>
            <div>
              {!findID && ( // TODO: REVERT THIS TO !!
                <div className="owner-btn-container">
                  <button
                    className="btnCoffee-l std-btn"
                    onClick={() => handleAddGiftBtn()}
                  >
                    Add Gift
                  </button>
                  <button
                    className="btnCoffee-l std-btn"
                    onClick={() => handleShareGiftListBtn()}
                  >
                    Share GIFTr LIST
                  </button>
                  <button
                    className="btnCoffee-l-red std-btn"
                    onClick={() => handleDeleteGiftListBtn(list_id)}
                  >
                    Delete GIFTr LIST
                  </button>
                </div>
              )}
              {findID && !giftListOwner && !subd && (
                <div>
                  <button
                    className="btnCoffee-l btn_form mt-2"
                    onClick={() => handleSubscribe()}
                  >
                    SUBSCRIBE TO LIST
                  </button>
                </div>
              )}
            </div>
            {giftList.map((item) => {
              return (
                <div
                  key={item.id}
                  className="cardlisttable"
                  onClick={() => handleCardClick(item.id)}
                >
                  <GiftListCard
                    name={item.name}
                    id={item.id}
                    findid={findID}
                    list_id={giftListID}
                    user_id={listDetails.user_id}
                    cuser_id={state_id}
                    img={item.image_path}
                    desc={item.description}
                    price={item.price}
                    url={item.url}
                    handleUpdate={handleUpdate}
                    purchased={item.status}
                    buttonVisible={buttonsVisible}
                  />
                </div>
              );
            })}
            <div className="gl-glc"></div>
          </div>
        </div>
      )}
    </>
  );
};
