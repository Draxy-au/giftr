import React, { useEffect, useState } from "react";
import { Jumbo } from "../../Jumbo/Jumbo";
import { useSelector } from "react-redux";
import api from "../../../api/user.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import "./GiftList.css";

import { GiftListCard } from "./GiftListCard/GiftListCard";
import { useHistory } from "react-router";

export const GiftList = () => {
  const editIcon = <FontAwesomeIcon icon={faEdit} />;
  const saveIcon = <FontAwesomeIcon icon={faSave} />;

  const history = useHistory();

  const loggedIn = useSelector((state) => state.user.loggedIn);
  const state_id = useSelector((state) => state.user.id);
  const list_id = useSelector((state) => state.user.selectedGiftList);

  const [buttonsVisible, setbuttonsVisible] = useState({
    visible: false,
    id: 0,
  });
  const [listDetails, setListDetails] = useState([]);
  const [giftList, setGiftList] = useState([]);
  const [giftListOwner, setGiftListOwner] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [editTitleText, setEditTitleText] = useState("");

  const getListTitle = async() => {
    setEditTitleText(listDetails.name);
  }

  useEffect(() => {
    if (state_id){
      getList(list_id);
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state_id]);

  useEffect(() => {
    getListTitle();    
    console.log("listDetails.name:",listDetails.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listDetails]);

  const getList = async (l_id) => {
    console.log("In getList: ", list_id);
    const response = await api.get(`list/items/${l_id}`);
    console.log(response);
    if (response.data.length > 0) {
      setGiftList(response.data[0].items);
      setListDetails(response.data[0]);
      if (response.data[0].user_id === state_id) {
        setGiftListOwner(true);
      }
    }
  }

  const handleCardClick = (c_id) => {
    setbuttonsVisible({
      visible: true,
      id: c_id,
    });
  };

  const handleEditClick = () => {
    setEditTitle(true);
  }

  const handleSaveClick = async () => {
    await api.put(`/list/${list_id}`, {
      "name": editTitleText,
      "type": listDetails.type,
      "user_id": listDetails.user_id,
      "closing": listDetails.closing,
    });
    setEditTitle(false);
  }

  const handleEnterKey = async (e) => {
    if (e.key === 'Enter') {
      setEditTitleText(editTitleText);
      await api.put(`/list/${list_id}`, {
        "name": editTitleText,
        "type": listDetails.type,
        "user_id": listDetails.user_id,
        "closing": listDetails.closing,
      });
      setEditTitle(false);
    }
  }

  const handleAddGiftBtn = () => {
    history.push("/addgift");
  }

  return (
    <>
      <Jumbo />
      <div className="yourlist-container">
        <div className="yourlist">
          <div className="title">
            { editTitle &&
              <><input className="edit-title-edit" onKeyDown={(e) => handleEnterKey(e)} onChange={(e) => setEditTitleText(e.target.value)} value={editTitleText} type="text" ></input> <div className="edit-title-save-icon" onClick={()=>handleSaveClick()}>{saveIcon}</div></>
            }
            { !editTitle &&
              <h1 className="edit-title" >{editTitleText} <div className="edit-title-edit-icon" onClick={()=>handleEditClick()}>{editIcon}</div></h1>
            }
          </div>
          <div>
            Closing Date: {listDetails && new Date(listDetails.closing).toDateString()}
          </div>
          <div className="info">
            Please add items to your list here. To share this list, press the Share GIFTr List button.
          </div>
          <div>
            {giftListOwner && ( // TODO: REVERT THIS TO !!
              <div className="owner-btn-container">
                <button className="btnCoffee-l std-btn" onClick={()=>handleAddGiftBtn()}>Add Gift</button>
                <button className="btnCoffee-l std-btn">Share GIFTr LIST</button>
              </div>
            )}
            {!giftListOwner && (
              <div>
                <button className="btnCoffee std-btn">
                  Sort By Price (Low-High)
                </button>
                <button className="btnCoffee std-btn">
                  Sort By Price (High-Low)
                </button>
              </div>
            )}
          </div>
          {
            giftList.map((item) => {
              return (
                
                <div key={item.id} onClick={() => handleCardClick(item.id)}>
                  <GiftListCard
                    name={item.name}
                    id={item.id}
                    owner="TODO_ID"
                    img={item.image_path}
                    desc={item.description}
                    price={item.price}
                    url={item.url}
                    purchased={item.status}
                    buttonVisible={buttonsVisible}
                  />
                </div>
                
              )
            })
          }
          <div className="gl-glc">
            

            
          </div>
        </div>
      </div>
    </>
  );
};
