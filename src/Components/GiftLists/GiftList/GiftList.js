import React, { useEffect, useState } from "react";
import { Jumbo } from "../../Jumbo/Jumbo";
import { useSelector } from "react-redux";
import api from "../../../api/user.api";

import "./GiftList.css";

import { GiftListCard } from "./GiftListCard/GiftListCard";
import { useHistory } from "react-router";

export const GiftList = () => {
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

  useEffect(() => {
    if (state_id){
      getList(list_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state_id]);

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

  const handleAddGiftBtn = () => {
    history.push("/addgift");
  }

  return (
    <>
      <Jumbo />
      <div className="yourlist-container">
        <div className="yourlist">
          <div className="title">
            <h1>{listDetails.name}</h1>
          </div>
          <div>
            {giftListOwner && ( // TODO: REVERT THIS TO !!
              <div className="owner-btn-container">
                <button className="btnCoffee-l std-btn" onClick={()=>handleAddGiftBtn()}>Add Gift</button>
                <button className="btnCoffee-l std-btn">Re-Order Gifts</button>
                <button className="btnCoffee-l std-btn">
                  Upload Gift List
                </button>
                <button className="btnCoffee-l std-btn">
                  Delete Category
                </button>
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
                <button className="btnCoffee std-btn">
                  Sort By Category
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
