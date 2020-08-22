import currencyReducer from "./currencyReducer";
import productReducer from "./productReducer";
import businessReducer from "./businessReducer";
import cartReducer from "./cartReducer";
import checkoutReducer from "./checkoutReducer";
import wishlistReducer from "./wishlistReducer";
import compareReducer from "./compareReducer";
import pointsReducer from "./pointsReducer";
import locationReducer from "./locationReducer";
import authReducer from "./authReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  currencyData: currencyReducer,
  productData: productReducer,
  businessData: businessReducer,
  cartData: cartReducer,
  checkoutData: checkoutReducer,
  wishlistData: wishlistReducer,
  compareData: compareReducer,
  pointsData: pointsReducer,
  locationData: locationReducer,
  authData: authReducer
});

export default rootReducer;
