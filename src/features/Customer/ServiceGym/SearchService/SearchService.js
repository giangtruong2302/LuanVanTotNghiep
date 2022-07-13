import React, { useState } from "react";
import { Form as FormAnt, Input, Select } from "antd";
import "./SearchService.scss";
import { Form, Formik } from "formik";
import ListService from "../ListService/ListService";
const { Search } = Input;
const { Option } = Select;
const SearchService = () => {
  const [searchValue, setSearchValue] = useState("");
  const onSearch = (value) => {
    console.log(value);
    setSearchValue(value);
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
                  placeholder="Search service of GH GYM..."
                  allowClear
                  onSearch={onSearch}
                />
              </FormAnt.Item>
            </Form>
          </Formik>
        </div>
      </div>
      <div className="titleService">Service GH GYM list</div>
      <ListService searchValue={searchValue} />
    </>
  );
};
export default SearchService;
