import moment from "moment";
import { Phone, EnvelopeSimple, MapPinLine, Coin, Clock } from "phosphor-react";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDetailTime } from "../../serviceAPI";
import timezone from "moment-timezone";

import "./customizeListPT.scss";
import { Popover, Steps } from "antd";

const DayRenderer = (props) => {
  // console.log("check props time id: ", props.data);
  const [showPopOver, setShowPopOver] = useState(false);
  const handleClickChange = (visible) => {
    setShowPopOver(visible);
  };
  const hanldeFindDayOfWeek = (DayWork) => {
    return props.data.DayWork?.find((el) => el.DayWork === DayWork);
  };
  const configGetDay = (num) => {
    switch (num) {
      case 0:
        return 6;
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        return num - 1;
      case 6:
        return 0;
      default:
        return 0;
    }
  };
  const hanldeCheckToday = (dayOfWeek) => {
    const currentDay = new Date();
    if (configGetDay(currentDay.getDay()) === dayOfWeek) return "currentDay";
    return "";
  };
  const hanldeConditionDayOff = (dayOfWeek) => {
    return (
      ((props.data.dayOff?.length || 0) > 0 &&
        (props.data.dayOff?.find(
          (el) =>
            timezone
              .utc(el.startAt)

              .weekday() === dayOfWeek
        ) ||
          false)) ||
      props.data.dayOfWeek?.length === 0
    );
  };

  //HADLE DAY OF WEEK FOR EACH CELL
  const hanldeDayOfWeekCondition = () => {
    switch (props.colDef.field) {
      case "mon":
        return {
          startAt: hanldeFindDayOfWeek("0")?.timeFrames[0].startAt || "",
          endAt: hanldeFindDayOfWeek("0")?.timeFrames[0].endAt || "",
          hasDayOff: hanldeConditionDayOff(0) || false,
          dayOfWeek: 0,
        };
      case "tue":
        return {
          // startAt: props.data.TimeId || "",
          // hasDayOff: "tue",
          startAt: hanldeFindDayOfWeek("1")?.timeFrames[0].startAt || "",
          endAt: hanldeFindDayOfWeek("1")?.timeFrames[0].endAt || "",
          hasDayOff: hanldeConditionDayOff(1) || false,
          dayOfWeek: 1,
        };
      case "wed":
        return {
          // startAt: props.data.TimeId || "",
          // hasDayOff: "wed",
          startAt: hanldeFindDayOfWeek("2")?.timeFrames[0].startAt || "",
          endAt: hanldeFindDayOfWeek("2")?.timeFrames[0].endAt || "",
          hasDayOff: hanldeConditionDayOff(2) || false,
          dayOfWeek: 2,
        };
      case "thu":
        return {
          // startAt: props.data.TimeId || "",
          // hasDayOff: "thu",
          startAt: hanldeFindDayOfWeek("3")?.timeFrames[0].startAt || "",
          endAt: hanldeFindDayOfWeek("3")?.timeFrames[0].endAt || "",
          hasDayOff: hanldeConditionDayOff(3) || false,
          dayOfWeek: 3,
        };
      case "fri":
        return {
          // startAt: props.data.TimeId || "",
          // hasDayOff: "fri",
          startAt: hanldeFindDayOfWeek("4")?.timeFrames[0].startAt || "",
          endAt: hanldeFindDayOfWeek("4")?.timeFrames[0].endAt || "",
          hasDayOff: hanldeConditionDayOff(4) || false,
          dayOfWeek: 4,
        };
      case "sat":
        return {
          // startAt: props.data.TimeId || "",
          // hasDayOff: "sat",
          startAt: hanldeFindDayOfWeek("5")?.timeFrames[0].startAt || "",
          endAt: hanldeFindDayOfWeek("5")?.timeFrames[0].endAt || "",
          hasDayOff: hanldeConditionDayOff(5) || false,
          dayOfWeek: 5,
        };
      case "sun":
        return {
          // startAt: props.data.TimeId || "",
          // hasDayOff: "sun",
          startAt: hanldeFindDayOfWeek("6")?.timeFrames[0].startAt || "",
          endAt: hanldeFindDayOfWeek("6")?.timeFrames[0].endAt || "",
          hasDayOff: hanldeConditionDayOff(6) || false,
          dayOfWeek: 6,
        };
      default:
        return { startAt: "", endAt: "", hasDayOff: false, dayOfWeek: 0 };
    }
  };
  const hanldeCheckTypeDayOff = (dayOfWeek) => {
    return props.data.dayOff?.find(
      (el) => timezone.utc(el.startAt).weekday() === dayOfWeek
    )?.type;
  };
  const startAt = hanldeDayOfWeekCondition().startAt;
  const endAt = hanldeDayOfWeekCondition().endAt;
  const condition = hanldeDayOfWeekCondition().hasDayOff;
  const hanldeMoreThanOneTimeShift = useCallback(() => {
    const newShift = [];
    const dayOffSameDay =
      props.data.dayOff?.filter(
        (el) =>
          hanldeCheckTypeDayOff("") !== "ALLDAY" &&
          timezone
            .utc(el.startAt)

            .weekday() === ""
      ) || [];
    // console.log(dayOffSameDay);
    newShift.push(startAt);
    dayOffSameDay.forEach((el) => {
      newShift.push(el.startAt || "");
      newShift.push(el.endAt || "");
    });
    newShift.push(endAt);
    // console.log(testShift);

    // newShift.push(startAt);
    // newShift.push(dayOff.startAt || "");
    // newShift.push(dayOff.endAt || "");
    // newShift.push(endAt);

    const chunked = [];
    let index = 0;

    while (index < newShift.length) {
      chunked.push(newShift.slice(index, index + 2));
      index += 2;
    }

    return chunked;
  }, []);
  const content = (
    <>
      {hanldeMoreThanOneTimeShift().map((el, index) => {
        // console.log(timezone.utc(el[1] || "").tz(currentTimezone || ""));
        return (
          <div key={index}>
            <div className={"timeFramesTitle"}>Shift</div>
            <Steps
              direction="vertical"
              progressDot
              current={-1}
              className={"steps"}
            >
              {index === 0 ? (
                <Steps.Step
                  description={
                    timezone.utc(el[0] || "", "hh:mm A").format("hh:mm A") ||
                    "N/A" + " - Start"
                  }
                />
              ) : (
                <Steps.Step
                  description={
                    timezone
                      .utc(el[0] || "YYYY-MM-DDTHH:mm:ssZ")

                      .format("hh:mm A") || "N/A" + " - Start"
                  }
                />
              )}
              {index === hanldeMoreThanOneTimeShift().length - 1 ? (
                <Steps.Step
                  description={
                    timezone.utc(el[1] || "", "hh:mm A").format("hh:mm A") ||
                    "N/A" + " - Done"
                  }
                />
              ) : (
                <Steps.Step
                  description={
                    timezone
                      .utc(el[1] || "YYYY-MM-DDTHH:mm:ssZ")
                      .format("hh:mm A") || "N/A" + " - Done"
                  }
                />
              )}
            </Steps>
          </div>
        );
      })}
    </>
  );
  const [detailTime, setDetailTime] = useState();
  const [dateTime, setDateTime] = useState();
  useEffect(() => {
    const stamp = new Intl.DateTimeFormat("en-Us", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(props.data?.DayWork);
    setDateTime(stamp);
  }, []);
  // useEffect(() => {
  //   try {
  //     getDetailTime(parseInt(props.data?.TimeId))
  //       .then((res) => {
  //         if (res.time) {
  //           console.log("check res time: ", res.time);
  //           setDetailTime(res.time);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);
  // let time111 = moment(props.data.DayWork).format("dddd, DD-MM-YYYY H:mm A");
  // console.log("time :", time111, props.data.TimeId);
  return (
    <>
      <div className="phoneContainer">
        {props.data.Shiff &&
          props.data?.Shiff.map((item, index) => {
            return (
              <>
                <Popover
                  content={content}
                  trigger="click"
                  placement="right"
                  visible={showPopOver}
                  overlayClassName={"timeFramesContainer"}
                  onVisibleChange={handleClickChange}
                >
                  {" "}
                  {/* {item.TimeId} */}
                  {moment(
                    new Intl.DateTimeFormat("en-Us", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }).format(item.DayWork)
                  ).format("dddd,")}
                  {/* {startAt} */}
                  {/* <div className="phoneText">
                    {/* {moment(props.data?.DayWork).format("dddd, DD-MM-YYYY H:mm A")}{" "} */}
                  {/* {props.data?.DayWork} */}
                  {/* {moment(dateTime).format("dddd, DD-MM-YYYY H:mm A")} */}
                  {/*

                  </div> */}
                  {/* <Clock color="#0a0700" weight="light" /> */}
                </Popover>
              </>
            );
          })}
      </div>
    </>
  );
};
export default DayRenderer;
