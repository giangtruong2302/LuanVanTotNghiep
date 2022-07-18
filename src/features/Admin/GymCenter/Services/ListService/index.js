import React, { useCallback, useEffect, useState } from "react";
import classes from "./styles.module.scss";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { LicenseManager } from "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import frameworkcomponents from "./path";
import { getAllService } from "../serviceAPI";
LicenseManager.setLicenseKey(
  "For_Trialing_ag-Grid_Only-Not_For_Real_Development_Or_Production_Projects-Valid_Until-15_August_2020_[v2]_MTU5NzQ0NjAwMDAwMA==9aa5b7bf868ec5d39dc5cb979372325b"
);

const ListService = (props) => {
  const [status, setStatus] = useState("");
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
      ield: "setting",
      flex: 0,
      // headerName: "Setting",
      cellRenderer: "settingServiceRenderer",
      action: {
        action1: (value) => {
          // console.log("check value update:", value);
          setStatus(value);
        },
      },
    },
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
    // rowSelection: "single",
    rowModelType: "serverSide",
    rowBuffer: 0,
    cacheBlockSize: 10,
    cacheOverflowSize: 1,
    maxConcurrentDatasourceRequests: 1,
    infiniteInitialRowCount: 10,
    maxBlocksInCache: 1000,
  };
  const rowStyle = { background: "white" };
  const [gridApiCustomer, setGridApiCustomer] = useState();
  const CenterId = localStorage.getItem("CenterId");
  const serverSideDatasource = useCallback(() => {
    // console.log("check cuurent salon:", CenterId);
    return {
      getRows: function (params) {
        // loading?.classList.remove("hidden");
        const page = params.request.endRow / 10;
        try {
          //FOR FILTER PURPOSE
          getAllService(props.searchValue, parseInt(page))
            .then((res) => {
              // console.log(res.data.data);
              const data = res.services;
              if (data && data.rows.length > 0) {
                const lastRow = () => {
                  if (parseInt(data.totalPage) <= 1) return data.count;
                  else if (page <= parseInt(data.totalPages) - 2) return -1;
                  else return data.count;
                };
                // call the success callback
                setTimeout(() => {
                  params.successCallback(data.rows, lastRow());
                }, 500);
                // loading?.classList.add("hidden");
              } else {
                params.api.showNoRowsOverlay();
              }
            })
            .catch(() => {
              params.api.showLoadingOverlay();
            });
        } catch (error) {}
      },
    };
  }, [CenterId, props.searchValue, props.status, status]);
  const agOverLaytheme =
    '<span class="ag-overlay-loading-center">No rows to show</span>';
  useEffect(() => {
    if (gridApiCustomer) {
      const newDataSource = serverSideDatasource();
      gridApiCustomer.setServerSideDatasource(newDataSource);
    }
  }, [serverSideDatasource, props.searchValue, props.status, status]);

  const onGridReady = (params) => {
    params.api.showLoadingOverlay();
    setGridApiCustomer(params.api);
    const dataSourceAll = serverSideDatasource();
    params.api.setServerSideDatasource(dataSourceAll);
  };
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
        headerHeight={80}
        columnDefs={columnDefs}
        gridOptions={gridOptions}
        rowHeight={73}
        overlayLoadingTemplate={agOverLaytheme}
        frameworkComponents={frameworkcomponents}
        onGridReady={onGridReady}
      />
    </div>
  );
};
export default ListService;
