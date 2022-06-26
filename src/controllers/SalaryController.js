import Customer from "../models/Customer";
import db from "../models/index";
import SalaryService from "../Services/SalaryService";

const handleGetAllSalary = async (req, res) => {
  let salary = await SalaryService.getAllSalary(req.query);
  return res.status(200).json({
    errCode: 0,
    errMessage: "get all salary is success",
    salary,
    totalPage: Math.ceil(salary.count / 10),
  });
};

module.exports = {
  handleGetAllSalary,
};
