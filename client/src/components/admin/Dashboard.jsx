import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import './dashboard.css'
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../actions/userAction';
import { getALLEve } from '../../actions/eventAction';
const Dashboard = () => {
  const dispatch = useDispatch();

  const {events}=useSelector(state=>state.events)

  const { error, users } = useSelector((state) => state.allUsers);


  useEffect(() => {
    dispatch(getALLEve())

    dispatch(getAllUsers());
  }, [dispatch]);






  return (
    <div className='dashboardSide'>
        <Sidebar/>
        <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div className="dashboardSummaryBox2">
            <Link to="/admin/events">
              <p>Events</p>
              <p>{events&&events.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users&&users.length}</p>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard