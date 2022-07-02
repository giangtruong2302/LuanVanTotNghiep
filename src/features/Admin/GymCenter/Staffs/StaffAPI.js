import axios from "../../../../axios";

const getAllStaffOfCenter = (CenterId, StaffName, page) => {
  return axios.get(
    `/api/merchant/${CenterId}/staff-center?StaffName=${StaffName}&page=${page}`
  );
};
export { getAllStaffOfCenter };
