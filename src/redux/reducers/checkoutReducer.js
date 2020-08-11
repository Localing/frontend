import {
    CHECKOUT_BEGIN,
    CHECKOUT_SUCCESS,
    CHECKOUT_ERROR
} from "../actions/checkoutActions";

const initState = {
    isCheckingOut: false,
    checkoutSuccess: false,
    checkoutError: null,
    checkoutResponse: null
}

const checkoutReducer = (state = initState, action) => {

    if(action.type === CHECKOUT_BEGIN){
        return {
            ...state,
            isCheckingOut: true,
            checkoutSuccess: false,
            checkoutError: null,
            checkoutResponse: null
        }
    }

    if(action.type === CHECKOUT_SUCCESS){
        return {
            ...state,
            isCheckingOut: false,
            checkoutSuccess: true,
            checkoutError: null,
            checkoutResponse: action.payload
        }
    }

    if(action.type === CHECKOUT_ERROR){
        return {
            ...state,
            isCheckingOut: false,
            checkoutSuccess: false,
            checkoutError: action.payload,
            checkoutResponse: null
        }
    }

    return state;

}

export default checkoutReducer;