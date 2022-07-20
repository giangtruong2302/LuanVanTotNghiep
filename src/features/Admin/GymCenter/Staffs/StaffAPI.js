import axios from "../../../../axios";

const getAllStaffOfCenter = (CenterId, StaffName, page) => {
  return axios.get(
    `/api/merchant/${CenterId}/staff-center?StaffName=${StaffName}&page=${page}`
  );
};
const getDetailSalary = (id) => {
  return axios.get(`/api/admin/get-detail-salary?id=${id}`);
};
export { getAllStaffOfCenter, getDetailSalary };
