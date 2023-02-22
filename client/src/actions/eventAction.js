import {CREATE_EVENT_REQUEST,
CREATE_EVENT_SUCCESS,
CREATE_EVENT_FAIL,
CLEAR_ERRORS,
GET_PUBLIC_EVENT_REQUEST,
GET_PUBLIC_EVENT_SUCCESS,
GET_PUBLIC_EVENT_FAIL,
GET_USER_EVENT_REQUEST,
GET_USER_EVENT_SUCCESS,
GET_USER_EVENT_FAIL,
MY_EVENT_SUCCESS,
MY_EVENT_REQUEST,
MY_EVENT_FAIL,
ALL_REQUEST,
ALL_SUCCESS,
ALL_FAIL,
DELETE_REQUEST,
DELETE_SUCCESS,
DELETE_FAIL,
EDIT_REQUEST,
EDIT_SUCCESS,
EDIT_FAIL,
GET_SINGLE_EVT_REQUEST,
GET_SINGLE_EVT_SUCCESS,
GET_SINGLE_EVT_FAIL,
SEARCHED_EVENT_REQUEST,
SEARCHED_EVENT_SUCCESS,
SEARCHED_EVENT_FAIL
} from "../constants/eventConsts"

import axios from "axios";

export const createEvent = (event)=>async(dispatch)=>{
    try {
        dispatch({ type:CREATE_EVENT_REQUEST });

        const { data }=await axios.post(`/api/v1/create-event`,event)
        dispatch({
            type:CREATE_EVENT_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:CREATE_EVENT_FAIL,
            payload:error.response.data.message
        });
    }
}

export const getPublicEvent = ()=>async(dispatch)=>{
    try {
        dispatch({ type:GET_PUBLIC_EVENT_REQUEST });

        const { data }=await axios.get(`/api/v1/get-events`)
        dispatch({
            type:GET_PUBLIC_EVENT_SUCCESS,
            payload:data.events
        })
    } catch (error) {
        dispatch({
            type:GET_PUBLIC_EVENT_FAIL,
            payload:error.response.data.message
        });
    }
}

export const getUSerEvent = ()=>async(dispatch)=>{

    try {
        dispatch({ type:GET_USER_EVENT_REQUEST });

        const { data }=await axios.get(`/api/v1/get-user-events`)
        dispatch({
            type:GET_USER_EVENT_SUCCESS,
            payload:data.events
        })
    } catch (error) {
        dispatch({
            type:GET_USER_EVENT_FAIL,
            payload:error.response.data.message
        });
    }
}

export const getMyEvents = ()=>async(dispatch)=>{
    try {
        dispatch({ type:MY_EVENT_REQUEST });

        const { data }=await axios.get(`/api/v1/get-my-events`)
        dispatch({
            type:MY_EVENT_SUCCESS,
            payload:data.events
        })
    } catch (error) {
        dispatch({
            type:MY_EVENT_FAIL,
            payload:error.response.data.message
        });
    }
}
export const getALLEve = ()=>async(dispatch)=>{
    try {
        dispatch({ type:ALL_REQUEST });

        const { data }=await axios.get(`/api/v1/admin/all-events`)
        dispatch({
            type:ALL_SUCCESS,
            payload:data.events
        })
    } catch (error) {
        dispatch({
            type:ALL_FAIL,
            payload:error.response.data.message
        });
    }
}
export const deleteEve = (id)=>async(dispatch)=>{
    try {
        dispatch({ type:DELETE_REQUEST });

        const { data }=await axios.delete(`/api/v1/admin/delete/${id}`)
        dispatch({
            type:DELETE_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:DELETE_FAIL,
            payload:error.response.data.message
        });
    }
}
export const editEve = (id,edi)=>async(dispatch)=>{
    try {
        dispatch({ type:EDIT_REQUEST });

        const { data }=await axios.put(`/api/v1/admin/update/${id}`,edi)
        dispatch({
            type:EDIT_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:EDIT_FAIL,
            payload:error.response.data.message
        });
    }
}

export const eventDetails = (id)=>async(dispatch)=>{

    try {
        dispatch({ type:GET_SINGLE_EVT_REQUEST });

        const { data }=await axios.get(`/api/v1/admin/single/${id}`)
        dispatch({
            type:GET_SINGLE_EVT_SUCCESS,
            payload:data.event,
        })
    } catch (error) {
        dispatch({
            type:GET_SINGLE_EVT_FAIL,
            payload:error.response.data.message
        });
    }
};

// Clearing errors
export const clearErrors=()=> async (dispatch)=>{
    dispatch({ type:CLEAR_ERRORS })
}

export const searched=(name)=> async (dispatch)=>{
    try {
        dispatch({ type:SEARCHED_EVENT_REQUEST });

        const { data }=await axios.get(`/api/v1/get-searched-events?name=${name}`)
        dispatch({
            type:SEARCHED_EVENT_SUCCESS,
            payload:data.events
        })
    } catch (error) {
        dispatch({
            type:SEARCHED_EVENT_FAIL,
            payload:error.response.data.message
        });
    }
}