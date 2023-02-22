import React, { Fragment, useEffect, useState } from "react";
import "./CreateEvent.css";
import {clearErrors,createEvent, getUSerEvent} from "../../../actions/eventAction"
import { Button } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import MetData from "../MetData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAlert } from "react-alert";
import {useSelector,useDispatch} from 'react-redux'
import Loader from "../loading/Loader";
import { CREATE_EVENT_RESET } from "../../../constants/eventConsts";
import { useNavigate } from "react-router-dom";
const CreateEvent = () => {
  const dispatch=useDispatch();
  const alert=useAlert();
  const nav=useNavigate();
  const {loading,message,error}=useSelector(state=>state.createEvent);
  const {events}=useSelector(state=>state.events)

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());



  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const d2 = new Date(startDate);
    const d4 = new Date(endDate);

    if (d2 <= d4) {
      const newEvent = {
        title:title +`(${ type})`,
        type,
        startDate,
        endDate
      };
      console.log(newEvent);
      dispatch(createEvent(newEvent))
    }else{
      alert.error(`end Date Must Be Greater then ${String(startDate).substr(0,10)}`)
    }

  };
  const {isAuthenticated}=useSelector(sta=>sta.user)
  useEffect(()=>{
    if(error){
      alert.error(error)
      dispatch(clearErrors())
      
    }
    if (isAuthenticated) {
      dispatch(getUSerEvent())
    }
    if(message){
      alert.success(message)
      nav('/')
      dispatch({type:CREATE_EVENT_RESET})
  }
  },[error,message])
  return (
<>
{
  loading?<Loader/>:(
    <Fragment>
    <MetData title="Add Event" />
    <div className="dashboard">
      <div className="newProductContainer">
        <form
          className="createProductForm"
          encType="multipart/form-data"
          onSubmit={handleFormSubmit}
        >
          <h1>Create Event</h1>

          <div>
            <SpellcheckIcon />
            <input
              type="text"
              placeholder="Event Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <AttachMoneyIcon />
            <DatePicker
        id="startDate"
        className="datapickers"
        selected={startDate}
        onChange={handleStartDateChange}
      />
          </div>

          <div>
            <DescriptionIcon />
            <DatePicker
            className="datapickers"
        id="endDate"
        selected={endDate}
        onChange={handleEndDateChange}
      />
          </div>

          <div>
            <AccountTreeIcon />
            <select onChange={e=>setType(e.target.value)}>
            <option value={""}>Select Event Type</option>
              <option value={"public"}>public</option>
              <option value={"private"}>private</option>
            </select>
          </div> 



          <Button
            id="createProductBtn"
            type="submit"
            disabled={loading ? true : false}
          >
            Create
          </Button>
        </form>
      </div>
    </div>
  </Fragment>
  )
}
</>
  );
};

export default CreateEvent;