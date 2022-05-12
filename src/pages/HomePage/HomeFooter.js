import React from "react";
import { useSelector } from "react-redux";

const HomeFooter = () => {
  const lang = useSelector((state) => state.app.language);
  console.log("check language: ", lang);
  return (
    <div className="home-footer">
      <div className="footerLeft">footer left</div>
      <div className="footerCenter">center</div>
      <div className="footerRight">footer right</div>
    </div>
  );
};
export default HomeFooter;
