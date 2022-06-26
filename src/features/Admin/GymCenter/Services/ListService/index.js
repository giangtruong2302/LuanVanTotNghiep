import React, { useState } from "react";
import classes from "./styles.module.scss";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { LicenseManager } from "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import frameworkcomponents from "./path";
LicenseManager.setLicenseKey(
  "For_Trialing_ag-Grid_Only-Not_For_Real_Development_Or_Production_Projects-Valid_Until-15_August_2020_[v2]_MTU5NzQ0NjAwMDAwMA==9aa5b7bf868ec5d39dc5cb979372325b"
);

const ListService = () => {
  const [rowData] = useState([
    {
      service: "Manicure",
      workDuration: "1 Hrs 30 Mins",
      price: "$40.00",
    },
    {
      service: "Manicure",
      workDuration: "1 Hrs 30 Mins",
      price: "$40.00",
    },
    {
      service: "Manicure",
      workDuration: "1 Hrs 30 Mins",
      price: "$40.00",
    },
    {
      service: "Manicure",
      workDuration: "1 Hrs 30 Mins",
      price: "$40.00",
    },
    {
      service: "Manicure",
      workDuration: "1 Hrs 30 Mins",
      price: "$40.00",
    },
    {
      service: "Manicure",
      workDuration: "1 Hrs 30 Mins",
      price: "$40.00",
    },
  ]);
  const [columnDefs] = useState([
    {
      field: "service",
      // width: 550,
      flex: 2,
      headerName: "Service",
      cellRenderer: "serviceNameRenderer",
    },
    {
      field: "workDuration",
      // width: 215,
      headerName: "Work Duration",
      type: "rightAligned",
      cellRenderer: "estimateTime",
    },
    {
      field: "price",
      // width: 215,
      headerName: "Price (USA)",
      type: "rightAligned",
      cellRenderer: "priceRenderer",
    },
  ]);

  const rowSelection = (item) => {
    // return navigation("/dashboard");
  };
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
  const rowStyle = { background: "white" };

  return (
    <div
      className={classes.agThemeAlpineService}
      style={{
        height: 501,
        width: "100%",
        padding: "0 20px",
      }}
    >
      <AgGridReact
        defaultColDef={defaultColDef}
        headerHeight={60}
        rowData={rowData}
        columnDefs={columnDefs}
        gridOptions={gridOptions}
        rowHeight={73}
        rowStyle={rowStyle}
        frameworkComponents={frameworkcomponents}
      />
    </div>
  );
};
export default ListService;
