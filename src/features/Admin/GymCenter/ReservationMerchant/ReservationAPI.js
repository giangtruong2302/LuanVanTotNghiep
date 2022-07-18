import axios from "../../../../axios";

const getAllReservationOfCenter = (CenterId, name, page) => {
  return axios.get(
    `/api/merchant/${CenterId}/get-all-booking-of-center?page=${page}&name=${name}`
  );
};
const getDetailBookingOfCenter = (CenterId, id) => {
  return axios.get(
    `/api/get-booking-detail-center?id=${id}&CenterId=${CenterId}`
  );
};
export { getAllReservationOfCenter, getDetailBookingOfCenter };
