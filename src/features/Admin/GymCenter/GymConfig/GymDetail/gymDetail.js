import React, { useEffect, useState } from "react";
import classes from "./styles.module.scss";
import img from "../../../../../assets/images/gym-place/chiNhanh1.jpg";
import star from "../../../../../assets/images/ratingandreview/S01tar.svg";
// import star from "../../../../../assets/images/ratingandreview/501tar.svg";
import { Clock, ImageSquare, MapPin, NotePencil, Phone } from "phosphor-react";
import NumberFormat from "react-number-format";
import GoogleMapComponent from "../../../../../component/GoogleMap";
import { Link } from "react-router-dom";
import { getDetailCenter } from "../../../AdminAPI";
import UpdateService from "../../../ManageCenter/ModalService/modalUpdateService";

const GymDetail = () => {
  const [flag, setFlag] = useState(false);
  const CenterId = localStorage.getItem("CenterId");
  const [detailCenter, setDetailCenter] = useState();
  const [status, setStatus] = useState("");
  const [showModalEditDetail, setShowModalEditDetail] = useState(false);
  const handleModalUpdateCenter = (isVisible) => {
    setShowModalEditDetail(isVisible);
  };
  const showModalUpdate = () => {
    setShowModalEditDetail(true);
  };
  const takeStatus = (value) => {
    setStatus(value);
  };
  useEffect(() => {
    try {
      getDetailCenter(parseInt(CenterId))
        .then((res) => {
          setDetailCenter(res.centerDetail);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  }, [CenterId, status]);

  return (
    <>
      <div className={classes.salonDetailContainer}>
        <div className={classes.salonDetailLeft}>
          <div className={classes.salonDetailLeftContainer}>
            <div className={classes.salonDetailInfo}>
              <div className={classes.detailTop}>
                <div className={classes.detailTopInfor}>
                  <div className={classes.detailTopInforLeft}>
                    <img
                      src={
                        detailCenter?.CenterImage
                          ? detailCenter?.CenterImage
                          : img
                      }
                      alt=""
                    />
                  </div>
                  <div className={classes.detailTopInforRight}>
                    <div className={classes.detailTitle}>
                      {detailCenter?.CenterName
                        ? detailCenter?.CenterName
                        : "N/A"}
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
                        value={
                          detailCenter?.CenterPhoneNumber
                            ? detailCenter?.CenterPhoneNumber
                            : "N/A"
                        }
                        displayType={"text"}
                        format="(###) ###-####"
                      />
                    </div>
                  </div>
                  <div className={classes.detailBottomItem}>
                    <MapPin />
                    <div>
                      Address:{" "}
                      {detailCenter?.CenterAddress
                        ? detailCenter?.CenterAddress
                        : "N/A"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.salonDetailMap}>
              {/* <GoogleMapComponent
                isMarkerShown={flag}
                address={detailCenter.CenterAddress || ""}
                height={"203px"}
                width={"317px"}
              /> */}
              <div class="mapouter">
                <div class="gmap_canvas">
                  <iframe
                    class="gmap_iframe"
                    frameborder="0"
                    width="400px"
                    height={"250px"}
                    scrolling="no"
                    marginheight="0"
                    marginwidth="0"
                    src="https://maps.google.com/maps?width=700&amp;height=400&amp;hl=en&amp;q=Thành Phố Hồ Chí Minh&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  ></iframe>
                </div>
              </div>
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
            <div onClick={showModalUpdate} className={classes.editSalonDetail}>
              <NotePencil size={32} color="#53d1b6" />
              <div className={classes.editSalonDetailTitle}>
                Edit Salon Details
              </div>
            </div>
          </div>
        </div>
        {showModalEditDetail && (
          <UpdateService
            handleModal={handleModalUpdateCenter}
            showModal={showModalEditDetail}
            data={detailCenter}
            takeStatus={takeStatus}
          />
        )}
      </div>
    </>
  );
};
export default GymDetail;
