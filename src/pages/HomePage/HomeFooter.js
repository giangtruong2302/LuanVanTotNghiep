import React from "react";
import { useSelector } from "react-redux";
import {
  FacebookLogo,
  InstagramLogo,
  YoutubeLogo,
  Phone,
  MapPinLine,
  CalendarCheck,
} from "phosphor-react";
import { FormattedMessage } from "react-intl";

const HomeFooter = () => {
  const lang = useSelector((state) => state.app.language);
  console.log("check language: ", lang);
  return (
    <div className="home-footer container-fluid">
      <div className="footerLeft">
        <p className="title-footer-GHGym"><FormattedMessage id="footer.title" /></p>
        <p>
          <Phone size={32} color="#ffffff" /> 0337657262
        </p>
        <p>
          <MapPinLine size={32} color="#ffffff" /> 180 Cao lỗ
          phường 5 Quận 8
        </p>
        <p>
          <CalendarCheck size={32} color="#ffffff" /> <FormattedMessage id="footer.day" /> 6:00 - 22:00
        </p>
      </div>
      <div className="footerCenter">
        <div className="left-blog">
          <p><FormattedMessage id="footer.method" /></p>
          <p><FormattedMessage id="footer.service" /></p>
          <p><FormattedMessage id="footer.private" /></p>
        </div>
        <div className="right-blog">
          <p><FormattedMessage id="footer.recruit" /></p>
          <p><FormattedMessage id="footer.news" /></p>
          <p><FormattedMessage id="footer.contract" /></p>
        </div>
      </div>
      <div className="footerRight">
        <p className="textSocialMedia"><FormattedMessage id="footer.social" /></p>
        <div className="social-media">
          <FacebookLogo size={32} color="#ffffff" />
          <YoutubeLogo size={32} color="#ffffff" />
          <InstagramLogo size={32} color="#ffffff" />
        </div>
      </div>
    </div>
  );
};
export default HomeFooter;
