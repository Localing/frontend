import currencyReducer from "./currencyReducer";
import productReducer from "./productReducer";
import businessReducer from "./businessReducer";
import cartReducer from "./cartReducer";
import wishlistReducer from "./wishlistReducer";
import compareReducer from "./compareReducer";
import pointsReducer from "./pointsReducer";
import locationReducer from "./locationReducer";
import authReducer from "./authReducer";
import { combineReducers } from "redux";
import { createMultilanguageReducer } from "redux-multilanguage";

const rootReducer = combineReducers({
  multilanguage: createMultilanguageReducer({ currentLanguageCode: "en" }),
  currencyData: currencyReducer,
  productData: productReducer,
  businessData: businessReducer,
  cartData: cartReducer,
  wishlistData: wishlistReducer,
  compareData: compareReducer,
  pointsData: pointsReducer,
  locationData: locationReducer,
  authData: authReducer
});

export default rootReducer;
