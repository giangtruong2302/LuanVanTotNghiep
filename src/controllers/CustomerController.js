import Customer from "../models/Customer";
import db from "../models/index";
import CustomerService from "../Services/CustomerService";

const handleGetAllCustomer = async (req, res) => {
  let customers = await CustomerService.getAllCustomer(req.query);
  return res.status(200).json({
    errCode: 0,
    errMessage: "get all customers is success",
    customers,
    totalPage: Math.ceil(customers.count / 10),
  });
};

module.exports = {
  handleGetAllCustomer,
};
