import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { Jumbo } from "../../../Jumbo/Jumbo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from 'react-router';

import "./GiftListItemInfo.css";
import api from "../../../../api/user.api";


// name only here for mockup
export const GiftListItemInfo = () => {
  const dollarIcon = <FontAwesomeIcon icon={faDollarSign} />;

  const [newItemId, setNewItemId] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemDescription, setNewItemDescription] = useState("");
  const [newItemUrl, setNewItemUrl] = useState("");
  const [newItemImagePath, setNewItemImagePath] = useState("");

  const listitem_id = useSelector((state) => state.user.selectedGiftListItem);

  const history = useHistory();

  const getListItem = async (l_id) => {
    const response = await api.get(`/listitem/${l_id}`);
    await setNewItemId(response.data.id);
    await setNewItemName(response.data.name);
    await setNewItemPrice(response.data.price);
    await setNewItemDescription(response.data.description);
    await setNewItemUrl(response.data.url);
    await setNewItemImagePath("/images/" + response.data.id + ".png");
  }

  useEffect(() => {
    if (listitem_id) {
      getListItem(listitem_id);
    } else {
      history.push('/giftlists')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listitem_id]);

  return (
    <>
      <Jumbo />
      <div className="container">
        <div className="giftListItemInfo">
          <div className="title">
            <h1>{ }</h1>
          </div>
          
             <button className="btnCoffee std-btn">Reserve</button><button className="btnCoffee std-btn">Chip In</button>
          
          <div className="gli">
            <div className="gli-name">
              <label><span className="gli-header">{newItemName}</span></label>
            </div>
            <div className="gli-image">
            <span className="gli-header"></span> <img className="gli-image-img" src={newItemImagePath} alt="" />
            </div>
            <div className="gli-price">
              <div className="price-row"><div className="moneyIcon"><span className="gli-header">Price:</span>  {dollarIcon}</div><span className="gli-header"><label>{newItemPrice}</label></span></div>
            </div>
            <div className="gli-url">
            <span className="gli-header">Link:</span> <label>{newItemUrl} </label>
            </div>
            <div className="gli-description">
            <span className="gli-header">Description:</span> <label>{newItemDescription} </label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
