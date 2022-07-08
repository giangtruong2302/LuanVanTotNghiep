import React, { useState, useEffect } from "react";
import { LANGUAGES } from "../../../utils/constant";
import moment from "moment";
import { Select, Button } from 'antd';
import "./createTimeWorking.scss"
import { getAllTimeWorking } from "./createTimeWorkingAPI"
import { createSchedule } from "./createTimeWorkingAPI"

import { useSelector } from "react-redux";
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
const { Option } = Select;



const getArrDays = () => {
    let allDays = [];

    for (let i = 0; i < 7; i++) {
        let object = {};

        if (i === 0) {
            let ddMM = moment(new Date()).format("DD/MM");
            let today = `Hôm nay - ${ddMM}`;
            object.label = today;
        } else {
            let labelVi = moment(new Date())
                .add(i, "days")
                .format("dddd - DD/MM");
            object.label = capitalizeFirstLetter(labelVi); // In hoa ký tự đầu tiên //
        }


        object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();

        allDays.push(object);
    }

    return allDays;
};




const CreateTime = () => {

    const staffInfo = useSelector((state) => state.staff.staffInfo);
    const handleDay = (e) => {
        console.log(e.target.value)
        setTimeStamp(e.target.value)
    }
    const handleChange = (value) => {
        console.log(value);
        setTimeId(value)
    };
    const handleCreateTimeWork = () => {
        createSchedule(timeStamp, staffInfo["AccountStaff.id"], timeId)
    }
    const [timeId, setTimeId] = useState();
    const [timeStamp, setTimeStamp] = useState();
    const [allTime, setAllTime] = useState();
    const [noAllTime, setNoAllTime] = useState(false);
    const [, setAllTimeLoading] = useState(true);
    useEffect(() => {

        getAllTimeWorking("1").then((response) => {

            if (response.time.rows.length > 0) {
                setAllTime(response.time.rows);
                setNoAllTime(false);
            } else {
                setNoAllTime(true);
            }
        })
            .catch(() => {
                setNoAllTime(true);
            })
            .finally(() => {
                setAllTimeLoading(false);
            });
    }, []);
    useEffect(() => {
        const arrDay = getArrDays();
        setAllDays(arrDay);
    }, []);
    const [allDays, setAllDays] = useState([]);
    const [valueTime, setValueTime] = useState();
    return (
        <div className="createTimeContainer">
            <div className="contentStaff">
                Create Page
                <select onChange={handleDay}  >
                    {allDays && allDays.length > 0
                        ? allDays.map((item, index) => {
                            return (
                                <option key={index} value={item.value} >
                                    {item.label}
                                </option>
                            );
                        })
                        : ""}
                </select>
                <Select
                    defaultValue="SelecTime"
                    style={{
                        width: 120,
                    }}
                    onChange={handleChange}
                >
                    {allTime?.map((item, index) => {
                        return (
                            <Option value={item.id} >{item.TimeWork}</Option>


                        )
                    })}

                </Select>
                <Button onClick={handleCreateTimeWork}> Tạo lịch</Button>
            </div>
        </div>
    )
}
export default CreateTime