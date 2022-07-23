import axios from "../../axios";

const getPTDetail = (ExternalId) => {
  return axios.get(
    `/api/get-detail-staff-by-external?ExternalId=${ExternalId}`
  );
};

const createSchedule = (DayWork, StaffId, TimeId, Status) => {
  return axios.post(`/api/create-schedule-working?DayWork`, {
    DayWork: DayWork,
    StaffId: StaffId,
    TimeId: TimeId,
    Status: Status,
  });
};
const getAllTimeWorking = (page) => {
  return axios.get(`/api/get-all-time-working?page=${page}`);
};
const updateStaffDetail = (
  id,
  ExternalId,
  fullName,
  email,
  avatar,
  fileName,
  phoneNumber,
  Gender,
  address,
  roleId,
  dob,
  centerId,
  salaryId
) => {
  return axios.put(`/api/admin/update-account`, {
    id: id,
    ExternalId: ExternalId,
    fullName: fullName,
    email: email,
    avatar: avatar,
    fileName: fileName,
    phoneNumber: phoneNumber,
    Gender: Gender,
    address: address,
    roleId: roleId,
    dob,
    centerId: centerId,
    salaryId: salaryId,
  });
};
const handleCheckTimeOfCustomer = (
  ServiceId,
  CustomerId,
  StaffId,
  TimeCheck
) => {
  return axios.post(`/api/create-day-excercise-of-customer`, {
    ServiceId,
    CustomerId,
    StaffId,
    TimeCheck,
  });
};
const handleGetDetailStaff = (ExternalId) => {
  return axios.get(
    `/api/get-detail-staff-by-external?ExternalId=${ExternalId}`
  );
};
const handleGetDetailBookingByStaffId = (PTId) => {
  return axios.get(`/api/get-booking-detail?PTId=${PTId}`);
};
export {
  handleGetDetailBookingByStaffId,
  handleGetDetailStaff,
  getPTDetail,
  createSchedule,
  getAllTimeWorking,
  updateStaffDetail,
  handleCheckTimeOfCustomer,
};
