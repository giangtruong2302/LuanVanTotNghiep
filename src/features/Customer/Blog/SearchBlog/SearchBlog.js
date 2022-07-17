import React, { useState } from "react";
import { Form as FormAnt, Input, Select } from "antd";
import "./SearchBlog.scss";
import { Form, Formik } from "formik";
import ListBlog from "../ListBlog/ListBlog";

const { Search } = Input;
const { Option } = Select;
const SearchBlog = () => {
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
            <div className="titleService">Blog GH GYM list</div>
            <ListBlog searchValue={searchValue} />

        </>
    );
};
export default SearchBlog;