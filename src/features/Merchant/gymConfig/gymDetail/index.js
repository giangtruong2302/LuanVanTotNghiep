import React from "react";
import "./gymDetail.scss";
import haitu from "../../../../assets/images/imgBaner.png";
import star from "../../../../assets/images/serviceDetailPhoto/S01tar.svg";
import pencil from "../../../../assets/images/serviceDetailPhoto/NotePencil.svg";
import picture from "../../../../assets/images/serviceDetailPhoto/Picture.svg";
import map from "../../../../assets/images/serviceDetailPhoto/image 52.png";
import QrScan from "../../../../assets/images/serviceDetailPhoto/bi_qr-code.png";
import { NavLink } from "react-router-dom";

const GymDetail = () => {
  return (
    <div className="salonDetailContainer">
      <div className="salonDetailLeft">
        <div className="salonDetailLeftContainer">
          <div className="salonDetailInfo">
            <div className="detailTop">
              <div className="detailTopInfor">
                <div className="detailTopInforLeft">
                  <img src={haitu} alt="" />
                </div>
                <div className="detailTopInforRight">
                  <div className={"detailTitle"}>Awesome salon</div>
                  <div className="ratingDetail">
                    <img src={star} alt="" />
                    <div className="ratingDetailInfo">4.0 (500+)</div>
                  </div>
                </div>
              </div>
              <div className="detailBottomInfor">
                <div className="detailBottomItem">
                  <span className="icon-telephone"></span>
                  <div>Phone: 07080927702</div>
                </div>
                <div className="detailBottomItem">
                  <span className="icon-address"></span>
                  <div>
                    Address: Flat 7 118 Blackhorse Grove London W6 7HB UK
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="salonDetailMap">
            <img src={map} alt="" />
          </div>
          <div className="salonDetailScan">
            <div className="qrScanTitle">Salon QR Code</div>
            <img src={QrScan} alt="" />
          </div>
        </div>
      </div>
      <div className="salonDetailRight">
        <div className="detailRightContainer">
          <div className="changeThumbnail">
            <img src={picture} alt="" />
            <div className="changeThumbnailTitle">Change Thumbnail</div>
          </div>
          <NavLink
            to={"/salon-config/details/edit"}
            className="editSalonDetail"
          >
            <img src={pencil} alt="" />
            <div className="editSalonDetailTitle">Edit Salon Details</div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default GymDetail;
