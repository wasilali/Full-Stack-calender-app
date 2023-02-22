import {CREATE_EVENT_REQUEST,
    CREATE_EVENT_SUCCESS,
    CREATE_EVENT_FAIL,
    CLEAR_ERRORS,
    CREATE_EVENT_RESET,
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
    DELETE_RESET,
    EDIT_REQUEST,
    EDIT_SUCCESS,
    EDIT_FAIL,
    EDIT_RESET,
GET_SINGLE_EVT_REQUEST,
GET_SINGLE_EVT_SUCCESS,
GET_SINGLE_EVT_FAIL,
SEARCHED_EVENT_FAIL,
SEARCHED_EVENT_REQUEST,
SEARCHED_EVENT_SUCCESS
    } from "../constants/eventConsts"


    export const createEventReducer = (state={events:[]},action)=>{
        switch (action.type) {
                case CREATE_EVENT_REQUEST:
                return {
                    loading:true,
                }
                    case CREATE_EVENT_SUCCESS:
                    return {
                        ...state,
                        loading:false,
                        message:action.payload.message,
                        event:action.payload.event
                    }

                    case CREATE_EVENT_FAIL:
                        return {
                            ...state,
                            loading:false,
                            error:action.payload,
                    }
                    case CREATE_EVENT_RESET:
                        return {
                            ...state,
                            loading:false,
                            message:null
                        }
                    case CLEAR_ERRORS:
                        return {
                            ...state,
                            error:null,
                        }
        
            default:
                return state;
        }
    }

    //All user req,...

export const allUSerEvents=(state={events:[]},action)=>{
    switch (action.type) {
        case GET_USER_EVENT_REQUEST:
            case GET_PUBLIC_EVENT_REQUEST:
                case MY_EVENT_REQUEST:
                    case ALL_REQUEST:
                        case SEARCHED_EVENT_REQUEST:

            return {
                ...state,
                loading:true,
            }

            case GET_USER_EVENT_SUCCESS:
                case GET_PUBLIC_EVENT_SUCCESS:
                    case MY_EVENT_SUCCESS:
                        case ALL_SUCCESS:
                            case SEARCHED_EVENT_SUCCESS:
            return {
                ...state,
                loading:false,
                events:action.payload
            }

        case GET_USER_EVENT_FAIL:
            case GET_PUBLIC_EVENT_FAIL:
                case MY_EVENT_FAIL:
                    case ALL_FAIL:
                        case SEARCHED_EVENT_FAIL:
            return {
                ...state,
                loading:false,
                events:null,
                error:action.payload,
            }
                case CLEAR_ERRORS:
                    return {
                        ...state,
                        error:null,
                    }
        
    
        default:
            return state;
    }
}

export const eventReducer=(state={},action)=>{
    switch (action.type) {
        case DELETE_REQUEST:
            case EDIT_REQUEST:
            return {
                ...state,
                loading:true,

            }
                case EDIT_SUCCESS:
            return {
                ...state,
                loading:false,
                isUpdated:action.payload.message,
            }
            case DELETE_SUCCESS:
                return {
                  ...state,
                  loading: false,
                  isDeleted: action.payload.success,
                  message: action.payload.message,
                };
                    case DELETE_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload,
            }
            case EDIT_FAIL:
                return {
                    ...state,
                    loading:false,
                    error:"Please remove type from name (public) or (private)",
                }
            case EDIT_RESET:
                
                return{
                    ...state,
                    isUpdated:false
                }
                case DELETE_RESET:
                    return {
                      ...state,
                      isDeleted: false,
                    };
                case CLEAR_ERRORS:
                    return {
                        ...state,
                        error:null,
                    }
        
    
        default:
            return state;
    }
}

export const evtDetailsReducer=(state={event:{}},action)=>{
    switch (action.type) {
        case GET_SINGLE_EVT_REQUEST:
            return {
                ...state,
                loading:true,
            }

        case GET_SINGLE_EVT_SUCCESS:
            return {
                ...state,
                loading:false,
                event:action.payload,
            }

        case GET_SINGLE_EVT_FAIL:
            return {
                ...state,
                loading:false,

                error:action.payload,
            }
                case CLEAR_ERRORS:
                    return {
                        ...state,
                        error:null,
                    }
        
    
        default:
            return state;
    }
}