import axios from "../../../../axios";

const getAllReservationOfCenter = (CenterId, page) => {
  return axios.get(
    `/api/merchant/${CenterId}/get-all-booking-of-center?page=${page}`
  );
};
export { getAllReservationOfCenter };
