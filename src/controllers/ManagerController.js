import Customer from "../models/Customer";
import db from "../models/index";
import ManagerService from "../Services/ManagerService";

const handleGetAllManageCenter = async (req, res) => {
  let manager = await ManagerService.getAllManagerOfCenter(req.query);
  return res.status(200).json({
    errCode: 0,
    errMessage: "get all manage of centers is success",
    manager,
    totalPage: Math.ceil(manager.count / 10),
  });
};

module.exports = {
  handleGetAllManageCenter,
};
