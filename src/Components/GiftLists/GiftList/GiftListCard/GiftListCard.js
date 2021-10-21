import React, { useEffect, useState } from "react";

import "./GiftListCard.css";

export const GiftListCard = ({ id, img, name, desc, price, category, buttonVisible }) => {

  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    if (buttonVisible.id.toString() === id) {
      showButtons?setShowButtons(false):setShowButtons(true);
    }
    else {
      setShowButtons(false);
    }
    
  }, [buttonVisible])

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
            <div className="gfc-desc-parent">
              {desc}
            </div>
          </div>
          <div className="gfc-acard-bot">
              { showButtons &&
                <>
                  <button className="btnCoffee btn-acard" onClick={() => alert("EDIT")}>Edit</button>
                  <button className="btnCoffee btn-acard-del" onClick={() => alert("DELETE")}>Delete</button>
                </>
              }
          </div>
        </div>
      </div>
    </>
  );
};
