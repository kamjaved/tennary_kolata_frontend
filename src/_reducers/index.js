import { combineReducers } from "redux";
import auth from "./authReducer";
import manufacturer from "./manufacturerReducer";
import processall from "./allProcessReducer"
import splitting from "./splittingReducers"
import drydrum from "./drydrumReducer"
import globalPrice from './RateReducer/globalPriceRed'
import filterDate from './dateFilterReducer'

export default combineReducers({
  auth,
  manufacturer,
  processall,
  splitting,
  drydrum,
  globalPrice,
  filterDate
});
