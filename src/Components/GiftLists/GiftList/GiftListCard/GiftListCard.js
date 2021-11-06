import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedGiftListItem } from "../../../../redux/user.slice";
import { useHistory } from "react-router-dom";

import "./GiftListCard.css";
import api from "../../../../api/user.api";

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
}) => {
  const [showButtons, setShowButtons] = useState(false);
  const [listOwner, setListOwner] = useState(false);

  const state_id = useSelector((state) => state.user.id);
  const loggedIn = useSelector((state) => state.user.loggedIn);

  const image_path = findid ? "../images/" + img : "images/" + img;

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
      console.log("user_id:", user_id);
      console.log("state_id:", state_id);
      setListOwner(true);
    }
    if (state_id === 0) {
      setListOwner(false);
    }

    // eslint-disable-next-line
  }, [state_id]);

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
            {!purchased && !findid && (
              <div className="gfc-price-parent">${price}</div>
            )}
            {purchased === "Purchased" && !findid && (
              <div className="gfc-purchased-parent">Reserved</div>
            )}
            {purchased === "Purchased" && findid && (
              <div className="gfc-purchased-parent">Reserved</div>
            )}
            {purchased !== "Purchased" && findid && (
              <div className="gfc-price-parent">${price}</div>
            )}
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
                onClick={() => alert("Delete")}
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
              {!purchased && (
                <>
                  <button
                    className="btnCoffee btn-acard-chipin"
                    onClick={() => alert("Chip In")}
                  >
                    Chip In
                  </button>
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
