import Customer from "../models/Customer";
import db from "../models/index";
import ScheduleWorkingService from "../Services/ScheduleWorkingService";

const handleGetAllBooking = async (req, res) => {
  let bookings = await BookingService.getAllBooking(req.query);
  return res.status(200).json({
    errCode: 0,
    errMessage: "get all bookings is success",
    bookings,
    totalPage: Math.ceil(bookings.count / 10),
  });
};

const handleGetScheduleWorkingOfPT = async (req, res) => {
  const ScheduleWorking = await ScheduleWorkingService.getAllScheduleWorkOfPT(
    req
  );
  return res.status(200).json({
    errCode: 0,
    errMessage: "get all schedule working of pt is success",
    ScheduleWorking,
    totalPage: Math.ceil(ScheduleWorking.count / 10),
  });
};
module.exports = {
  handleGetScheduleWorkingOfPT,
};
