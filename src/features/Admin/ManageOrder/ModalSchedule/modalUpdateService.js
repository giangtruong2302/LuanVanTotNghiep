import { PictureOutlined } from "@ant-design/icons";
import {
  Col,
  DatePicker,
  Form as FormAnt,
  Input,
  message,
  Modal,
  Row,
  Select,
  Upload,
} from "antd";
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import { useDispatch, useSelector } from "react-redux";
import unknow from "../../../../assets/images/imgStaff/dyno.jpg";
import StaggerAnimation from "../../../../component/StaggerAnimation";
import { Field, FieldProps, Form, Formik } from "formik";
import moment from "moment";
import { XCircle } from "phosphor-react";
import React, { useCallback, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
// import { Area, Point } from "react-easy-crop/types";
import { toast } from "react-toastify";
import classes from "./styles.module.scss";
import { CreateServiceSchema } from "./validation";
import { handleCreateNewService, handleUpdateService } from "./ModalServiceAPI";
import {
  handleGetDetailBookingOfCustomer,
  handleGetDetailDiscount,
  handleGetDetailService,
} from "../orderAPI";
import NumberFormat from "react-number-format";
const { Option } = Select;
const UpdateService = (props) => {
  // console.log("check props update: ", props);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [detailBooking, setDetailBooking] = useState();
  const [detailOrder, setDetailorder] = useState();
  const [detailService, setDetailService] = useState();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const dispatch = useDispatch();

  const getBase64 = (img, callback) => {
    setLoading(false);
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  useEffect(() => {
    if (props.showModal) {
      setIsModalVisible(true);
    }
  }, [props]);
  useEffect(() => {
    try {
      handleGetDetailBookingOfCustomer(props.data.CustomerId)
        .then((res) => {
          if (res.bookingDetail) {
            // console.log("res booking detail: ", res.bookingDetail);
            setDetailBooking(res.bookingDetail);
            handleGetDetailDiscount(res.bookingDetail.idDiscount)
              .then((res) => {
                // console.log("res.discount: ", res.discount);
                if (res.discount) {
                  setDetailorder(res.discount);
                }
              })
              .catch((error) => console.log(error));
            handleGetDetailService(res.bookingDetail.ServiceId)
              .then((res) => {
                if (res.serviceDetail) {
                  setDetailService(res.serviceDetail);
                }
              })
              .catch((error) => console.log(error));
          }
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  }, [props.data]);
  // console.log("check detail booking: ", detailBooking);
  // console.log("check detail discount: ", detailOrder);
  const handleCancel = () => {
    setIsModalVisible(false);
    props.handleModal(false);
  };
  return (
    <>
      <Modal
        centered
        visible={isModalVisible}
        width="677px"
        onCancel={handleCancel}
        closable={true}
        closeIcon={<XCircle size={32} color="#fff" weight="fill" />}
        className={classes.orderDetail}
      >
        <div className={classes.titleCreateStaff}>
          <span className={classes.nameCreate}>Order Detail</span>
        </div>
        <div className={classes.orderContainer}>
          <Row className={classes.contentOrder}>
            <Col span={12} className={classes.leftContent}>
              <div className={classes.orderInfo}>
                <span className={classes.textLeftInfo}>Booking Id</span>
                <span className={classes.textRightInfo}>
                  {detailBooking && detailBooking.id ? detailBooking.id : "N/A"}
                </span>
              </div>
              <div className={classes.orderInfo}>
                <span className={classes.textLeftInfo}>Service Name</span>
                <span className={classes.textRightInfo}>
                  {detailService && detailService.ServiceName
                    ? detailService.ServiceName
                    : "N/A"}
                </span>
              </div>
              <div className={classes.orderInfo}>
                <span className={classes.textLeftInfo}>Work Duration</span>
                <span className={classes.textRightInfo}>
                  {detailService && detailService.WorkDuration
                    ? detailService.WorkDuration
                    : "N/A"}{" "}
                  month
                </span>
              </div>
              <div className={classes.orderInfo}>
                <span className={classes.textLeftInfo}>Price</span>
                <span className={classes.textRightInfo}>
                  <NumberFormat
                    value={
                      detailService?.Price
                        ? detailService.Price.toFixed(3)
                        : "N/A"
                    }
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </span>
              </div>
              <div className={classes.orderInfo}>
                <span className={classes.textLeftInfo}>Discount</span>
                <span className={classes.textRightInfo}>
                  {detailOrder && detailOrder.DiscountRate
                    ? detailOrder.DiscountRate
                    : "N/A"}
                </span>
              </div>
            </Col>
            <Col span={10} className={classes.rightContent}>
              <div className={classes.orderInfo}>
                <span className={classes.textLeftInfo}>Customer</span>
                <span className={classes.textRightInfo}>
                  {detailBooking && detailBooking.CustomerName
                    ? detailBooking?.CustomerName
                    : "N/A"}
                </span>
              </div>
              <div className={classes.orderInfo}>
                <span className={classes.textLeftInfo}>Staff Name</span>
                <span className={classes.textRightInfo}>
                  {detailBooking && detailBooking.PTName
                    ? detailBooking.PTName
                    : "N/A"}
                </span>
              </div>
              <div className={classes.orderInfo}>
                <span className={classes.textLeftInfo}>Address Center</span>
                <span className={classes.textRightInfo}>
                  {detailBooking &&
                  detailBooking.CenterId &&
                  detailBooking.CenterId === 1
                    ? "Chi nhánh Phạm Ngũ Lão"
                    : "Chi nhánh Lý Thường Kiệt"}
                </span>
              </div>

              <div className={classes.orderInfo}>
                <span className={classes.textLeftInfo}>Start Time</span>
                <span className={classes.textRightInfo}>
                  {detailBooking &&
                  detailBooking.StartTime &&
                  detailBooking.StartTime
                    ? moment(detailBooking.StartTime).format(
                        "H:mm A - DD-MM-YYYY"
                      )
                    : "N/A"}
                </span>
              </div>
              <div className={classes.orderInfo}>
                <span className={classes.textLeftInfo}>End Time</span>
                <span className={classes.textRightInfo}>
                  {detailBooking &&
                  detailBooking.EndTime &&
                  detailBooking.EndTime
                    ? moment(detailBooking.EndTime).format(
                        "H:mm A - DD-MM-YYYY"
                      )
                    : "N/A"}
                </span>
              </div>
              <div className={classes.orderInfo}>
                <span className={classes.textLeftInfo}>Status</span>
                <span className={classes.textRightInfo}>
                  {props.data.Status && props.data.Status === 0
                    ? "UNPAID"
                    : "PAID"}
                </span>
              </div>
              <div className={classes.orderInfo}>
                <span className={classes.textLeftInfo}>Total Price</span>
                <span className={classes.textRightInfo}>
                  {props.data.amount}
                </span>
              </div>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
};
export default UpdateService;
