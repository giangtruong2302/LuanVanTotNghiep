import React, { useState } from "react";
import { Form as FormAnt, Input, Select } from "antd";
import "./searchPT.scss";
import { Form, Formik } from "formik";

const SearchPT = () => {
  const { Search } = Input;
  const { Option } = Select;
  const [searchSelected, setSearchSelected] = useState("name");
  const onChange = (value) => {
    setSearchSelected(value);
  };
  const onSearch = (value) => {
    console.log(value);
  };
  return (
    <>
      <div className="searchContainer">
        <div className="searchSelected">
          <Select
            defaultValue="P.T Name"
            style={{
              width: 150,
              borderRadius: 10,
              border: "1px solid rgb(217 221 221)",
              boxShadow: " 0px 10px 40px rgb(58, 41, 106, 0.1)",
            }}
            bordered={false}
            // onChange={onChange}
          >
            <Option>PT Name</Option>
            <Option>Phone Number</Option>
            <Option>Email</Option>
            <Option>Address</Option>
          </Select>
        </div>
        <div className="searchSection">
          <Formik
            initialValues={{
              text: "",
            }}
            onSubmit={async (values) => {
              console.log(values);
              // handleLogin(values);
            }}
          >
            <Form>
              <FormAnt.Item>
                <Search
                  className="searchCustomer"
                  placeholder="Search PT name, mobile number..."
                  allowClear
                  onSearch={onSearch}
                />
              </FormAnt.Item>
            </Form>
          </Formik>
        </div>
      </div>
      <div className="titlePTList">Personal Trainer List</div>
    </>
  );
};
export default SearchPT;
