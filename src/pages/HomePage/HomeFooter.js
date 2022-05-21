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

const HomeFooter = () => {
  const lang = useSelector((state) => state.app.language);
  console.log("check language: ", lang);
  return (
    <div className="home-footer container-fluid">
      <div className="footerLeft">
        <p className="title-footer-GHGym">GH GYM</p>
        <p>
          <Phone size={18} color="#1d1b1b" weight="fill" /> 0337657262
        </p>
        <p>
          <MapPinLine size={18} color="#1d1b1b" weight="fill" /> 180 Cao lỗ
          phường 5 Quận 8
        </p>
        <p>
          <CalendarCheck size={18} color="#1d1b1b" weight="fill" /> Thứ Hai -
          Chủ Nhật 6:00 - 22:00
        </p>
      </div>
      <div className="footerCenter">
        <div className="left-blog">
          <p>Phương thức thanh toán</p>
          <p>Dịch vụ</p>
          <p>Chính sách bảo mật</p>
        </div>
        <div className="right-blog">
          <p>Tuyển dụng</p>
          <p>Tin Tức</p>
          <p>Liên hệ</p>
        </div>
      </div>
      <div className="footerRight">
        <p className="textSocialMedia">Mạng xã hội</p>
        <div className="social-media">
          <FacebookLogo size={24} color="#063684" weight="fill" />
          <InstagramLogo size={24} color="#c06007" weight="fill" />
          <YoutubeLogo size={24} color="#c00707" weight="fill" />
        </div>
      </div>
    </div>
  );
};
export default HomeFooter;
