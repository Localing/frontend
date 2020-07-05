import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
//import LocationMap from "../../components/contact/LocationMap";

const Contact = (props) => {

  return (
    <Fragment>
      <MetaTags>
        <title>Localing | Contact</title>
        <meta
          name="description"
          content="Localing contact page"
        />
      </MetaTags>
      <LayoutOne>
        <div className="contact-area pt-100 pb-100">
          <div className="container">
            {/* Disable map
            <div className="contact-map mb-10">
              <LocationMap latitude="47.444" longitude="-122.176" /> 
            </div> */}
            <div className="custom-row-2">
              <div className="col-lg-4 col-md-5">
                <div className="contact-info-wrap">
                  {/* Disable phone number field
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-phone" />
                    </div>
                    <div className="contact-info-dec">
                      <p>+44 12345678</p>
                      <p>+44 12345678</p>
                    </div>
                  </div>
                  */}
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-globe" />
                    </div>
                    <div className="contact-info-dec">
                      <p>
                        <a href="mailto:info@localing.store">info@localing.co.uk</a>
                      </p>
                      <p>
                        <a href="//localing.store">localing.co.uk</a>
                      </p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-map-marker" />
                    </div>
                    <div className="contact-info-dec">
                      <p>Cambridge, UK</p>
                    </div>
                  </div>
                  <div className="contact-social text-center">
                    <h3>Follow Us</h3>
                    <ul>
                      <li>
                        <a href="//facebook.com/localinguk">
                          <i className="fa fa-facebook" />
                        </a>
                      </li>
                      <li>
                        <a href="//twitter.com/localinguk">
                          <i className="fa fa-twitter" />
                        </a>
                      </li>
                      <li>
                        <a href="//instagram.com/localinguk">
                          <i className="fa fa-instagram" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-md-7">
                <div className="contact-form">
                  <div className="contact-title mb-30">
                    <h2>Get In Touch</h2>
                  </div>
                  <form className="contact-form-style">
                    <div className="row">
                      <div className="col-lg-6">
                        <input name="name" placeholder="Name*" type="text" required />
                      </div>
                      <div className="col-lg-6">
                        <input name="email" placeholder="Email*" type="email" required />
                      </div>
                      <div className="col-lg-12">
                        <input
                          name="subject"
                          placeholder="Subject*"
                          type="text"
                          required
                        />
                      </div>
                      <div className="col-lg-12">
                        <textarea
                          name="message"
                          placeholder="Your Message*"
                          defaultValue={""}
                          required
                        />
                        <button className="submit" type="submit">
                          SEND
                        </button>
                      </div>
                    </div>
                  </form>
                  <p className="form-messege" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Contact.propTypes = {
  location: PropTypes.object
};

export default Contact;
