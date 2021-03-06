import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { animateScroll } from "react-scroll";
import FooterCopyright from "../../components/footer/FooterCopyright";

const FooterOne = ({
  backgroundColorClass,
  spaceTopClass,
  spaceBottomClass,
  containerClass,
  extraFooterClass,
  sideMenu
}) => {
  const [scroll, setScroll] = useState(0);
  const [top, setTop] = useState(0);

  useEffect(() => {
    setTop(100);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    animateScroll.scrollToTop();
  };

  const handleScroll = () => {
    setScroll(window.scrollY);
  };
  
  const displayCookiePreferenceModal = () => {
    console.log("trying to update cookie prefs");
    window.displayPreferenceModal();
  }

  return (
    <footer
      className={`footer-area ${
        backgroundColorClass ? backgroundColorClass : ""
        } ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
        } ${extraFooterClass ? extraFooterClass : ""}`}
    >
      <div className={`${containerClass ? containerClass : "container"}`}>
        <div className="row">
          <div
            className={`${
              sideMenu ? "col-xl-2 col-sm-4" : "col-lg-2 col-sm-4"
              }`}
          >
            {/* footer copyright */}
            <FooterCopyright
              footerLogo="/assets/img/logo/localing-logo.png"
              spaceBottomClass="mb-30"
            />
          </div>
          <div
            className={`${
              sideMenu ? "col-xl-2 col-sm-4" : "col-lg-2 col-sm-4"
              }`}
          >
            <div className="footer-widget mb-30 ml-30">
              <div className="footer-title">
                <h3>ABOUT US</h3>
              </div>
              <div className="footer-list">
                <ul>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/about"}>Our Team</Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/contact"}>
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div
            className={`${
              sideMenu ? "col-xl-2 col-sm-4" : "col-lg-2 col-sm-4"
              }`}
          >
            <div className="footer-widget mb-30 ml-30">
              <div className="footer-title">
                <h3>POLICY</h3>
              </div>
              <div className="footer-list">
                <ul>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/terms"}>Terms of Use</Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/privacy"}>
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <a href="https://app.termly.io/document/cookie-policy/6d71a832-abfe-46ed-84a6-bec7e3292565" target="_blank">
                      Cookie Policy
                    </a>
                  </li>
                  {/* <li>
                    <Link onClick={() => displayCookiePreferenceModal()}>
                      Update Cookie Preferences
                    </Link>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
          
          <div
            className={`${
              sideMenu ? "col-xl-2 col-sm-4" : "col-lg-2 col-sm-4"
              }`}
          >
            <div
              className={`${
                sideMenu
                  ? "footer-widget mb-30 ml-95"
                  : "footer-widget mb-30 ml-50"
                }`}
            >
              <div className="footer-title">
                <h3>LINKS</h3>
              </div>
              <div className="footer-list">
                <ul>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/my-orders"}>Orders</Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/support"}>
                      Support
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/faqs"}>FAQs</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className={`${
              sideMenu ? "col-xl-3 col-sm-4" : "col-lg-2 col-sm-6"
              }`}
          >
            <div className={`${
              sideMenu
                ? "footer-widget mb-30 ml-145"
                : "footer-widget mb-30 ml-75"
              }`}>
              <div className="footer-title">
                <h3>FOLLOW US</h3>
              </div>
              <div className="footer-list">
                <ul>
                  <li>
                    <a
                      href="https://www.facebook.com/localinguk"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com/localinguk/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/localinguk/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/channel/UCf-vN1icw6n08JVT-F9DSXg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Youtube
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className={`${
              sideMenu ? "col-xl-3 col-sm-8" : "col-lg-4 col-sm-6"
              }`}
          >
          </div>
        </div>
      </div>
      {/* <button
        className={`scroll-top ${scroll > top ? "show" : ""}`}
        onClick={() => scrollToTop()}
      >
        <i className="fa fa-angle-double-up"></i>
      </button> */}
    </footer>
  );
};

FooterOne.propTypes = {
  backgroundColorClass: PropTypes.string,
  containerClass: PropTypes.string,
  extraFooterClass: PropTypes.string,
  sideMenu: PropTypes.bool,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default FooterOne;
