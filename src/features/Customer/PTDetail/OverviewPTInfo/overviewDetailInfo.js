import React from "react";
import "./overviewDetail.scss";

const OverviewDetail = (props) => {
  return (
    <div className="overViewPT">
      <div className="infoDetail">
        <div className="detailPTTitle">
          <h2>Chuyên viên hướng dẫn xây dựng cơ thể: {props.data?.StaffName}</h2>
        </div>
        <div className="detailPTContent">
          <ul>
            <li>Huấn luyện viên thể hình phòng tập thuộc hệ thống GH Gym TP. HCM. Huấn luyện viên {props.data?.StaffName} có hơn
              10 năm kinh nghiệm trong việc huấn luyện thể chất, cải thiện vóc dáng và nâng cao sức khỏe ở
              mọi độ tuổi.</li></ul>
          <h2> Quá trình công tác</h2>
          <ul>
            <li>Trưởng khoa Dinh Dưỡng, Bệnh viện Da Liễu TP.HCM Nguyên Phó trưởng khoa Lâm sàng 1</li>
            <li>Bệnh viện Da Liễu TP.HCM Hiện là Bác sĩ Da liễu</li>
            <li>Phòng khám Da liễu Táo Đỏ Bác sĩ chuyên khoa da liễu, thẩm mỹ da Bệnh Viện Da Liễu TP.HCM Quá trình đào tạo
              Tốt nghiệp Bác sĩ Chuyên khoa II, chuyên ngành Da liễu</li>
            <li>Đại học Y dược TP.HCM Tốt nghiệp Bác sĩ Chuyên khoa I, chuyên ngành Da liễu, Đại học Y dược TP.HCM</li>
            <li>Tốt nghiệp Bác sĩ Đa khoa, Đại học Y dược TP.HCM Tham gia lớp Sơ bộ DInh dưỡng</li>
            <li>Đại học Y khoa Phạm Ngọc Thạch Thành viên các Hội khoa học, tổ chức chuyên môn Hội viên chi hội Da Liễu Hồ Chí Minh Hội viên Hội Da Liễu Việt Nam Khám và điều trị
            </li>
          </ul>
          <h2>Bác sĩ khám và điều trị:</h2>
          <ul>
            <li>Mụn trứng cá: mụn viêm, bọc, nang, mụn đầu trắng, đâu đen</li>
            <li>Nám, sạm da: nám, sạm da mặt Rụng tóc, da dầu: mụn trứng cá, sẹo lồi, sẹo thâm, sẹo mụn</li>
            <li>Mề đay: tóc gàu, vảy, rụng tóc từng phần, lan tỏa</li>
            <li>Viêm da cơ địa: mảng da đỏ, ngứa nhiều, từng cơn Viêm da dị ứng: mẩn đỏ da, ngứa, lan tỏa</li>
            <li>Thủy đậu: mụn nước, ngứa, kèm sốt nhẹ, mệt mỏi</li>
            <li>Zona: mang mụn nước, 1 bên người, đau nhức Da nhờn, lỗ chân lông to</li>
            <li>Vảy nến: mảng đổ da, tróc vảy, có thể toàn thân Ghẻ ngứa: ngứa về đêm, vùng nếp, kẽ ngón tay, ngón chân</li>
            <li>Rạn da: da đùi, da rạn teo, bụng, nếp bẹn, nách, lưng</li>
            <li>Lão hóa da: da đổi màu, nhão, xệ, nến nhăn, sần</li>
            <li>Da đồi mồi: đốm nâu</li>
            <li>Pemphigus: bóng nước thân mình, niêm mạc </li>
            <li>Xơ cứng bì: da cứng, không đều màu </li>
            <li>Lupus ban đỏ: hồng ban cánh bướm mặt, đau nhức mỏi cơ xương khớp</li>
            <li>Nấm da: da đỏ quằn quện, các vùng da, tóc, nếp da</li>
            <li>Viêm da tiếp xúc: da đỏ, rát, nhạy cảm, tiếp xúc kiến ba khoang</li>
            <li> Viêm da do nhiễm Corticoid, nhạy cảm: da đỏ, giãn mạch, mãng, nhạy cảm, nôi mụn</li>
            <li>Nấm móng Các bệnh lý da khác và bệnh lây qua đường quan hệ tình dục (STDs)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default OverviewDetail;
