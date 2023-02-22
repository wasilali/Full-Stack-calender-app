import { createStore ,combineReducers,applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import { allUserReducer, forgotPassReducer, profileReducer, userDetailsReducer, userReducer } from "./reducers/userReducer";
import { allUSerEvents, createEventReducer, eventReducer, evtDetailsReducer } from "./reducers/eventReducer";

const reducer=combineReducers({
user:userReducer,
profile:profileReducer,
forgotPassword:forgotPassReducer,
allUsers:allUserReducer,
userDetails:userDetailsReducer,
//events
createEvent:createEventReducer,
events:allUSerEvents,
eveRed:eventReducer,
singleEve:evtDetailsReducer,
});
let initialState= {

};

const middleware= [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)
export default store;

