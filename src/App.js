import PropTypes from "prop-types";
import React, { useEffect, Suspense, lazy } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { connect } from "react-redux";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";
import { receiveLogin, receiveLogout, receiveLoginError } from './redux/actions/authActions';
import ProtectedRoute from './wrappers/ProtectedRoute';

// AWS amplify
import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

// home pages
const Home = lazy(() => import("./pages/home/Home"));

// business pages
const Business = lazy(() => import("./pages/business/Business"));
const BusinessList = lazy(() => import("./pages/business/BusinessList"));

// product pages
const Product = lazy(() => import("./pages/product/Product"));
//const ProductList = lazy(() => import("./pages/product/ProductList"));

// other pages
const About = lazy(() => import("./pages/other/About"));
const Contact = lazy(() => import("./pages/other/Contact"));
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const Login = lazy(() => import("./pages/other/Login"));
const ResetPassword = lazy(() => import("./pages/other/ResetPassword"));

const Cart = lazy(() => import("./pages/other/Cart"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Compare = lazy(() => import("./pages/other/Compare"));
const Checkout = lazy(() => import("./pages/other/Checkout"));

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
                  path={process.env.PUBLIC_URL + "/shop"}
                  component={BusinessList}
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
                  component={Login}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/reset-password"}
                  component={ResetPassword}
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
                  path={process.env.PUBLIC_URL + "/checkout"}
                  component={Checkout}
                  isAuthenticated={isAuthenticated}
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
