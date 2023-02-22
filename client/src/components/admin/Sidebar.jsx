import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
const Sidebar = () => {
  return (
    <div className="sidebar">

      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>

      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/events">
        <p>
          <CalendarMonthIcon /> Events
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;