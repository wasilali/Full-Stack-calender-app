import React, { Fragment, useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAlert } from "react-alert";
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate, useParams } from "react-router-dom";
import MetData from "../layout/MetData";
import Loader from "../layout/loading/Loader";
import { clearErrors, editEve, eventDetails } from "../../actions/eventAction";
import { EDIT_RESET } from "../../constants/eventConsts";

const EditEvent = () => {
  const dispatch=useDispatch();
  const alert=useAlert();
  const nav=useNavigate();
  const params=useParams();
  const { loading, error, event } = useSelector((state) => state.singleEve);
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.eveRed);
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
      dispatch(editEve(userId,newEvent))
    }else{
      alert.error(`end Date Must Be Greater then ${String(startDate).substr(0,10)}`)
    }

  };
  const userId = params.id;
  useEffect(() => {
    if (event && event._id !== userId) {
      dispatch(eventDetails(userId));
    } else {
        setTitle(event.title);
        setType(event.type);
        setStartDate(new Date(event.startDate))
        setEndDate(new Date(event.endDate))
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Event Updated Successfully");
      nav("/admin/events");
      dispatch({ type: EDIT_RESET });
    }
  }, [dispatch, alert, error, isUpdated,event, updateError, userId]);
  return (
<>
{
  loading?<Loader/>:(
    <Fragment>
    <MetData title="Update Event" />
    <div className="dashboard">
      <div className="newProductContainer">
        <form
          className="createProductForm"
          encType="multipart/form-data"
          onSubmit={handleFormSubmit}
        >
          <h1>Edit Event</h1>

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
            <select value={type} onChange={e=>setType(e.target.value)}>
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

export default EditEvent;