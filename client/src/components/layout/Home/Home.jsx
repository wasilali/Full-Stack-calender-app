import React, { useEffect, useState } from 'react'
// import ProductCard from '../ProductCard/ProductCard'
import './Home.css'
import {BiMouseAlt} from 'react-icons/bi'
import MetData from '../MetData'
// import { useEffect } from 'react'
// import {getProduct,clearErrors} from '../../../actions/productAction'
import {useSelector,useDispatch} from 'react-redux'
import Loader from '../loading/Loader'
import { useAlert } from 'react-alert'
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Link, useParams } from 'react-router-dom'
import { clearErrors,getPublicEvent, getUSerEvent, searched } from '../../../actions/eventAction'
import {IoMdContact,IoIosCreate} from 'react-icons/io'

const localizer = momentLocalizer(moment);
const views = {
  month: true, // enable month view
  agenda: true, // enable agenda view
  day: false, // disable day view
  week: false, // disable week view
};
const Home = () => {
  const param=useParams();
  const alert=useAlert();
  const dispatch=useDispatch();
  const {events,error}=useSelector(state=>state.events)
  const {user,loading,isAuthenticated}=useSelector(sta=>sta.user)
  useEffect(()=>{
    if(error){
      alert.error(error)
      dispatch(clearErrors())
    }
    if (param.name) {
      dispatch(searched(param.name));

    }else{
      if (isAuthenticated) {
        dispatch(getUSerEvent())
      }
      dispatch(getPublicEvent())
    }
  },[])
  // const [events, setEvents] = useState([
  // ]);
  return (
<>
{
  loading ? <Loader/>:     <>
  <MetData title="React_Calender"/>
  <div className='home'>
    {
      isAuthenticated?(<h2 className='t1'><span>W</span>ellcome <span>{user && user.name}</span></h2>):
      (<h2 className='t1'><span>Please</span> Login <span>For better Exprience</span></h2>)
    }
  
  <div class="text2m">
<div class="wrapper">
  <div class="static-txt">Wellcome to React-Calender</div>
  <ul class="dynamic-txts">
    <li><span>  App...</span></li>
    <li><span>  App...</span></li>
    <li><span>  App...</span></li>
    <li><span>  App...</span></li>
  </ul>
</div>
</div>

<h2 className='neon h2' id='ss1' data-text="Find Amazing Products Below">Find events bellow</h2>
<a id='scroll' href="#ss">Scroll <BiMouseAlt/></a>
 <h2 id='ss' className='neon featured h2'>Featured Calender </h2>
 
  </div>
<div className='calender'>
  <div className='caleee'>
<Link className='eventbtn' to={'/create'}>Create<IoIosCreate/></Link>
{
  param.name?<p className='samii'>Searched events:  (<span style={{color:"tomato"}}>{events.length}</span>)</p>:
  <p className='samii'>total events:  (<span style={{color:"tomato"}}>{events.length}</span>)</p>
}
  </div>
<div>
  <div className='hiden'></div>
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

export default Home