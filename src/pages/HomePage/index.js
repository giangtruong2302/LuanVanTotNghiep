import React, { useState, useLocation } from "react-router-dom";
import "./HomePage.scss";
import HomeHeader from "./HomeHeader";
import HomeFooter from "./HomeFooter";
import Specialty from "./Section/Specialty";
import GymCenter from "./Section/GymCenter";
import OutStandingPT from "./Section/OutStandingPT";
import HandBook from "./Section/HandBook";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const location = useLocation();
  // console.log(location);
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,

    // className: "slide",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
    ],
  };
  var settingCenter = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };
  const url = useLocation();

  return (
    <>
      <HomeHeader isShowBanner={true} />
      <Specialty settings={settings} />
      <GymCenter settings={settingCenter} />
      <OutStandingPT settings={settings} />
      <HandBook settings={settings} />
      {/*
      <About /> */}
      <HomeFooter />
    </>
  );
}
