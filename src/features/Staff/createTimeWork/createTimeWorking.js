import React, { useState, useEffect } from "react";
import { LANGUAGES } from "../../../utils/constant";
import moment from "moment";
import { Select, Button } from 'antd';
import "./createTimeWorking.scss"
const { Option } = Select;
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
const handleChange = (value) => {
    console.log(`selected ${value}`);
};

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

const handleDay = (e) => {
    console.log(e.target.value)
}

const CreateTime = () => {
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
                    <Option value="T1">8h-9h30</Option>
                    <Option value="T2">9h30-11h</Option>
                    <Option value="T3">1h30-3h</Option>
                    <Option value="T4">3h30-5h</Option>
                    <Option value="T5">6h-7h30</Option>
                    <Option value="T6">7h30-9h</Option>



                </Select>
                <Button> Tạo lịch</Button>
            </div>
        </div>
    )
}
export default CreateTime