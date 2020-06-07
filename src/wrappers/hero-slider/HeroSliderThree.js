import React from "react";
import Swiper from "react-id-swiper";
import heroSliderData from "../../data/hero-sliders/hero-slider-three.json";
import HeroSliderThreeSingle from "../../components/hero-slider/HeroSliderThreeSingle.js";

const HeroSliderThree = ({ locationData }) => {
  const params = {
    effect: "fade",
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    watchSlidesVisibility: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <i className="pe-7s-angle-left" />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <i className="pe-7s-angle-right" />
      </button>
    )
  };

  return (
    <div className="slider-area">
      <div className="jumbotron jumbotron-fluid d-md-none">
        <h3 className="text-center">
          <i className="fa fa-map-marker" />{" " + locationData.location}
        </h3>
        <br />
        <h2 className="text-center">
          Support your favourite local businesses through the economic shutdown.
        </h2>
        <p className="text-center">
          <a className="btn btn-outline-dark btn-lg" href="/shop-grid-standard" role="button">Shop Now</a>
        </p>
      </div>
      <div className="slider-active nav-style-1 d-none d-md-block">
        <Swiper {...params}>
          {heroSliderData &&
            heroSliderData.map((single, key) => {
              return (
                <HeroSliderThreeSingle
                  data={single}
                  key={key}
                  sliderClass="swiper-slide"
                />
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default HeroSliderThree;
