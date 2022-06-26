import Staff from "../models/Staff";
import db from "../models/index";
import StaffService from "../Services/StaffService";

const handleGetAllStaff = async (req, res) => {
  let staffs = await StaffService.getAllStaff(req.query);
  return res.status(200).json({
    errCode: 0,
    errMessage: "get all staff is success",
    staffs,
    totalPage: Math.ceil(staffs.count / 10),
  });
};
const handleGetPTDetail = async (req, res) => {
  // console.log("check id: ", req.query);
  const staffDetail = await StaffService.getDetailPT(req.query.id);

  return res.status(200).json({
    errCode: 0,
    errMessage: "get detail pt is success",
    staffDetail,
  });
};
module.exports = {
  handleGetAllStaff,
  handleGetPTDetail,
};
