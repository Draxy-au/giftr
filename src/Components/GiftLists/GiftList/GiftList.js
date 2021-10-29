import React, { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { Jumbo } from "../../Jumbo/Jumbo";

import "./GiftList.css";

import stockImage from "../../../assets/temp/StockShoe.png";

import { GiftListCard } from "./GiftListCard/GiftListCard";
import { useHistory } from "react-router";

export const GiftList = ({ name, owner }) => {
  const history = useHistory();

  const [buttonsVisible, setButtonsVisible] = useState({
    visible: false,
    id: 0,
  });

  const handleCardClick = (id) => {
    setButtonsVisible({
      visible: true,
      id: id,
    });
  };

  const handleAddGiftBtn = () => {
    history.push("/addgift");
  }

  return (
    <>
      <Jumbo />
      <div className="yourlist-container">
        <div className="yourlist">
          <div className="title">
            <h1>{name}</h1>
          </div>
          <div>
            {owner && (
              <ButtonGroup>
                <Button className="btnCoffee btn-ylcard" onClick={()=>handleAddGiftBtn()}>Add Gift</Button>
                <Button className="btnCoffee btn-ylcard">Re-Order Gifts</Button>
                <Button className="btnCoffee btn-ylcard">
                  Upload Gift List
                </Button>
                <Button className="btnCoffee btn-ylcard">
                  Delete Category
                </Button>
              </ButtonGroup>
            )}
            {!owner && (
              <ButtonGroup>
                <Button className="btnCoffee btn-ylcard">
                  Sort By Price (Low-High)
                </Button>
                <Button className="btnCoffee btn-ylcard">
                  Sort By Price (High-Low)
                </Button>
                <Button className="btnCoffee btn-ylcard">
                  Sort By Category
                </Button>
              </ButtonGroup>
            )}
          </div>
          <div className="gl-glc">
            <div onClick={() => handleCardClick(1)}>
              <GiftListCard
                name="Hoka One One Men's Elevon 2 Running Shoes - Ombre
              Blue/Saffron"
                id="1"
                owner={owner}
                img={stockImage}
                desc="Built to go fast and far, the Elevon 2 is a responsive, everyday trainer with an energised underfoot feel that is unquestionably Hoka! Sporting a PROFLY midsole for cushioned landings, engineered mesh upper for superior breathability and a rubber outsole with strategic forefoot grooving to increase flexibility during toe-off, this lightweight pair is packed with the advanced tech required for a daily dose of speed and comfort!"
                price="199.99"
                category="Shoes"
                url="https://www.catch.com.au/event/most-wanted-sports-footwear-155698/product/hoka-one-one-mens-elevon-2-running-shoes-ombre-blue-saffron-8199939"
                purchased={false}
                buttonVisible={buttonsVisible}
              />
            </div>
            <div onClick={() => handleCardClick(2)}>
              <GiftListCard
                name="Hoka One One Men's Elevon 2 Running Shoes - Ombre
              Blue/Saffron"
                id="2"
                owner={owner}
                img={stockImage}
                desc="Built to go fast and far, the Elevon 2 is a responsive, everyday trainer with an energised underfoot feel that is unquestionably Hoka! Sporting a PROFLY midsole for cushioned landings, engineered mesh upper for superior breathability and a rubber outsole with strategic forefoot grooving to increase flexibility during toe-off, this lightweight pair is packed with the advanced tech required for a daily dose of speed and comfort!"
                price="4989.99"
                category="Shoes"
                url="https://www.catch.com.au/event/most-wanted-sports-footwear-155698/product/hoka-one-one-mens-elevon-2-running-shoes-ombre-blue-saffron-8199939"
                purchased={false}
                buttonVisible={buttonsVisible}
              />
            </div>
            <div onClick={() => handleCardClick(3)}>
              <GiftListCard
                name="Hoka One One Men's Elevon 2 Running Shoes - Ombre
              Blue/Saffron"
                id="3"
                owner={owner}
                img={stockImage}
                desc="Built to go fast and far, the Elevon 2 is a responsive, everyday trainer with an energised underfoot feel that is unquestionably Hoka! Sporting a PROFLY midsole for cushioned landings, engineered mesh upper for superior breathability and a rubber outsole with strategic forefoot grooving to increase flexibility during toe-off, this lightweight pair is packed with the advanced tech required for a daily dose of speed and comfort!"
                price="49.99"
                category="Shoes"
                url="https://www.catch.com.au/event/most-wanted-sports-footwear-155698/product/hoka-one-one-mens-elevon-2-running-shoes-ombre-blue-saffron-8199939"
                purchased={true}
                buttonVisible={buttonsVisible}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
