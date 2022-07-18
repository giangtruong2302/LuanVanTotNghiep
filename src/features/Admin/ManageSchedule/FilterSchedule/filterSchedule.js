import {
  Checkbox,
  Col,
  DatePicker,
  Empty,
  Form as FormAnt,
  Input,
  message,
  Popover,
  Row,
  Select,
} from "antd";
import "antd/dist/antd.css";
// import type { DatePickerProps } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import empty from "../../../../assets/images/person-placeholder.jpg";
import userPlaceHolder from "../../../../assets/images/imgStaff/staff.png";
import StaggerAnimation from "../../../../component/StaggerAnimation";
import { Field, FieldProps, Form, Formik } from "formik";
import moment, { Moment } from "moment";
import { CaretDown } from "phosphor-react";
import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
// import { checkTypeItem } from "utils/checkTypeItem";
// import { doGetStaffList } from "../../incomeTurn/incomeTurnAPI";
// import { StaffType } from "../../incomeTurn/incomeTurnModel";
import classes from "./styles.module.scss";
// import locale from "antd/es/locale/zh_CN";
import "moment/locale/en-gb";
import { handleGetAllStaff } from "../../AdminAPI";
import { handleGetAllTimeWorking } from "../ModalService/ModalServiceAPI";
// import locale from "antd/es/locale/en_GB";
moment.locale("en", {
  week: {
    dow: 1,
  },
});
const { Search } = Input;
const { Option } = Select;

const weekFormatDisplay = "yyyy/MM/DD";
const weekFormatToBackEnd = "yyyy-MM-DD";

