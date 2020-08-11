import API from "../../services/API";
import { loadStripe } from '@stripe/stripe-js';
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

// submit cart to checkout API
export const checkoutCart = (addToast) => {
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

    // group items by business ID
    let itemsByBusiness = _.mapValues(_.groupBy(cartItems, 'businessId'), clist => clist.map(item => _.omit(item, 'businessId')));

    let cartToSubmit = {
      consumerID: getState().authData.user.username,
      vendorCarts: itemsByBusiness
    }

    // submit cart to checkout API, get stripe session ID back and redirect to Stripe Checkout
    API
      .post(`/checkout/`, cartToSubmit)
      .then(response => {
        let sessionId = response.data.sessionId;
        var stripe = loadStripe(process.env.REACT_APP_StripePublishableKey)
          .then(() => {
            stripe.redirectToCheckout({
              sessionId: sessionId
            }).then(result => {
              if (result.error) {
                dispatch(checkoutError(result.error))
              } else {
                dispatch(checkoutSuccess());
                if (addToast) {
                  addToast("Checkout Complete", {
                    appearance: "success",
                    autoDismiss: true
                  });
                }
              }
            });
          });
      })
      .catch(error => {
        dispatch(checkoutError(error));
      });
  };
};