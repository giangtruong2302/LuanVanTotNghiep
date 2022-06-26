import React, { useState } from "react";
import "./ListPT.scss";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { LicenseManager } from "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import { Gear } from "phosphor-react";
import frameworkcomponents from "./path";
LicenseManager.setLicenseKey(
  "For_Trialing_ag-Grid_Only-Not_For_Real_Development_Or_Production_Projects-Valid_Until-15_August_2020_[v2]_MTU5NzQ0NjAwMDAwMA==9aa5b7bf868ec5d39dc5cb979372325b"
);

const ListPT = () => {
  const [rowData] = useState([
    {
      setting: <Gear size={20} color="#0a0700" weight="light" />,
      status: "Active",
      staff: "Duong Giang",
      phone: "033 765 7262",
      email: "giangtruong2302@gmail.com",
      address: "tp hcm",
    },
    {
      setting: <Gear size={20} color="#0a0700" weight="light" />,
      status: "Active",
      staff: "Duong Giang",
      phone: "033 765 7262",
      email: "giangtruong2302@gmail.com",
      address: "tp hcm",
    },
    {
      setting: <Gear size={20} color="#0a0700" weight="light" />,
      status: "Active",
      staff: "Duong Giang",
      phone: "033 765 7262",
      email: "giangtruong2302@gmail.com",
      address: "tp hcm",
    },
    {
      setting: <Gear size={20} color="#0a0700" weight="light" />,
      status: "Active",
      staff: "Duong Giang",
      phone: "033 765 7262",
      email: "giangtruong2302@gmail.com",
      address: "tp hcm",
    },
    {
      setting: <Gear size={20} color="#0a0700" weight="light" />,
      status: "Active",
      staff: "Duong Giang",
      phone: "033 765 7262",
      email: "giangtruong2302@gmail.com",
      address: "tp hcm",
    },
    {
      setting: <Gear size={20} color="#0a0700" weight="light" />,
      status: "Active",
      staff: "Duong Giang",
      phone: "033 765 7262",
      email: "giangtruong2302@gmail.com",
      address: "tp hcm",
    },
    {
      setting: <Gear size={20} color="#0a0700" weight="light" />,
      status: "Active",
      staff: "Duong Giang",
      phone: "033 765 7262",
      email: "giangtruong2302@gmail.com",
      address: "tp hcm",
    },
    {
      setting: <Gear size={20} color="#0a0700" weight="light" />,
      status: "Active",
      staff: "Duong Giang",
      phone: "033 765 7262",
      email: "giangtruong2302@gmail.com",
      address: "tp hcm",
    },
    {
      setting: <Gear size={20} color="#0a0700" weight="light" />,
      status: "Active",
      staff: "Duong Giang",
      phone: "033 765 7262",
      email: "giangtruong2302@gmail.com",
      address: "tp hcm",
    },
  ]);
  const [columnDefs] = useState([
    {
      field: "setting",
      flex: 0,
      // headerName: "Setting",
      cellRenderer: "settingRenderer",
    },
    {
      field: "status",
      // width: 550,
      flex: 0,
      // headerName: "Status",
      cellRenderer: "statusRenderer",
    },
    {
      field: "staff",
      flex: 2,
      // width: 215,
      // headerName: "PT",
      // type: "rightAligned",
      cellRenderer: "staffRenderer",
    },
    {
      field: "phone",
      // width: 215,
      // headerName: "Phone",
      // type: "rightAligned",
      flex: 0,
      cellRenderer: "phoneRenderer",
    },
    {
      field: "email",
      // width: 215,
      // headerName: "Email",
      // type: "rightAligned",
      cellRenderer: "emailRenderer",
      flex: 2,
    },
    {
      field: "address",
      // width: 215,
      // headerName: "Address",
      // type: "rightAligned",
      flex: 2,
      cellRenderer: "addressRenderer",
    },
  ]);

  const defaultColDef = {
    resizable: true,
    flex: 1,
    minWidth: 100,
  };
  const gridOptions = {
    rowSelection: "single",
    // rowModelType: 'serverSide',
    rowBuffer: 0,
    cacheBlockSize: 10,
    cacheOverflowSize: 1,
    maxConcurrentDatasourceRequests: 1,
    infiniteInitialRowCount: 10,
    maxBlocksInCache: 1000,
  };

  return (
    <div
      className={"agThemeAlpineStaffs container-fluid"}
      style={{
        height: 501,
        width: "100%",
        padding: "0 20px",
      }}
    >
      <AgGridReact
        defaultColDef={defaultColDef}
        headerHeight={80}
        rowData={rowData}
        columnDefs={columnDefs}
        gridOptions={gridOptions}
        rowHeight={73}
        frameworkComponents={frameworkcomponents}
      />
    </div>
  );
};
export default ListPT;
