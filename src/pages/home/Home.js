import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutTwo from "../../layouts/LayoutTwo";
import HeroSliderThree from "../../wrappers/hero-slider/HeroSliderThree";
import CategoryOneSlider from "../../wrappers/category/CategoryOneSlider";
import SectionTitleWithText from "../../components/section-title/SectionTitleWithText";
import ProductGridThree from "../../wrappers/product/ProductGridThree";
import TeamMemberOne from "../../wrappers/team-member/TeamMemberOne";

const Home = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>Localing | Support local businesses affected by COVID-19</title>
        <meta
          name="description"
          content="Support local business affected by COVID-19"
        />
      </MetaTags>
      <LayoutTwo>
        {/* hero slider */}
        <HeroSliderThree />

        {/* category slider */}
        <CategoryOneSlider spaceBottomClass="pb-95" />

        {/* section title with text */}
        <div className="container">
          <div className="welcome-content text-center">
            <h1>Products from Businesses Near You</h1>
          </div></div>
        {/* products */}
        <div
          className={`product-area hm9-section-padding pb-60`}
        >
          <div className="container-fluid">
            <div className="custom-row-4">
              <ProductGridThree
                limit={15}
                spaceBottomClass="mb-35"
              />
            </div>
          </div>
          <br />
          <br />
          <SectionTitleWithText spaceBottomClass="pb-90" />
          <TeamMemberOne spaceTopClass="pt-95" spaceBottomClass="pb-70" />
        </div>
      </LayoutTwo>
    </Fragment>
  );
};

export default Home;
