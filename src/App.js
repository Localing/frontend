import PropTypes from "prop-types";
import React, { useEffect, Suspense, lazy } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { connect } from "react-redux";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";
import { receiveLogin, receiveLogout, receiveLoginError } from './redux/actions/authActions';
import ProtectedRoute from './wrappers/ProtectedRoute';
import '@stripe/stripe-js';

// AWS amplify
import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

// home pages
const Home = lazy(() => import("./pages/home/Home"));

// business pages
const Business = lazy(() => import("./pages/business/Business"));
const BusinessList = lazy(() => import("./pages/business/BusinessList"));
const BusinessListByArea = lazy(() => import("./pages/business/BusinessListByArea"));

// product pages
const Product = lazy(() => import("./pages/product/Product"));
//const ProductList = lazy(() => import("./pages/product/ProductList"));

// cart-related pages
const Cart = lazy(() => import("./pages/cart/Cart"));
const Checkout = lazy(() => import("./pages/cart/Checkout"));
const CheckoutSuccess = lazy(() => import("./pages/cart/CheckoutSuccess"));
const CheckoutCancel = lazy(() => import("./pages/cart/CheckoutCancel"));
const Wishlist = lazy(() => import("./pages/cart/Wishlist"));
const Compare = lazy(() => import("./pages/cart/Compare"));

// account pages
const MyAccount = lazy(() => import("./pages/account/MyAccount"));
const Login = lazy(() => import("./pages/account/Login"));
const ResetPassword = lazy(() => import("./pages/account/ResetPassword"));
const VerifyEmail = lazy(() => import("./pages/account/VerifyEmail"));

// other pages
const About = lazy(() => import("./pages/other/About"));
const Contact = lazy(() => import("./pages/other/Contact"));
const Support = lazy(() => import("./pages/other/Support"));
const FAQs = lazy(() => import("./pages/other/FAQs"));
const Terms = lazy(() => import("./pages/other/Terms"));
const NotFound = lazy(() => import("./pages/other/NotFound"));

const App = ({ isAuthenticated, dispatch }) => {

  useEffect(() => {

    // listen for an auth event
    Hub.listen('auth', async (data) => {
      switch (data.payload.event) {
        case 'signIn':
          Auth.currentAuthenticatedUser({
            bypassCache: true
          }).then(user => dispatch(receiveLogin(user)))
            .catch(err => console.log(err));
          break;
        case 'signIn_failure':
          dispatch(receiveLoginError(data.payload.data));
          break;
        case 'signOut':
          dispatch(receiveLogout());
          break;
        default:
          break;
      }
    })

  });

  return (
    <ToastProvider placement="bottom-left">
      <BreadcrumbsProvider>
        <Router>
          <ScrollToTop>
            <Suspense
              fallback={
                <div className="preloader-wrapper">
                  <div className="preloader">
                    <span></span>
                    <span></span>
                  </div>
                </div>
              }
            >
              <Switch>
                <Route
                  exact
                  path={process.env.PUBLIC_URL + "/"}
                  component={Home}
                />
                {/* Business pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/business/:id"}
                  component={Business}
                />

                <Route
                  exact path={process.env.PUBLIC_URL + "/shop"}
                  component={BusinessList}
                />

                <Route
                  exact path={process.env.PUBLIC_URL + "/shop/:area"}
                  component={BusinessListByArea}
                />

                {/* Product pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/product/:businessId/:productId"}
                  component={Product}
                />

                {/* Product List 
                <Route
                  path={process.env.PUBLIC_URL + "/products"}
                  component={ProductList}
                /> */}

                {/* Other pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/about"}
                  component={About}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/terms"}
                  component={Terms}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/privacy"}
                  component={Terms}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/cookies"}
                  component={Terms}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/contact"}
                  component={Contact}
                />
                <ProtectedRoute
                  path={process.env.PUBLIC_URL + "/my-account"}
                  component={MyAccount}
                  isAuthenticated={isAuthenticated}
                />
                <ProtectedRoute
                  path={process.env.PUBLIC_URL + "/my-orders"}
                  component={MyAccount}
                  isAuthenticated={isAuthenticated}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/login"}
                  render={(props) => <Login {...props} startPage="login" />}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/signup"}
                  render={(props) => <Login {...props} startPage="signup" />}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/reset-password"}
                  component={ResetPassword}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/verify-email"}
                  component={VerifyEmail}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/cart"}
                  component={Cart}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/wishlist"}
                  component={Wishlist}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/compare"}
                  component={Compare}
                />
                <ProtectedRoute
                  exact path={process.env.PUBLIC_URL + "/checkout"}
                  component={Checkout}
                  isAuthenticated={isAuthenticated}
                />
                <ProtectedRoute
                  exact path={process.env.PUBLIC_URL + "/checkout/success"}
                  component={CheckoutSuccess}
                  isAuthenticated={isAuthenticated}
                />
                <ProtectedRoute
                  exact path={process.env.PUBLIC_URL + "/checkout/cancel"}
                  component={CheckoutCancel}
                  isAuthenticated={isAuthenticated}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/support"}
                  component={Support}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/faqs"}
                  component={FAQs}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/not-found"}
                  component={NotFound}
                />

                <Route exact component={NotFound} />
              </Switch>
            </Suspense>
          </ScrollToTop>
        </Router>
      </BreadcrumbsProvider>
    </ToastProvider>
  );
};

App.propTypes = {
  dispatch: PropTypes.func,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authData.isAuthenticated
  }
}

export default connect(mapStateToProps)(App);
