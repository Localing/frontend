import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Logo from "../../components/header/Logo";
import NavMenu from "../../components/header/NavMenu";
import RightToolbar from "../../components/header/RightToolbar";
import MobileMenu from "../../components/header/MobileMenu";
import HeaderTop from "../../components/header/HeaderTop";

const HeaderOne = ({
  layout,
  top,
  borderStyle,
  headerPaddingClass,
  headerBgClass
}) => {
  const [scroll, setScroll] = useState(0);
  const [headerTop, setHeaderTop] = useState(0);

  // useEffect(() => {
  //   const header = document.querySelector(".sticky-bar");
  //   setHeaderTop(header.offsetTop);
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  return (
    <header
      className={`header-area clearfix ${headerBgClass ? headerBgClass : ""}`}
    >
      <div
        className={`${headerPaddingClass ? headerPaddingClass : ""} ${
          top === "visible" ? "d-none d-lg-block" : "d-none"
        } header-top-area ${
          borderStyle === "fluid-border" ? "border-none" : ""
        }`}
      >
        <div className={layout === "container-fluid" ? layout : "container"}>
          {/* header top */}
          <HeaderTop borderStyle={borderStyle} />
        </div>
      </div>

      <div
        className={` ${
          headerPaddingClass ? headerPaddingClass : ""
        } sticky-bar header-res-padding clearfix ${
          scroll > headerTop ? "stick" : ""
        }`}
      >
        <div className={layout === "container-fluid" ? layout : "container"}>
          <div className="row">
            <div className="col-xl-2 col-lg-2 col-md-6 col-4" style={{ paddingBottom: 5 }}>
              {/* header logo */}
              <Logo imageUrl="/assets/img/logo/localing-logo.png" logoClass="logo" />
            </div>
            <div className="col-xl-6 col-lg-6 d-none d-lg-block">
               <NavMenu />
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-8">
              {/* Icon group */}
              <RightToolbar />
            </div>
          </div>
        </div>
        {/* mobile menu */}
        <MobileMenu />
      </div>
    </header>
  );
};

HeaderOne.propTypes = {
  borderStyle: PropTypes.string,
  headerPaddingClass: PropTypes.string,
  layout: PropTypes.string,
  top: PropTypes.string
};

export default HeaderOne;