const IncomeTurnFilter = (props) => {
  const [activeCheckbox, setActiveCheckbox] = useState(-1);
  const [count, setCount] = useState(0);

  const [staffOption, setStaffOption] = useState([]);
  const [staffSelected, setStaffSelected] = useState([]);
  const [showPopOver, setShowPopover] = useState(false);
  const [optionSelected, setOptionSelected] = useState("week");
  const [dayStart, setDayStart] = useState("");
  const [initialWeek] = useState(
    moment().startOf("week").format(weekFormatToBackEnd)
  );
  const checkbkRef = useRef(null);
  const [noData, setNoData] = useState(false);
  // const [page, setPage] = useState(2);
  // const dateFormat = 'YYYY/MM/DD';

  const [staffList, setStaffList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [timeWorking, setTimeWorking] = useState();
  const [page, setPage] = useState(2);
  useEffect(() => {
    handleGetAllTimeWorking(1)
      .then((res) => {
        if (res.time) {
          setTimeWorking(res.time.rows);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    handleGetAllStaff(1)
      .then((res) => {
        const data = res.staffs;
        if (data?.rows.length > 0) {
          setStaffList(data.rows);
          setNoData(false);
          if (data.rows.length === 0 || data.rows.length < 10) {
            setHasMore(false);
          }
        } else {
          setNoData(true);
        }
      })
      .catch(() => {
        message.error("Loading staff failure");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const customWeekStartEndFormat = (value) => {
    return `${moment(value)
      .startOf("week")
      .format(weekFormatDisplay)} ~ ${moment(value)
      .endOf("week")
      .format(weekFormatDisplay)}`;
  };
  // const handleSubmitFilter = () => {
  //   props.hanldeTakeFilter(staffOption.toString(), dayStart);
  // };
  const hanldeResetFilter = () => {
    props.hanldeTakeFilter("", initialWeek);
    setStaffOption([]);
    setOptionSelected("week");
    setStaffSelected([]);
    setCount(0);
  };
  const onChangeDayStart = (_date, dateString) => {
    // setDayOff(dateString);
    setDayStart(moment(dateString.split("~")[0]).format(weekFormatToBackEnd));
    props.hanldeTakeFilter(
      staffOption.toString(),
      moment(dateString.split("~")[0]).format(weekFormatToBackEnd)
    );
    props.hanldeTakeFilter(dateString);
    // console.log(dateString.split("~")[0]);
  };

  const onChangeGroup = (checkedValues) => {
    if (dayStart) {
      props.hanldeTakeFilter(checkedValues.toString(), dayStart);
    } else {
      props.hanldeTakeFilter(checkedValues.toString(), initialWeek);
    }

    if (Array.isArray(checkedValues)) {
      setStaffOption(checkedValues);
    }
    const nameString = [];
    checkedValues.forEach((item) => {
      nameString.push(staffList.find((el) => el.id === item)?.firstName || "");
    });
    setStaffSelected(nameString);
  };
  const handleChangeOption = (value) => {
    setOptionSelected(value);
    // console.log(value);
  };

  const handleVisibleChange = (visible) => {
    setShowPopover(visible);
  };
  function onSearchStaff() {
    // console.log(value);
  }
  function onChange(catId, e) {
    setActiveCheckbox(catId);
    setCount(e.target.checked ? count + 1 : count <= 0 ? 0 : count - 1);
  }

  const fetchNextStaff = async () => {
    handleGetAllStaff(page)
      .then((res) => {
        const data = res.staffs.rows;
        if (data && data.length > 0) {
          setStaffList((prev) => {
            return [...prev, ...data];
          });
          if (data.length === 0 || data.length < 10) {
            setHasMore(false);
          }
          setPage(page + 1);
        }
      })
      .catch(() => {
        setHasMore(false);
      });
  };
  const content = (
    <>
      {noData && (
        <Empty
          image={empty}
          imageStyle={{
            height: 60,
          }}
          description={"No Data"}
        />
      )}
      <div className={classes.option}>
        <div className={classes.searchOption}>
          <Formik
            initialValues={{
              text: "",
            }}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            <Form>
              <FormAnt.Item>
                <Field>
                  {({}) => (
                    <Search
                      className={classes.searchCustomer}
                      placeholder="Search..."
                      onSearch={onSearchStaff}
                    />
                  )}
                </Field>
              </FormAnt.Item>
            </Form>
          </Formik>
        </div>

        <Checkbox.Group onChange={onChangeGroup} value={staffOption}>
          <InfiniteScroll
            dataLength={staffList ? staffList.length : 0}
            next={fetchNextStaff}
            hasMore={hasMore}
            style={{ width: "100%" }}
            loader={
              <div className={classes.loading}>
                <StaggerAnimation />
              </div>
            }
            scrollableTarget="scrollableDiv"
          >
            {staffList &&
              staffList.map((item, index) => {
                return (
                  <div className={classes.category} key={index}>
                    <div className={classes.main}>{""}</div>
                    <div
                      className={`${classes.sub} ${
                        index === activeCheckbox && classes.active
                      }`}
                      ref={checkbkRef}
                      key={index}
                    >
                      <Checkbox
                        onChange={(e) => onChange(index, e)}
                        value={item.id}
                      >
                        <Row className={`${classes.display} `}>
                          <Col span={4}>
                            <img
                              src={
                                item?.StaffImage
                                  ? item?.StaffImage
                                  : userPlaceHolder
                              }
                              alt=""
                            />
                          </Col>
                          <Col span={18} style={{ paddingLeft: "10px" }}>
                            {item?.StaffName}
                          </Col>
                        </Row>
                      </Checkbox>
                    </div>
                  </div>
                );
              })}
          </InfiniteScroll>
        </Checkbox.Group>
      </div>
      {/* <button className={classes.search}>Search</button> */}
    </>
    // <>
    //   {loading ? (
    //     <StaggerAnimation />
    //   ) : (

    //   )}
    // </>
  );

  return (
    <div className={classes.incomeTurnContainer}>
      <Row style={{ width: "100%" }}>
        <Col
          span={16}
          style={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Popover
            placement="bottom"
            content={content}
            trigger="click"
            visible={showPopOver}
            onVisibleChange={handleVisibleChange}
            overlayClassName={classes.selectOptionStaff}
            id="scrollableDiv"
          >
            <div className={classes.filterStaff}>
              <div
                className={`${classes.filterSelect} ${
                  count > 0 && classes.active
                }`}
              >
                <div className={classes.selectTitle}>Staff:</div>
                <div className={`${classes.services} `}>
                  <div>
                    {/* {count > 0
                      ? staffSelected.map((item) => item + ", ")
                      : "Any"} */}
                  </div>
                </div>
                <CaretDown
                  size={15}
                  weight="bold"
                  color={`${count > 0 ? "#fff" : "#000"}`}
                />
              </div>
            </div>
          </Popover>

          <div className={classes.filterDate}>
            <div className={classes.selectTitle}>Date:</div>
            <Select
              value={optionSelected}
              bordered={false}
              onChange={handleChangeOption}
              className={classes.selectedText}
              optionFilterProp="children"
            >
              <Option value="week">This Week</Option>
              <Option value="other">Other</Option>
            </Select>
          </div>
          {optionSelected === "week" && (
            <>
              <div className={classes.dateStart}>
                <DatePicker
                  disabled={true}
                  onChange={onChangeDayStart}
                  defaultValue={moment()}
                  format={customWeekStartEndFormat}
                  picker="week"
                />
              </div>
            </>
          )}
          {optionSelected === "other" && (
            <>
              <div className={classes.dateStart}>
                <DatePicker
                  onChange={onChangeDayStart}
                  picker="week"
                  defaultValue={moment()}
                  format={customWeekStartEndFormat}
                  // locale={locale}
                />
              </div>
              {/* <div className={classes.dateStart}>
                <DatePicker onChange={onChangeDayEnd} />
              </div> */}
            </>
          )}
        </Col>

        <Col
          span={8}
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button className={classes.reset} onClick={hanldeResetFilter}>
            Reset Filter
          </button>
          {/* <button className={classes.submit} onClick={handleSubmitFilter}>
            Submit Query
          </button> */}
        </Col>
      </Row>
      <Row
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          paddingTop: "10px",
        }}
      >
        {timeWorking && timeWorking.length > 0
          ? timeWorking.map((item, index) => {
              return (
                <div style={{ display: "flex", gap: "8px" }}>
                  <p
                    style={{
                      color: "#32CD32",
                      fontSize: "12px",
                      fontWeight: "700",
                    }}
                  >
                    {item.id + ":"}
                  </p>

                  {/* <p
                    style={{
                      color: "#000",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    from
                  </p> */}
                  <p
                    style={{
                      color: "#000",
                      fontSize: "12px",
                      fontWeight: "300",
                      fontStyle: "italic",
                    }}
                  >
                    {"(" + item.StartTime + " -"}
                  </p>
                  {/* <p
                    style={{
                      color: "#000",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    to
                  </p> */}
                  <p
                    style={{
                      color: "#000",
                      fontSize: "12px",
                      fontWeight: "300",
                      fontStyle: "italic",
                    }}
                  >
                    {item.EndTime + ")"}
                  </p>
                </div>
              );
            })
          : ""}
      </Row>
    </div>
  );
};

export default IncomeTurnFilter;
