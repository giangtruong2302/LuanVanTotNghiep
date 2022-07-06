import React, { useState } from "react";
import classes from "./styles.module.scss";
import img from "../../../../../assets/images/gym-place/chiNhanh1.jpg";
import star from "../../../../../assets/images/ratingandreview/S01tar.svg";
// import star from "../../../../../assets/images/ratingandreview/501tar.svg";
import { Clock, ImageSquare, MapPin, NotePencil, Phone } from "phosphor-react";
import NumberFormat from "react-number-format";
import GoogleMapComponent from "../../../../../component/GoogleMap";
import { Link } from "react-router-dom";

const GymDetail = () => {
  const [flag, setFlag] = useState(false);

  return (
    <>
      <div className={classes.salonDetailContainer}>
        <div className={classes.salonDetailLeft}>
          <div className={classes.salonDetailLeftContainer}>
            <div className={classes.salonDetailInfo}>
              <div className={classes.detailTop}>
                <div className={classes.detailTopInfor}>
                  <div className={classes.detailTopInforLeft}>
                    <img src={img} alt="" />
                  </div>
                  <div className={classes.detailTopInforRight}>
                    <div className={classes.detailTitle}>
                      {"checkTypeItem(data?.name)"}
                    </div>
                    <div className={classes.ratingDetail}>
                      <img src={star} alt="" />
                      <div className={classes.ratingDetailInfo}>{"4.0"}</div>
                    </div>
                  </div>
                </div>
                <div className={classes.detailBottomInfor}>
                  <div className={classes.detailBottomItem}>
                    <Phone />
                    <div>
                      Phone:{" "}
                      <NumberFormat
                        value={"9999999999"}
                        displayType={"text"}
                        format="(###) ###-####"
                      />
                    </div>
                  </div>
                  <div className={classes.detailBottomItem}>
                    <MapPin />
                    <div>Address: {"data.address"}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.salonDetailMap}>
              <GoogleMapComponent
                isMarkerShown={flag}
                address={"data.address" || ""}
                height={"203px"}
                width={"317px"}
              />
            </div>
            <div className={classes.salonDetailScan}>
              {/* <div className={classes.qrScanTitle}>
                    Salon QR Code
                    <QRCode value={data.code || ""} size={150} />
                  </div> */}
            </div>
          </div>
        </div>
        <div className={classes.salonDetailRight}>
          <div className={classes.detailRightContainer}>
            <div
              className={classes.changeThumbnail}
              // onClick={() => setShowChangeImageModal(true)}
            >
              <ImageSquare size={32} color="#53d1b6" />
              <div className={classes.changeThumbnailTitle}>
                Change Thumbnail
              </div>
            </div>
            <Link
              to={"/salon-config/details/edit"}
              className={classes.editSalonDetail}
            >
              <NotePencil size={32} color="#53d1b6" />
              <div className={classes.editSalonDetailTitle}>
                Edit Salon Details
              </div>
            </Link>
            <div
              className={classes.editSalonDetail}
              // onClick={() => setShowTimeZoneModal(true)}
            >
              <Clock size={32} color="#53d1b6" />
              <div className={classes.editSalonDetailTitle}>
                Change Timezone
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default GymDetail;
