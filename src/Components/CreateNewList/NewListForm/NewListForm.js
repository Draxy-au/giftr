import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import DatePicker from "react-date-picker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFeatherAlt,
  faCalendarAlt,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import newListSchema from "../../../schemas/newList.schema";

import "./NewListForm.css";
import api from "../../../api/user.api";
import "../../../constants/api";

export const NewListForm = ({ type, icon, title }) => {
  const listIcon = <FontAwesomeIcon icon={faFeatherAlt} />;
  const calIcon = <FontAwesomeIcon icon={faCalendarAlt} />;
  const descIcon = <FontAwesomeIcon icon={faInfo} />;

  const [formName, setFormName] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formDate, setFormDate] = useState(new Date());
  const [regServerErrors, setRegServerError] = useState([]);

  const id = useSelector((state) => state.user.id);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(newListSchema),
  });

  const submitForm = async (formData) => {
    let datestring = formDate.getFullYear().toString() + "\\" + (formDate.getMonth()+1).toString() + "\\" + formDate.getDate().toString();
    
    const newList = {
      user_id: id,
      name: formData.name,
      type: type,
      description: formData.description,
      closing: datestring,
    };

    try {
      await api.post("/list", newList);
    } catch (err) {
      if (err.response.data.errors) {
        return setRegServerError(err.response.data.errors);
      } else {
        return setRegServerError([err.response.data]);
      }
    }
    history.push('/yourlists');
  };

  const handleFormName = (e) => {
    setFormName(e.target.value);
  };

  const handleFormDesc = (e) => {
    setFormDesc(e.target.value);
  };

  return (
    <div className="form-container">
      <div className="icon-form-parent">
        <div className="text-icon">{icon}</div>
        <div className="title">{title} List</div>
      </div>
      <form className="form" onSubmit={handleSubmit(submitForm)}>
        <div className="form-group">
          <label>List Name</label>
          <div className="form-grouping">
            <div className="text-icon">{listIcon}</div>
            <input
              id="Form-ListName"
              type="text"
              maxLength="60"
              {...register("name", { required: true })}
              placeholder="Enter a descriptive name"
              value={formName}
              onChange={handleFormName}
              required
            />
          </div>
          <div className="form-errors">
            {errors.name && <p>Please enter a valid List Name.</p>}
          </div>
        </div>

        <div className="form-group">
          <label>Please describe this list for guests</label>
          <div className="form-grouping">
            <div className="text-icon">{descIcon}</div>
            <input
              id="Form-ListDesc"
              type="textarea"
              maxLength="350"
              {...register("description", { required: true })}
              placeholder="To celebrate..."
              value={formDesc}
              onChange={handleFormDesc}
            />
          </div>
          <div className="form-errors">
            {errors.description && <p>Please enter a valid Description.</p>}
          </div>
        </div>

        <div className="form-group">
          <label>What date will the list close?</label>
          <div className="form-grouping">
            <div className="text-icon">{calIcon}</div>
            <DatePicker
              className="form-control"
              onChange={setFormDate}
              value={formDate}
              calendarIcon={null}
              clearIcon={null}
              format="dd/MM/yyyy"
              minDate={new Date()}
              required
            />
          </div>

          <div className="form-server-errors">
            {regServerErrors?.map((error) => {
              return <p key={error.id}>{error}</p>;
            })}
          </div>
          <button className="btnCoffee btn_form" type="submit">
            Create New {title} List!
          </button>
        </div>
      </form>
    </div>
  );
};
