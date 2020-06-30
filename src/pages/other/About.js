import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import SectionTitleWithText from "../../components/section-title/SectionTitleWithText";
import TeamMemberOne from "../../wrappers/team-member/TeamMemberOne";

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
      <LayoutOne>

        {/* section title with text */}
        <SectionTitleWithText spaceTopClass="pt-100" spaceBottomClass="pb-95" />

        {/* team member */}
        <TeamMemberOne spaceTopClass="pt-95" spaceBottomClass="pb-70" />

      </LayoutOne>
    </Fragment>
  );
};

export default About;
