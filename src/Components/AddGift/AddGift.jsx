import React from 'react'

import "./AddGift.css";

import testImage from "../../assets/temp/StockShoe.png"

// name only here for mockup
export const AddGift = ({ id, name }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="addgift-container">
      <div className="addgift">
        <div className="addgift-title">
          <h1>{name}</h1>
        </div>
        <div className="addgift-info">
          Fill in the fields below to add a gift to your list.
        </div>
        <form className="addgift-form" onSubmit={()=>handleSubmit()}>
          <div className="addgift-form-name">
            <label for="name">Name of Gift </label>
            <input type="text" id="name" name="name" />
          </div>
          <div className="addgift-form-catprice">
            <div className="addgift-form-category">
              <label for="category">Gift Category (optional)</label>
              <input type="text" id="category" name="category" />
            </div>
            <div className="addgift-form-price">
              <label for="price">Gift Price </label>
              <input type="text" id="price" name="price" />
            </div>
          </div>
          <div className="addgift-form-desc">
            <label for="desc">Description </label>
            <textarea rows="3" id="desc" name="desc" />
          </div>
          <div className="addgift-form-url">
            <label for="url">Link to Gift (optional) </label>
            <input type="text" id="url" name="url" />
          </div>
          <div className="addgift-form-image">
            <label for="image">Add a Gift Image? (optional) </label>
            <div className="addgift-form-btnimage">
              <span className="wrap-img"><img className="addgift-form-btnimage-img" src={testImage} alt="" /></span>
              <button className="btnCoffee btn btn-addgift-chooseimage">Choose Image</button>
            </div>
          </div>
        </form>
        <div className="form-add-button">
          <button className="btnCoffee btn-addgift-add">Save Gift</button>
        </div>
      </div>
    </div>
  )
}
