import React, { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { Jumbo } from "../../Jumbo/Jumbo";

import "./GiftList.css";

import stockImage from "../../../assets/temp/StockShoe.png";

import { GiftListCard } from "./GiftListCard/GiftListCard";

export const GiftList = ({ name }) => {
  const [buttonVisible, setButtonsVisible] = useState({
    visible: false,
    id: 0,
  });

  const handleCardClick = (id) => {
    setButtonsVisible({
      visible: true,
      id: id,
    });
  };

  return (
    <>
      <Jumbo />
      <div className="yourlist-container">
        <div className="yourlist">
          <div className="yourlist-title">
            <h1>{name}</h1>
          </div>
          <div>
            <ButtonGroup>
              <Button className="btnCoffee btn-ylcard">Add Gift</Button>
              <Button className="btnCoffee btn-ylcard">Re-Order Gifts</Button>
              <Button className="btnCoffee btn-ylcard">Upload Gift List</Button>
              <Button className="btnCoffee btn-ylcard">Delete Category</Button>
            </ButtonGroup>
          </div>
          <div className="gl-glc">
            <div onClick={() => handleCardClick(1)}>
              <GiftListCard
                name="Hoka One One Men's Elevon 2 Running Shoes - Ombre
              Blue/Saffron"
                id="1"
                
                img={stockImage}
                desc="it's a while back since I wrote this, but it
              doesn't make sense to set a tablecell to 50% of the
              row-height. In my example you can actually leave out the
              height"
                price="1049.99"
                category="Shoes"
                buttonVisible={buttonVisible}
              />
            </div>
            <div onClick={() => handleCardClick(2)}>
              <GiftListCard
                name="Hoka One One Men's Elevon 2 Running Shoes - Ombre
              Blue/Saffron"
                id="2"
                
                img={stockImage}
                desc="it's a while back since I wrote this, but it
              doesn't make sense to set a tablecell to 50% of the
              row-height. In my example you can actually leave out the
              height"
                price="49.99"
                category="Shoes"
                buttonVisible={buttonVisible}
              />
            </div>
            <div onClick={() => handleCardClick(3)}>
              <GiftListCard
                name="Hoka One One Men's Elevon 2 Running Shoes - Ombre
              Blue/Saffron"
                id="3"
                
                img={stockImage}
                desc="it's a while back since I wrote this, but it
              doesn't make sense to set a tablecell to 50% of the
              row-height. In my example you can actually leave out the
              height"
                price="49.99"
                category="Shoes"
                buttonVisible={buttonVisible}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
