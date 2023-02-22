import React, { useEffect, useState } from 'react'
import { clearErrors, getMyEvents } from "../../actions/eventAction";
import {useSelector,useDispatch} from 'react-redux'
import Loader from "../layout/loading/Loader";
import { useAlert } from 'react-alert'
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Link } from 'react-router-dom';
import {IoIosCreate} from 'react-icons/io';
import "./myOrders.css";

const localizer = momentLocalizer(moment);
const views = {
  month: true, // enable month view
  agenda: true, // enable agenda view
  day: false, // disable day view
  week: false, // disable week view
};
const MyOrders = () => {
  
  const alert=useAlert()
  const dispatch=useDispatch()
  const {events,error,loading}=useSelector(state=>state.events);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getMyEvents())

  }, [dispatch, alert, error]);
  return (
<>
{
  loading ? <Loader/>: <>
<div className='calender' style={{marginTop:"2rem"}}>
  <div className='caleee'>

<Link className='eventbtn' to={'/create'}>Create<IoIosCreate/></Link>
<p className='samii'>total events:  (<span style={{color:"tomato"}}>{events.length}</span>)</p>
  </div>

<div>
<Calendar
        localizer={localizer}
        events={events}
        startAccessor="startDate"
        endAccessor="endDate"
        style={{ height: 500 }}
        views={views}
        defaultView="month"
      />
</div>
     
    </div>
 
  </>
}
</>
  )
};

export default MyOrders