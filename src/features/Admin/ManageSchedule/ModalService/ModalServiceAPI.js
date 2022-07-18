import axios from "../../../../axios";
// import axios from 'axios'

const handleCreateNewCenter = (
  CenterName,
  CenterImage,
  fileName,
  CenterAddress,
  CenterPhoneNumber,
  ManagerId,
  Status
) => {
  // console.log("first", userEmail, userPassword);
  return axios.post(`/api/create-center`, {
    CenterName,
    CenterImage,
    fileName,
    CenterAddress,
    CenterPhoneNumber,
    ManagerId,
    Status,
  });
};
const handleUpdateCenter = (
  CenterName,
  CenterImage,
  fileName,
  CenterAddress,
  CenterPhoneNumber,
  ManagerId,
  Status,
  id
) => {
  return axios.put(`/api/admin/update-center`, {
    CenterName: CenterName,
    CenterImage: CenterImage,
    fileName: fileName,
    CenterAddress: CenterAddress,
    CenterPhoneNumber: CenterPhoneNumber,
    ManagerId: ManagerId,
    Status: Status,
    id: id,
  });
};
const handleChangeStatusOfCenter = (id, Status) => {
  return axios.put(`/api/admin/de-active-center`, {
    id: id,
    Status: Status,
  });
};
const handleGetAllTimeWorking = (page) => {
  return axios.get(`/api/get-all-time-working?page=${page}`);
};
const handleCreateNewTimeWorking = (StartTime, EndTime) => {
  return axios.post(`/api/admin/create-new-time-working`, {
    StartTime,
    EndTime,
  });
};
const handleDeleteTimeWorking = (id) => {
  return axios.delete(`/api/delete-time-working`, { data: { id: id } });
};
const handleUpdateTime = (id, StartTime, EndTime) => {
  return axios.put(`/api/update-time-working`, { id, StartTime, EndTime });
};
export {
  handleDeleteTimeWorking,
  handleCreateNewTimeWorking,
  handleCreateNewCenter,
  handleUpdateCenter,
  handleChangeStatusOfCenter,
  handleGetAllTimeWorking,
  handleUpdateTime,
};
