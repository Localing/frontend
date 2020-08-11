import API from "../../services/API";
var _ = require('lodash');

export const ADD_TO_CART = "ADD_TO_CART";
export const CHECKOUT_CART = "CHECKOUT_CART";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const DELETE_ALL_FROM_CART = "DELETE_ALL_FROM_CART";
export const SUBMIT_CART_BEGIN = "SUBMIT_CART_BEGIN";
export const SUBMIT_CART_SUCCESS = "SUBMIT_CART_SUCCESS";
export const SUBMIT_CART_ERROR = "SUBMIT_CART_ERROR";

const submitCartBegin = () => ({
  type: SUBMIT_CART_BEGIN
});

const submitCartSuccess = sessionID => ({
  type: SUBMIT_CART_SUCCESS,
  payload: sessionID
});

const submitCartError = error => ({
  type: SUBMIT_CART_ERROR,
  payload: error
})

//add to cart
export const addToCart = (
  item,
  addToast,
  quantityCount,
  selectedProductColor,
  selectedProductSize
) => {
  return dispatch => {
    if (addToast) {
      addToast("Added To Cart", { appearance: "success", autoDismiss: true });
    }
    dispatch({
      type: ADD_TO_CART,
      payload: {
        ...item,
        quantity: quantityCount,
        selectedProductColor: selectedProductColor
          ? selectedProductColor
          : item.selectedProductColor
            ? item.selectedProductColor
            : null,
        selectedProductSize: selectedProductSize
          ? selectedProductSize
          : item.selectedProductSize
            ? item.selectedProductSize
            : null
      }
    });
  };
};

// decrease from cart
export const decreaseQuantity = (item, addToast) => {
  return dispatch => {
    if (addToast) {
      addToast("Item Decremented From Cart", {
        appearance: "warning",
        autoDismiss: true
      });
    }
    dispatch({ type: DECREASE_QUANTITY, payload: item });
  };
};

// delete from cart
export const deleteFromCart = (item, addToast) => {
  return dispatch => {
    if (addToast) {
      addToast("Removed From Cart", { appearance: "error", autoDismiss: true });
    }
    dispatch({ type: DELETE_FROM_CART, payload: item });
  };
};

// delete all from cart
export const deleteAllFromCart = addToast => {
  return dispatch => {
    if (addToast) {
      addToast("Removed All From Cart", {
        appearance: "error",
        autoDismiss: true
      });
    }
    dispatch({ type: DELETE_ALL_FROM_CART });
  };
};

// checkout cart
export const checkoutCart = (cartItems, addToast) => {
  return (dispatch, getState) => {
    dispatch(submitCartBegin());

    // get all items in cart
    let cartItems = getState().cartData;

    // remove all keys from items except those needed by checkout API
    const keysToKeep = ['businessId', 'productId', 'quantity'];

    const extractKeysToKeep = array => array.map(o => keysToKeep.reduce((acc, curr) => {
      acc[curr] = o[curr];
      return acc;
    }, {}));

    cartItems = extractKeysToKeep(cartItems);

    // group items by business ID
    let itemsByBusiness = _.mapValues(_.groupBy(cartItems, 'businessId'), clist => clist.map(item => _.omit(item, 'businessId')));
    
    let cartToSubmit = {
      consumerID: getState().authData.user.username,
      vendorCarts: itemsByBusiness
    }

    console.log(cartToSubmit);

    API
    .post(`/checkout/`, cartToSubmit)
    .then(response => {
      console.log(response.data);
      dispatch(submitCartSuccess(response.data));
      if (addToast) {
        addToast("Checkout Complete", {
          appearance: "success",
          autoDismiss: true
        });
      }
    })
    .catch(err => {
      dispatch(submitCartError(err));
    });

    dispatch({ type: CHECKOUT_CART });
  };
};

// get stock of cart item
export const cartItemStock = (item, color, size) => {
  if (item.stock) {
    return item.stock;
  } else {
    return item.variation
      .filter(single => single.color === color)[0]
      .size.filter(single => single.name === size)[0].stock;
  }
};
