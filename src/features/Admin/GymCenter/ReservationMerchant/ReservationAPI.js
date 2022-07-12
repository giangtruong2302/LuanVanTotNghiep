import axios from "../../../../axios";

const getAllReservationOfCenter = (CenterId, name, page) => {
  return axios.get(
    `/api/merchant/${CenterId}/get-all-booking-of-center?page=${page}&name=${name}`
  );
};
export { getAllReservationOfCenter };
