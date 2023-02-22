import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { clearErrors, getAllUsers } from "../../actions/userAction";
import MetData from "../layout/MetData";
import Sidebar from "./Sidebar";
import { deleteEve, getALLEve } from "../../actions/eventAction";
import { DELETE_RESET } from "../../constants/eventConsts";

const EventList = () => {
  const dispatch = useDispatch();
  const navgate=useNavigate();
  const alert = useAlert();

  const { error, events } = useSelector((state) => state.events);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.eveRed);

  useEffect(()=>{
    dispatch(getALLEve())
  },[])
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Deleted Successfully...");
      navgate("/admin/dashboard")
      dispatch({ type: DELETE_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, isDeleted, message]);

  const columns = [
    { field: "owner", headerName: "Creater of Event", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "title",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "start",
      headerName: "start",
      minWidth: 150,
      flex: 0.8,
    },

    {
        field: "end",
        headerName: "end",
        minWidth: 150,
        flex: 0.8,
      },

    {
      field: "type",
      headerName: "type",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "type") === "public"
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/event/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                dispatch(deleteEve(params.getValue(params.id, "id")))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  events &&
  events.forEach((item) => {
      rows.push({
        id: item._id,
        owner:item.owner.name,
        type: item.type,
        email: item.title,
        start:String(item.startDate).substr(0,10),
        end:String(item.endDate).substr(0,10),
      });
    });

  return (
    <Fragment>
      <MetData title={`ALL USERS - Admin`} />

      <div className="dashboardSide">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default EventList;