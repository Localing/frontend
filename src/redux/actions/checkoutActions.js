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

const stripe = window.Stripe(process.env.REACT_APP_StripePublishableKey);

// submit cart to checkout API
export const checkoutCart = (addToast) => {
  return (dispatch, getState) => {
    dispatch(checkoutBegin());

    // get all items in cart
    let cartItems = getState().cartData;

    // remove all keys from items except those needed by checkout API
    const keysToKeep = ['businessId', 'productId', 'quantity', 'price', 'discount', 'currency', 'active', 'name', 'description'];

    const extractKeysToKeep = array => array.map(o => keysToKeep.reduce((acc, curr) => {
      acc[curr] = o[curr];
      return acc;
    }, {}));

    cartItems = extractKeysToKeep(cartItems);

    // group items by business ID
    let itemsByBusiness = _.mapValues(_.groupBy(cartItems, 'businessId'), clist => clist.map(item => _.omit(item, 'businessId')));

    let vendorCarts = [];

    for (const [businessId, vendorItems] of Object.entries(itemsByBusiness)) {
      vendorCarts.push({
        "businessId": businessId,
        "vendorItems": vendorItems
      })
    }

    let cartToSubmit = {
      consumerID: getState().authData.user.username,
      vendorCarts: vendorCarts
    }

    // submit cart to checkout API, get stripe session ID back and redirect to Stripe Checkout
    API
      .post(`/checkout/`, cartToSubmit)
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