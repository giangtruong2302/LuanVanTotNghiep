import React from "react";
import { Form as FormAnt, Input, Select } from "antd";
import "./SearchService.scss";
import { Form, Formik } from "formik";
const { Search } = Input;
const { Option } = Select;
const SearchService = () => {
  const onSearch = (value) => {
    console.log(value);
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
    </>
  );
};
export default SearchService;
