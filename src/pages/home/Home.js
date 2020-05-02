import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutTwo from "../../layouts/LayoutTwo";
import HeroSliderThree from "../../wrappers/hero-slider/HeroSliderThree";
import CategoryOneSlider from "../../wrappers/category/CategoryOneSlider";
import SectionTitleWithText from "../../components/section-title/SectionTitleWithText";
import TabProductThree from "../../wrappers/product/TabProductThree";
import BannerThree from "../../wrappers/banner/BannerThree";

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
        <SectionTitleWithText spaceBottomClass="pb-90" />

        {/* tab product */}
        <TabProductThree spaceBottomClass="pb-60" category="electronics" />

        {/* banner */}
        <BannerThree spaceBottomClass="pb-100" />

      </LayoutTwo>
    </Fragment>
  );
};

export default Home;
