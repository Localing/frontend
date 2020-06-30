import PropTypes from "prop-types";
import React from "react";
import SectionTitleTwo from "../../components/section-title/SectionTitleTwo";
import teamMemberData from "../../data/team-members/team-member-one.json";
import TeamMemberOneSingle from "../../components/team-member/TeamMemberOneSingle";

const TeamMemberOne = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div
      className={`team-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        {/* section title */}
        <SectionTitleTwo
          titleText="Our Team"
          subTitleText=""
          positionClass="text-center"
          spaceClass="mb-60"
        />

        <div className="row">
          {teamMemberData &&
            teamMemberData.map((single, key) => {
              return (
                <TeamMemberOneSingle
                  data={single}
                  spaceBottomClass="mb-30"
                  key={key}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

TeamMemberOne.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default TeamMemberOne;
