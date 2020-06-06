import React from "react";

const MobileWidgets = () => {
  return (
    <div className="offcanvas-widget-area">
      <div className="off-canvas-contact-widget">
        <div className="header-contact-info">
          <ul className="header-contact-info__list">
            {/* Disable telephone 
            <li>
              <i className="fa fa-phone"></i>{" "}
              <a href="tel://12452456012">+44 245601234 </a>
            </li>
            */}
            <li>
              <i className="fa fa-envelope"></i>{" "}
              info@localing.co.uk
            </li>
          </ul>
        </div>
      </div>
      {/*Off Canvas Widget Social Start*/}
      <div className="off-canvas-widget-social">
        <a href="//twitter.com/localinguk" title="Twitter">
          <i className="fa fa-twitter"></i>
        </a>
        <a href="//instagram.com/localinguk" title="Instagram">
          <i className="fa fa-instagram"></i>
        </a>
        <a href="//facebook.com/localinguk" title="Facebook">
          <i className="fa fa-facebook"></i>
        </a>
        <a href="https://www.youtube.com/channel/UCf-vN1icw6n08JVT-F9DSXg" title="Youtube">
          <i className="fa fa-youtube"></i>
        </a>
      </div>
      {/*Off Canvas Widget Social End*/}
    </div>
  );
};

export default MobileWidgets;
