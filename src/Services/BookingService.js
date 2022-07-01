import db from "../models/index";
import bcrypt from "bcryptjs";
import { raw } from "body-parser";
require("dotenv").config();
var salt = bcrypt.genSaltSync(10);
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const getAllBooking = async (payloadReq) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = (payloadReq.page - 1) * 10;
      let booking = await db.Booking.findAndCountAll({
        // attributes: {
        //   exclude: ["password"],
        // },
        limit: 10,
        offset: skip,
        // include: [{ model: db.Roles, as: "UserRoles" }],
        raw: true,
        nest: true,
      });

      resolve(booking);
    } catch (e) {
      reject(e);
    }
  });
};

const getAllBookingOfPT = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = (req.query.page - 1) * 10;
      let staffs = await db.Booking.findAndCountAll({
        where: {
          PTId: req.params.PTId,
        },
        // attributes: {
        //   exclude: ["password"],
        // },
        limit: 10,
        offset: skip,
        // include: [{ model: db.Roles, as: "UserRoles" }],
        raw: true,
        nest: true,
      });

      resolve(staffs);
    } catch (e) {
      reject(e);
    }
  });
};

const getAllBookingOfCenter = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = (req.query.page - 1) * 10;
      let bookings = await db.Booking.findAndCountAll({
        where: {
          CenterId: req.params.CenterId,
        },
        // attributes: {
        //   exclude: ["password"],
        // },
        limit: 10,
        offset: skip,
        // include: [{ model: db.Roles, as: "UserRoles" }],
        raw: true,
        nest: true,
      });

      resolve(bookings);
    } catch (e) {
      reject(e);
    }
  });
};
const getDetailBookingOfPT = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let bookingOfPT = await db.Booking.findOne({
        where: { PTId: id },
        // include: [
        //     { model: db.Artists, as: 'SongOfArtists' },
        //     { model: db.Genres, as: 'GenresSong', attributes: ['id', 'genresName'] },
        // ],
        raw: false,
        nest: true,
      });

      resolve(bookingOfPT);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getAllBooking,
  getDetailBookingOfPT,
  getAllBookingOfPT,
  getAllBookingOfCenter,
};