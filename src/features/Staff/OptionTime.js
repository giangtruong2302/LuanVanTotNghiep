import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { getTimeById } from "../Customer/GymCenterDetail/PtSchedule/PtScheduleAPI";
const OptionTime = (props) => {
    const { Option } = Select;
    const [timeDetail, setTimeDetail] = useState();

    useEffect(() => {
        getTimeById(props.data.id)

            .then((res) => {
                console.log("check time detail: ", res);
                setTimeDetail(res.time);

            })
            .catch((error) => {
                console.log(error);
            });
    }, [props.data]);
    return (
        <Option value={timeDetail?.id} >{timeDetail?.StartTime.substring(0, 5)} - {timeDetail?.EndTime.substring(0, 5)}</Option>
    )
}
export default OptionTime