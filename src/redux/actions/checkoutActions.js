import API from "../../services/API";
var _ = require('lodash');

export const CHECKOUT_BEGIN = "CHECKOUT_BEGIN";
export const CHECKOUT_SUCCESS = "CHECKOUT_SUCCESS";
export const CHECKOUT_ERROR = "CHECKOUT_ERROR";

const checkoutBegin = () => ({
  type: CHECKOUT_BEGIN
});

const checkoutSuccess = response => ({
  type: CHECKOUT_SUCCESS,
  payload: response
});

const checkoutError = error => ({
  type: CHECKOUT_ERROR,
  payload: error
});

const stripe = window.Stripe("pk_test_51GtdH5F6l09pLa1lY6V7E8kQsqBlYNObaMEiNv6yOTqmwYLfVcREqciOX7ECps5CVWTHZ8yAnqOyHSFGzIFjlHAo00SAiIG48Z");

// submit cart to checkout API
export const checkoutCart = () => {
  return (dispatch, getState) => {
    dispatch(checkoutBegin());

    // get all items in cart
    let cartItems = getState().cartData;

    // remove all keys from items except those needed by checkout API
    const keysToKeep = ['businessId', 'productId', 'quantity'];

    const extractKeysToKeep = array => array.map(o => keysToKeep.reduce((acc, curr) => {
      acc[curr] = o[curr];
      return acc;
    }, {}));

    cartItems = extractKeysToKeep(cartItems);

    // submit formatted cart to checkout API, get stripe session ID back and redirect to Stripe Checkout
    API
      .post(`/checkout/`, cartItems)
      .then(response => {
        let sessionId = response.data.sessionId;
        stripe.redirectToCheckout({
          sessionId: sessionId
        }).then(result => {
          if (result.error) {
            dispatch(checkoutError(result.error))
          } else {
            dispatch(checkoutSuccess());
          }
        });
      })
      .catch(error => {
        dispatch(checkoutError(error));
      });
  };
};