import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedGiftListItem } from "../../../../redux/user.slice";
import { useHistory } from "react-router-dom";

import "./GiftListCard.css";
import api from "../../../../api/user.api";
import axios from "axios";

export const GiftListCard = ({
  id,
  img,
  name,
  desc,
  price,
  url,
  buttonVisible,
  purchased,
  findid,
  user_id,
  list_id,
  handleDeleteUpdate,
}) => {
  const [showButtons, setShowButtons] = useState(false);
  const [listOwner, setListOwner] = useState(false);
  const [currentItem, setCurrentItem] = useState(0);

  const state_id = useSelector((state) => state.user.id);
  const loggedIn = useSelector((state) => state.user.loggedIn);

  const image_path = img;

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (buttonVisible.id === id) {
      showButtons ? setShowButtons(false) : setShowButtons(true);
    } else {
      setShowButtons(false);
    }
    // eslint-disable-next-line
  }, [buttonVisible]);

  useEffect(() => {
    if (user_id === state_id) {
      setListOwner(true);
    }
    if (state_id === 0) {
      setListOwner(false);
    }

    // eslint-disable-next-line
  }, [user_id]);

  const handleLinkBtnClick = () => {
    window.open(url, "_blank");
  };
  const handleEditBtnClick = async (id) => {
    await dispatch(setSelectedGiftListItem({ id }));
    history.push("/editGift");
  };

  const handleMoreInfoClick = async (id) => {
    await dispatch(setSelectedGiftListItem({ id }));
    history.push("/giftlistitem");
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/api/v1/listitem/${id}`)
    handleDeleteUpdate();
  }

  const handleReserveClick = async () => {
    if (loggedIn) {
      const updateItemValues = {
        list_id: parseInt(list_id),
        name: name,
        price: parseInt(price),
        url: url,
        description: desc,
        image_path: img,
        status: "Purchased",
      };
      console.log(updateItemValues);

      const response2 = await api.put(`/listitem/${id}`, updateItemValues);
      console.log(response2);

      const response = await api.post(`/purchase`, {
        user_id: user_id,
        listitem_id: id,
      });
      console.log(response);
      history.push("/giftlists");
    } else {
      history.push("/login");
    }
  };

  return (
    <div className="gfc-container">
      <div className="gfc-acard">
        <div className="gfc-acard-top">
          <div className="gfc-name-parent">{name}</div>
          <div className="wrap-catprice">
            {!purchased && !listOwner && (
              <div className="gfc-price-parent">${price}</div>
            )}
            {purchased && !listOwner && (
              <div className="gfc-purchased-parent">Reserved</div>
            )}
            {listOwner && <div className="gfc-purchased-parent">${price}</div>}
          </div>
        </div>

        <div className="gfc-acard-mid">
          <div className="gfc-icon-parent">
            <img className="gfc-icon" src={image_path} alt={name} />
          </div>
          <div className="gfc-desc-parent">{desc}</div>
        </div>
        <div className="gfc-acard-bot">
          {showButtons && listOwner && (
            <>
              {url && (
                <button
                  className="btnCoffee btn-acard-chipin"
                  onClick={() => handleLinkBtnClick()}
                >
                  Link
                </button>
              )}
              <button
                className="btnCoffee btn-acard-chipin"
                onClick={() => handleEditBtnClick(id)}
              >
                Edit
              </button>
              <button
                className="btnCoffee btn-acard-del"
                onClick={() => handleDelete(id)}
              >
                Delete
              </button>
            </>
          )}
          {showButtons && !listOwner && (
            <>
              <button
                className="btnCoffee btn-acard-chipin"
                onClick={() => handleMoreInfoClick(id)}
              >
                More Info
              </button>
              <button
                className="btnCoffee btn-acard-chipin"
                onClick={() => handleLinkBtnClick()}
              >
                Link
              </button>
              {purchased && <button
                className="btnCoffee btn-acard-chipin-o"
                onClick={() => alert("Chip In")}
              >
                Chip In
              </button>}
              {!purchased && (
                <>
                  <button
                    className="btnCoffee btn-acard-buy"
                    onClick={() => handleReserveClick()}
                  >
                    Reserve
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
