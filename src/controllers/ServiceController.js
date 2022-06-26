import Customer from "../models/Customer";
import db from "../models/index";
import ServiceOfCenterService from "../Services/ServiceOfCenterService";

const handleGetAllService = async (req, res) => {
  let services = await ServiceOfCenterService.getAllService(req.query);
  return res.status(200).json({
    errCode: 0,
    errMessage: "get all service is success",
    services,
    totalPage: Math.ceil(services.count / 10),
  });
};
const handleGetServiceDetail = async (req, res) => {
  // console.log("check id: ", req.query);
  const serviceDetail = await ServiceOfCenterService.getDetailService(
    req.query.id
  );

  return res.status(200).json({
    errCode: 0,
    errMessage: "get detail service is success",
    serviceDetail,
  });
};
module.exports = {
  handleGetAllService,
  handleGetServiceDetail,
};
