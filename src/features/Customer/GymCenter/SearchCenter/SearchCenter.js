import React, { useState } from "react";
import { Form as FormAnt, Input, Select } from "antd";
import "./SearchCenter.scss";
import { Form, Formik } from "formik";
import ListCenter from "../ListCenter/listCenter";

const { Search } = Input;
const { Option } = Select;
const SearchCenter = () => {
    const [searchValue, setSearchValue] = useState("");
    const onSearch = (value) => {
        console.log(value);
        setSearchValue(value);
    };
    const onChangeSearchServiceSystem = (e) => {
        setTimeout(() => {
            setSearchValue(e.target.value);
        }, 700);
    };
    return (
        <>
            <div className="searchContainer">
                <div className="searchSection">
                    <Formik
                        initialValues={{
                            text: "",
                        }}
                        onSubmit={(value) => {
                            console.log(value);
                        }}
                    >
                        <Form>
                            <FormAnt.Item>
                                <Search
                                    className="searchService"
                                    placeholder="Search center of GH GYM..."
                                    allowClear
                                    onChange={onChangeSearchServiceSystem}
                                    onSearch={onSearch}
                                    enterButton
                                />
                            </FormAnt.Item>
                        </Form>
                    </Formik>
                </div>
            </div>
            <div className="titleService">Center GH GYM list</div>
            <ListCenter searchValue={searchValue} />

        </>
    );
};
export default SearchCenter;