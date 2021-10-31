import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedGiftListItem } from "../../../../redux/user.slice";
import { useHistory } from "react-router-dom";
import "./GiftListCard.css";


export const GiftListCard = ({
  id,
  img,
  name,
  desc,
  price,
  url,
  buttonVisible,
  purchased,
  owner
}) => {
  const [showButtons, setShowButtons] = useState(false);

  const image_path = "images/"+ img; 

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

  const handleLinkBtnClick = () => {
    window.open(url, "_blank");
  }
  const handleEditBtnClick = async (id) => {
    await dispatch(setSelectedGiftListItem({id}));
    history.push('/editGift');
  }

  return (
    <>
      <div className="gfc-container">
        <div className="gfc-acard">
          <div className="gfc-acard-top">
            <div className="gfc-name-parent">{name}</div>
            <div className="wrap-catprice">
              
              { !purchased && !owner &&
                <div className="gfc-price-parent">${price}</div>
              }
              { purchased && !owner &&
                <div className="gfc-purchased-parent">Purchased</div>
              }
              { owner &&
                <div className="gfc-price-parent">${price}</div>
              }
            </div>
          </div>

          <div className="gfc-acard-mid">
            <div className="gfc-icon-parent">
              <img className="gfc-icon" src={image_path} alt={name} />
            </div>
            <div className="gfc-desc-parent">{desc}</div>
          </div>
          <div className="gfc-acard-bot">
            {showButtons && owner && (
              <>
                <button
                  className="btnCoffee btn-acard-chipin"
                  onClick={() => handleLinkBtnClick()}
                >
                  Link
                </button>
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
                { !purchased && 
                <>
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
                }
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
