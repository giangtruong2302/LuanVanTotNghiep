import Customer from "../models/Customer";
import db from "../models/index";
import CenterService from "../Services/CenterService";

const handleGetAllCenter = async (req, res) => {
  let centers = await CenterService.getAllCenter(req.query);
  return res.status(200).json({
    errCode: 0,
    errMessage: "get all centers is success",
    centers,
    totalPage: Math.ceil(centers.count / 10),
  });
};

module.exports = {
  handleGetAllCenter,
};
