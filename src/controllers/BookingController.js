import Customer from "../models/Customer";
import db from "../models/index";
import BookingService from "../Services/BookingService";

const handleGetAllBooking = async (req, res) => {
  let bookings = await BookingService.getAllBooking(req.query);
  return res.status(200).json({
    errCode: 0,
    errMessage: "get all bookings is success",
    bookings,
    totalPage: Math.ceil(bookings.count / 10),
  });
};

module.exports = {
  handleGetAllBooking,
};
