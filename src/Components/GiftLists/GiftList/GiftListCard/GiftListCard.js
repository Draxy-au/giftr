import React, { useEffect, useState } from "react";

import "./GiftListCard.css";

export const GiftListCard = ({
  id,
  img,
  name,
  desc,
  price,
  category,
  url,
  buttonVisible,
  owner
}) => {
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    if (buttonVisible.id.toString() === id) {
      showButtons ? setShowButtons(false) : setShowButtons(true);
    } else {
      setShowButtons(false);
    }
    // eslint-disable-next-line
  }, [buttonVisible]);

  const handleLinkBtnClick = () => {
    window.open(url, "_blank");
  }

  return (
    <>
      <div className="gfc-container">
        <div className="gfc-acard">
          <div className="gfc-acard-top">
            <div className="gfc-name-parent">{name}</div>
            <div className="wrap-catprice">
              <div className="gfc-category-parent">{category}</div>
              <div className="gfc-price-parent">${price}</div>
            </div>
          </div>

          <div className="gfc-acard-mid">
            <div className="gfc-icon-parent">
              <img className="gfc-icon" src={img} alt={name} />
            </div>
            <div className="gfc-desc-parent">{desc}</div>
          </div>
          <div className="gfc-acard-bot">
            {showButtons && owner && (
              <>
                <button
                  className="btnCoffee btn-acard-chipin"
                  onClick={() => alert("Edit")}
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
            {showButtons && !owner && (
              <>
                <button
                  className="btnCoffee btn-acard-chipin"
                  onClick={() => alert("More Info")}
                >
                  More Info
                </button>
                <button
                  className="btnCoffee btn-acard-chipin"
                  onClick={() => handleLinkBtnClick()}
                >
                  Link
                </button>
                <button
                  className="btnCoffee btn-acard-chipin"
                  onClick={() => alert("Chip In")}
                >
                  Chip In
                </button>
                <button
                  className="btnCoffee btn-acard-buy"
                  onClick={() => alert("Buy")}
                >
                  Buy
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
