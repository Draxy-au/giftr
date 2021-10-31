import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { Jumbo } from "../Jumbo/Jumbo";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
// import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";

import "./AddGift.css";
import api from "../../api/user.api";
import newItemSchema from "../../schemas/newItem.schema";


import testImage from "../../assets/temp/StockShoe.png";

// name only here for mockup
export const EditGift = () => {
  const dollarIcon = <FontAwesomeIcon icon={faDollarSign} />;

  const [newItemId, setNewItemId] = useState(0);
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemDescription, setNewItemDescription] = useState("");
  const [newItemUrl, setNewItemUrl] = useState("");
  const [newItemImagePath, setNewItemImagePath] = useState("");
  const [regServerErrors, setRegServerError] = useState([]);

  // const history = useHistory();

  // const dispatch = useDispatch();

  const list_id = useSelector((state) => state.user.selectedGiftList);
  const listitem_id = useSelector((state) => state.user.selectedGiftListItem);

  const getListItem = async (l_id) => {
    const response = await api.get(`/listitem/${l_id}`);
    setNewItemId(response.data.id);
    setNewItemName(response.data.name);
    setNewItemPrice(response.data.price);
    setNewItemDescription(response.data.description);
    setNewItemUrl(response.data.url);
    setNewItemImagePath("/images/" + response.data.image_path);

  }

  useEffect(() => {
    console.log("list_id: ", list_id)
    console.log("listitem_id: ", listitem_id)
    if (listitem_id){
      console.log("editting! ", listitem_id)
      getListItem(listitem_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list_id]);

  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: yupResolver(newItemSchema),
  });

  const submitForm = async (formData) => {
    console.log("entered submit form")
    const newItem = {
      list_id: list_id,
      name: formData.name,
      price: formData.price,
      description: formData.description,
      url: formData.url,
      image_path: "",
    };

    try {
      console.log(await api.post("/listitem", newItem));
    } catch (err) {
      if (err.response.data.errors) {
        console.log(regServerErrors)
        return setRegServerError(err.response.data.errors);
      } else {
        return setRegServerError([err.response.data]);
      }
    }
  }

  const handleImageClick = () => {
    const image_path = "1.png";
    setNewItemImagePath(image_path);
    console.log(newItemImagePath);
  }


  return (
    <>
      <Jumbo />
      <div className="addgift-container">
        <div className="addgift">
          <div className="addgift-title">
            <h1>{}</h1>
          </div>
          <div className="addgift-info">
            Fill in the fields below to add a gift to your list.
          </div>
          <form className="form" onSubmit={handleSubmit(submitForm)}>
            <div className="form-group">
              <label htmlFor="name">Name of Gift </label>
              <input type="text" id="name" name="name" {...register("name", { required: true })} value={newItemName} onChange={((e)=>setNewItemName(e.target.value))} />
              <div className="form-errors">
                {errors.name && <p>Please enter a valid name.</p>}
              </div>
            </div>

            <div className="form-group-price">
              <label htmlFor="price">Gift Price </label>
              <div className="price-row"><div className="moneyIcon">{dollarIcon}</div><input className="form-group-price-input" type="text" id="price" name="price" {...register("price", { required: true })} value={newItemPrice} onChange={((e)=>setNewItemPrice(e.target.value))} /></div>
              <div className="form-errors">
                {errors.price && <p>Please enter a valid price.</p>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="desc">Description </label>
              <textarea rows="3" id="desc" name="desc" {...register("description", { required: false })} value={newItemDescription} onChange={((e)=>setNewItemDescription(e.target.value))} />
              <div className="form-errors">
                {errors.description && <p>Please enter a valid description.</p>}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="url">Link to Gift (optional) </label>
              <input type="text" id="url" name="url" {...register("url", { required: false })} value={newItemUrl} onChange={((e)=>setNewItemUrl(e.target.value))} />
              <div className="form-errors">
                {errors.url && <p>Please enter a valid url.</p>}
              </div>
            </div>
            <div className="addgift-form-image">
              <label htmlFor="image">Add a Gift Image? (optional) </label>
              <div className="addgift-form-btnimage">
                <span className="wrap-img"><img className="addgift-form-btnimage-img" src={newItemImagePath} alt="" /></span>
                <button className="btnCoffee btn btn-addgift-chooseimage" onClick={()=>handleImageClick}>Choose Image</button>
                <div className="form-errors">
                
                </div>
              </div>
            </div>
            <div className="form-add-button">
              <button className="btnCoffee btn-addgift-add" type="submit">Save Gift</button>
            </div>
          </form>

        </div>
      </div>
    </>
  )
}
