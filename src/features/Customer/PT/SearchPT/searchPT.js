import React, { useState } from "react";
import { Form as FormAnt, Input, Select } from "antd";
import "./searchPT.scss";
import { Form, Formik } from "formik";
import { FormattedMessage } from "react-intl";
import ListPT from "../ListPT/ListPT";
const SearchPT = () => {
  const { Search } = Input;
  const { Option } = Select;

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
        <div className="searchSelected">

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
      <div className="titlePTList"><FormattedMessage id="title.pt" /></div>
      <ListPT searchValue={searchValue} />
    </>
  );
};
export default SearchPT;
