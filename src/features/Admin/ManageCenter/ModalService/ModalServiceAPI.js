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
export {
  handleCreateNewCenter,
  handleUpdateCenter,
  handleChangeStatusOfCenter,
};
