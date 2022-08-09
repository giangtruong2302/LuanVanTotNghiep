import { Breadcrumb, Col, PageHeader, Row, Form, Input, Select, Rate, Button } from "antd";
import React, { useState, useEffect } from "react";
import "./PTDetail.scss";
import { useNavigate } from "react-router-dom";
import { Question, List, ThumbsUp, Chats } from "phosphor-react";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import ava from "../../../assets/images/imgStaff/staff.png";
import PTShedule from "../GymCenterDetail/PtSchedule/PtSchedule";
import PTSchedulePayment from "./PTSchedulePayment";
import OverviewDetail from "./OverviewPTInfo/overviewDetailInfo";
import { getPtDetail } from "./PtDetailAPI";
import { useParams } from "react-router-dom";
import { createReview } from "../PersonalInfomation/perInfoAPI";
import Modal from 'react-modal';
import { NavLink } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";
import HomeFooter from "../../../pages/HomePage/HomeFooter";
import { ToastContainer, toast } from 'react-toastify';
import { FormattedMessage } from "react-intl";
import { getCenterDetail } from "./PtDetailAPI"
import { handleGetDetailCustomerByExternalId } from "../PayPage/PaymentPage/paymentAPI";
import { useSelector } from "react-redux";
import ListReview from "./ListReview/ListReview";
const customStyles = {
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: '74%',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },

};
const PTDetail = () => {
  const [form] = Form.useForm();
  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
  const [valueRate, setValueRate] = useState(3);
  const navigate = useNavigate();
  const [ptDetail, setptDetail] = useState();
  const [noptDetail, setNoptDetail] = useState(false);
  const [, setptDetailLoading] = useState(true);
  const id = useParams();
  const [centerDetail, setCenterDetail] = useState();
  const [statusReview, setStatusReview] = useState(1);
  const [nocenterDetail, setNoCenterDetail] = useState(false);
  const [, setCenterDetailLoading] = useState(true);
  const [cusDetail, setCusDetail] = useState();
  const [noCusDetail, setNoCusDetail] = useState(false);
  const [, setCusDetailLoading] = useState(true);
  const [modalReviewIsOpen, setReviewIsOpen] = React.useState(false);
  const cusInfo = useSelector((state) => state.cus.cusInfo);
  const [statusPage, setStatusPage] = useState("")
  const options = {

    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  function openModalReview() {
    if (!cusInfo) {
      toast.error("Chức năng cần đăng nhập", options);
    } else {
      setReviewIsOpen(true);
    }
  }
  function afterOpenModalReview() {
    subtitle.style.color = '#000';

  }

  function closeModalReview() {
    setReviewIsOpen(false);
    setStatusPage(Date.now())
  }
  let subtitle;
  const onFinishReview = (values) => {

    console.log('check', values)
    createReview(valueRate, values.ReviewContent, cusDetail?.id, centerDetail?.id, statusReview, ptDetail?.id).then((response) => {
      if (response.message.errCode === 0) {
        toast.success("Success", options)

      } else {

        toast.error("Fail", options);
      }
    })

  };
  useEffect(() => {
    if (cusInfo) {
      try {
        handleGetDetailCustomerByExternalId(cusInfo["ExternalId"]).then((response) => {
          if (response.cusDetail) {
            setCusDetail(response.cusDetail);
            setNoCusDetail(false);
          } else {
            setNoCusDetail(true);
          }
        })
          .catch(() => {
            setNoCusDetail(true);
          })
          .finally(() => {
            setCusDetailLoading(false);
          })
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    }

  }, []);
  useEffect(() => {
    getPtDetail(id.id).then((response) => {
      if (response.staffDetail) {
        setptDetail(response.staffDetail);
        setNoptDetail(false);
        getCenterDetail(response.staffDetail.CenterId).then((response) => {
          if (response.centerDetail) {
            setCenterDetail(response.centerDetail);
            setNoCenterDetail(false);
          } else {
            setNoCenterDetail(true);
          }
        })
          .catch(() => {
            setNoCenterDetail(true);
          })
          .finally(() => {
            setCenterDetailLoading(false);
          });
      } else {
        setNoCenterDetail(true);
      }
    })
      .catch(() => {
        setNoptDetail(true);
      })
      .finally(() => {
        setptDetailLoading(false);
      });
  }, []);


  return (
    <div className="PTDetailBgContainer">
      <div className="backToHome">
        <NavLink to="/Personal-Training" className="backtoHome">
          <ArrowLeft size={24} color="#ffffff" weight="duotone" />
          <div className="textBackToHome"><FormattedMessage id="header.back" /></div>
        </NavLink>

      </div>

      <div className="breadcumDetail" >
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="">
            <span><FormattedMessage id="pt-detail.pt-list" /></span>
          </Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="pt-detail.pt" /> {ptDetail?.StaffName} </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="PTDetailContent">
        <Row className="contentInfo">
          <Col
            span={24}
            offset={0}
            style={{
              display: "flex",
              gap: "15px",
              flexDirection: "column",
            }}
          >

            <Row>
              <Col className="avatarPTDetail" span={4}>
                <img src={ptDetail?.StaffImage} className="imgPT" />
              </Col>
              <Col span={20} className="infoDetailPT">
                <div className="namePTAndPosition">
                  <FormattedMessage id="pt-detail.pt" /> {ptDetail?.StaffName}
                </div>
                <div className="descriptionPTDetail">
                  <div><FormattedMessage id="pt-detail.email" /> :  {ptDetail?.StaffEmail}</div>
                  <div><FormattedMessage id="pt-detail.phoneNumber" /> :  {ptDetail?.StaffPhoneNumber}</div>


                </div>
                <div className="likeAndChat">

                  <span className="btnChat">
                    <Chats size={20} color="#fff" weight="fill" onClick={openModalReview} /> <FormattedMessage id="pt-detail.review" />
                  </span>
                </div>
              </Col>
            </Row>
            <Row className="timeInfo" >
              <Col span={12}>
                <PTShedule ptId={id.id} ptName={ptDetail?.StaffName} centerId={ptDetail?.CenterId} />
              </Col>

            </Row>
            <Row>
              <Col span={24}>
                <OverviewDetail data={ptDetail} />
              </Col>

              <h5><FormattedMessage id="pt-detail.review" /> :</h5>
              <Col span={20}>

                <ListReview data={ptDetail} status={statusPage} />
              </Col>

            </Row>

          </Col>
        </Row>

        <Modal

          isOpen={modalReviewIsOpen}
          onAfterOpen={afterOpenModalReview}
          onRequestClose={closeModalReview}
          style={customStyles}
          contentLabel="Example Modal"
        ><h1><FormattedMessage id="form-review.title-form" /></h1>
          <div ref={(_subtitle) => (subtitle = _subtitle)}>
            <Form form={form} name="control-hooks" onFinish={onFinishReview}>
              <div className="titleInput"><FormattedMessage id="form-review.email" /> :</div>
              <Form.Item
                name="Email"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <div className="titleInput"><FormattedMessage id="form-review.phoneNumber" /> :</div>
              <Form.Item
                name="PhoneNumber"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <div className="titleInput"><FormattedMessage id="form-review.center" />:  {centerDetail?.CenterName}</div>




              <div className="titleInput"><FormattedMessage id="form-review.review-content" /> :</div>
              <Form.Item
                name="ReviewContent"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input className="inputReview" />
              </Form.Item>
              <div className="titleInput"><FormattedMessage id="form-review.rating" /> :</div>
              <span>
                <Rate tooltips={desc} onChange={setValueRate} value={valueRate} />
                {valueRate ? <span className="ant-rate-text">{desc[valueRate - 1]}</span> : ''}
              </span>

              <div className={"btnReView"}>
                <Button type="primary" htmlType="submit" >
                  <FormattedMessage id="form-review.send-review" />
                </Button>
              </div>

            </Form>
          </div>



        </Modal>
      </div>
      <HomeFooter />
    </div>
  );
};
export default PTDetail;
