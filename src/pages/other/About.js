import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import SectionTitleWithText from "../../components/section-title/SectionTitleWithText";
// import BannerOne from "../../wrappers/banner/BannerOne";
// import TextGridOne from "../../wrappers/text-grid/TextGridOne";
// import FunFactOne from "../../wrappers/fun-fact/FunFactOne";
import TeamMemberOne from "../../wrappers/team-member/TeamMemberOne";
// import BrandLogoSliderOne from "../../wrappers/brand-logo/BrandLogoSliderOne";

const About = (props) => {

  return (
    <Fragment>
      <MetaTags>
        <title>Localing | About us</title>
        <meta
          name="description"
          content="About Localing"
        />
      </MetaTags>
      <LayoutOne headerTop="visible">

        {/* team member */}
        <TeamMemberOne spaceTopClass="pt-95" spaceBottomClass="pb-70" />

        {/* section title with text */}
        <SectionTitleWithText spaceTopClass="pt-100" spaceBottomClass="pb-95" />

        {/* 
        <FunFactOne
          spaceTopClass="pt-100"
          spaceBottomClass="pb-70"
          bgClass="bg-gray-3"
        />
        */}


        {/* brand logo slider 
        <BrandLogoSliderOne spaceBottomClass="pb-70" /> */}
      </LayoutOne>
    </Fragment>
  );
};

export default About;
