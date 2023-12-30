import { combineReducers } from "redux";
import userReducer from "./reducers/crudReducers";

const rootReducer = combineReducers({
    users: userReducer,
});

export default rootReducer;
 