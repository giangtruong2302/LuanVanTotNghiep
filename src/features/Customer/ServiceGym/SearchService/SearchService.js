import React, { useState } from "react";
import { Form as FormAnt, Input, Select } from "antd";
import "./SearchService.scss";
import { Form, Formik } from "formik";
import ListService from "../ListService/ListService";
import { FormattedMessage } from "react-intl";
const { Search } = Input;
const { Option } = Select;

const SearchService = () => {
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
      <div className="titleService"><FormattedMessage id="title.service" /></div>
      <ListService searchValue={searchValue} />
    </>
  );
};
export default SearchService;
