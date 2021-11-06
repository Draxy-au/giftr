import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { Jumbo } from "../Jumbo/Jumbo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
// import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";

import "./AddGift.css";
import api from "../../api/user.api";
import { useHistory } from 'react-router';

// name only here for mockup
export const EditGift = () => {
  const dollarIcon = <FontAwesomeIcon icon={faDollarSign} />;

  // eslint-disable-next-line no-unused-vars
  const [newItemId, setNewItemId] = useState(0);
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('');
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemDescription, setNewItemDescription] = useState("");
  const [newItemUrl, setNewItemUrl] = useState("");
  const [newItemImagePath, setNewItemImagePath] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [regServerErrors, setRegServerError] = useState([]);

  const history = useHistory();

  const list_id = useSelector((state) => state.user.selectedGiftList);
  const listitem_id = useSelector((state) => state.user.selectedGiftListItem);

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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listitem_id]);

  const handleSubmitClick = async () => {
    await getListItem(listitem_id);
    const updatedItem = {
      list_id: list_id,
      name: newItemName,
      price: parseFloat(newItemPrice),
      description: newItemDescription,
      url: newItemUrl,
      image_path: listitem_id + ".png",
    };
    try {
      const response = await api.put(`/listitem/${listitem_id}`, updatedItem);
      console.log(response)
      if (fileName) {
        await api.post('/upload/new', {
          tempFileName: fileName,
          newFileName: response.data.id + '.png',
        });
        console.log("image uploaded")
      }
      history.push('/giftlist');
    } catch (err) {
      console.log(err)
      if (err.response.data.errors) {
        return setRegServerError(err.response.data.errors);
      } else {
        return setRegServerError([err.response.data]);
      }
    }
    history.push('/giftlist');
  }

  const handleImageClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    if (fileName) {
      try {
        const res = await api.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(res);
        const { fileName } = res.data;
        setNewItemImagePath('/images/temp/' + fileName);
      } catch (err) {
        console.log(err);
      }
    }
    
  }

  const handleRemoveImageClick = async (e) => {
    e.preventDefault();
    const defaultImage = {
      newFileName: listitem_id + '.png',
    };

    console.log(defaultImage);
    try {
      const tester = await api.post('/upload/newd', defaultImage);
      console.log(tester);
      alert(tester);
    } catch (err) {
      console.log("error setting default image: ", err);
    }
    
  }

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  }

  return (
    <>
      <Jumbo />
      <div className="addgift-container">
        <div className="addgift">
          <div className="addgift-title">
            <h1>{ }</h1>
          </div>
          <div className="addgift-info">
            Fill in the fields below to add a gift to your list.
          </div>
          <form className="form">
            <div className="form-group">
              <label htmlFor="name">Name of Gift </label>
              <input type="text" id="name" name="name" value={newItemName} onChange={((e) => setNewItemName(e.target.value))} />
            </div>

            <div className="form-group-price">
              <label htmlFor="price">Gift Price </label>
              <div className="price-row"><div className="moneyIcon">{dollarIcon}</div><input className="form-group-price-input" type="text" id="price" name="price"  value={newItemPrice} onChange={((e) => setNewItemPrice(e.target.value))} /></div>
            </div>

            <div className="form-group">
              <label htmlFor="desc">Description </label>
              <textarea rows="3" id="desc" name="desc"  value={newItemDescription} onChange={((e) => setNewItemDescription(e.target.value))} />
            </div>
            <div className="form-group">
              <label htmlFor="url">Link to Gift (optional) </label>
              <input type="text" id="url" name="url"  value={newItemUrl} onChange={((e) => setNewItemUrl(e.target.value))} />
            </div>
            <div className="addgift-form-image">
              <label htmlFor="image">Add a Gift Image? (optional) </label>
              <div className="addgift-form-btnimage">
                <span className="wrap-img"><img className="addgift-form-btnimage-img" src={newItemImagePath} alt="" /></span>
                <input type='file' onChange={(e) => { onChange(e) }} />
                <div className="image-buttons">
                  <button type="button" className="btnCoffee btn btn-addgift-chooseimage" onClick={(e) => handleImageClick(e)}>Upload Image</button>
                  <button type="button" className="btnCoffee btn btn-addgift-chooseimage-o" onClick={(e) => handleRemoveImageClick(e)}>Remove Image</button>
                </div>
              </div>
            </div>
            <div className="form-add-button">
              <button className="btnCoffee btn-addgift-add" type="button" onClick={() => handleSubmitClick()}>Save Gift</button>
            </div>
          </form>

        </div>
      </div>
    </>
  )
}
