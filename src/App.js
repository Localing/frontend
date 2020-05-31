import PropTypes from "prop-types";
import React, { useEffect, Suspense, lazy } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { multilanguage, loadLanguages } from "redux-multilanguage";
import { connect } from "react-redux";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";
import { receiveLogin, receiveLogout, receiveLoginError } from './redux/actions/authActions';

// AWS amplify
import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

// home pages
const Home = lazy(() => import("./pages/home/Home"));

// business pages
const Business = lazy(() => import("./pages/shop-product/Business"));

// shop pages
const ShopGridStandard = lazy(() => import("./pages/shop/ShopGridStandard"));
const ShopListStandard = lazy(() => import("./pages/shop/ShopListStandard"));

// product page
const Product = lazy(() => import("./pages/shop-product/Product"));

// other pages
const About = lazy(() => import("./pages/other/About"));
const Contact = lazy(() => import("./pages/other/Contact"));
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const LoginRegister = lazy(() => import("./pages/other/LoginRegister"));
const ResetPassword = lazy(() => import("./pages/other/ResetPassword"));

const Cart = lazy(() => import("./pages/other/Cart"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Compare = lazy(() => import("./pages/other/Compare"));
const Checkout = lazy(() => import("./pages/other/Checkout"));

const NotFound = lazy(() => import("./pages/other/NotFound"));

const App = props => {

  useEffect(() => {
    props.dispatch(
      loadLanguages({
        languages: {
          en: require("./translations/english.json"),
          fn: require("./translations/french.json"),
          de: require("./translations/germany.json")
        }
      })
    );

    Hub.listen('auth', async (data) => {
      switch (data.payload.event) {
        case 'signIn':
          Auth.currentAuthenticatedUser({
            bypassCache: true
          }).then(user => props.dispatch(receiveLogin(user)))
            .catch(err => console.log(err));
          break;
        case 'signIn_failure':
          props.dispatch(receiveLoginError(data.payload.data));
          break;
        case 'signOut':
          props.dispatch(receiveLogout());
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
                <div className="flone-preloader-wrapper">
                  <div className="flone-preloader">
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
                {/* Shop pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/shop-grid-standard"}
                  component={ShopGridStandard}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/shop-list-standard"}
                  component={ShopListStandard}
                />

                {/* Product pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/product/:id"}
                  render={routeProps => (
                    <Product {...routeProps} key={routeProps.match.params.id} />
                  )}
                />

                {/* Other pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/about"}
                  component={About}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/contact"}
                  component={Contact}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/my-account"}
                  component={MyAccount}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/login-register"}
                  component={LoginRegister}
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
                <Route
                  path={process.env.PUBLIC_URL + "/checkout"}
                  component={Checkout}
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
  dispatch: PropTypes.func
};

export default connect()(multilanguage(App));
