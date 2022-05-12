import "./setHour.scss";
import { Checkbox, TimePicker } from "antd";
import moment from "moment";

const dateOfWeek = [
  {
    display: "Monday",
  },
  {
    display: "Tuesday",
  },
  {
    display: "Wednesday",
  },
  {
    display: "Thursday",
  },
  {
    display: "Friday",
  },
  {
    display: "Saturday",
  },
  {
    display: "Sunday",
    disable: true,
  },
];

const options = ["Enable"];
const SetHour = () => {
  const onChange = (time, timeString) => {
    console.log(time, timeString);
  };
  const onChangeChk = (checkedValues) => {
    console.log(checkedValues);
  };
  return (
    <>
      <div className="serviceHoursTitle">Service hours</div>
      <div className="dateTimePickerContainer">
        {dateOfWeek.map((item, index) => {
          return (
            <div className="dateTimePickerItem" key={index}>
              <div className={`${"day"} ${item.disable && "disable"}`}>
                {item.display}
              </div>
              <div className="timePicker">
                <TimePicker
                  use12Hours
                  format="h:mm A"
                  onChange={onChange}
                  value={moment("07:00 AM", "HH:mm A")}
                  className="timeStartEnd"
                  disabled={item.disable}
                />
                <span>-</span>
                <TimePicker
                  use12Hours
                  format="h:mm A"
                  onChange={onChange}
                  value={moment("07:00 PM", "HH:mm A")}
                  className="timeStartEnd"
                  disabled={item.disable}
                />
              </div>
              <div className="checkbox">
                <Checkbox.Group options={options} onChange={onChangeChk} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="buttonContainer">
        <div className="saveButton">Save</div>
      </div>
    </>
  );
};
export default SetHour;
