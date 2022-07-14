import React, { useCallback, useEffect, useState } from "react";
import classes from "./styles.module.scss";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { LicenseManager } from "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import { Gear, Plus, SquaresFour } from "phosphor-react";
import { Action, Fab } from "react-tiny-fab";
import { getAllCenter } from "../serviceAPI";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import frameworkcomponents from "./path";
// import { getAllCustomerOfCenter } from "../CusAPI";
import { isVisible } from "@testing-library/user-event/dist/utils";
// import CreateAccount from "../ModalService/modalAddService";
LicenseManager.setLicenseKey(
  "For_Trialing_ag-Grid_Only-Not_For_Real_Development_Or_Production_Projects-Valid_Until-15_August_2020_[v2]_MTU5NzQ0NjAwMDAwMA==9aa5b7bf868ec5d39dc5cb979372325b"
);

const ListManager = (props) => {
  const [status, setStatus] = useState("");

  const [columnDefs] = useState([
    {
      field: "setting",
      flex: 0,
      // headerName: "Setting",
      cellRenderer: "settingRenderer",
      action: {
        action1: (value) => {
          // console.log("check value update:", value);
          setStatus(value);
        },
      },
    },
    {
      field: "Status",
      flex: 1,
      // width: 215,
      // headerName: "PT",
      // type: "rightAligned",
      cellRenderer: "statusRenderer",
    },
    {
      field: "CenterName",
      flex: 2,
      // width: 215,
      // headerName: "PT",
      // type: "rightAligned",
      cellRenderer: "staffRenderer",
    },

    {
      field: "PhoneNumber",
      // width: 215,
      // headerName: "Email",
      // type: "rightAligned",
      cellRenderer: "emailRenderer",
    },
    {
      field: "Address",
      // width: 215,
      // headerName: "Address",
      // type: "rightAligned",
      cellRenderer: "addressRenderer",
    },
  ]);
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
          getAllCenter("", parseInt(page))
            .then((res) => {
              // console.log(res.data.data);
              const data = res.centers;
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
  }, [CenterId, props.status, props.searchValue, status]);
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
  const [searchValue, setSearchValue] = useState("");
  const agOverLaytheme =
    '<span class="ag-overlay-loading-center">No rows to show</span>';
  useEffect(() => {
    // console.log("check search value list :", props.searchValue);
    if (props.searchValue !== "") {
      setSearchValue(props.searchValue);
    }
    if (gridApiCustomer) {
      const newDataSource = serverSideDatasource();
      gridApiCustomer.setServerSideDatasource(newDataSource);
    }
  }, [serverSideDatasource, props.status, props.searchValue, status]);

  const onGridReady = (params) => {
    params.api.showLoadingOverlay();
    setGridApiCustomer(params.api);
    const dataSourceAll = serverSideDatasource();
    params.api.setServerSideDatasource(dataSourceAll);
  };
  const defaultColDef = {
    resizable: true,
    flex: 1,
    minWidth: 100,
  };

  return (
    <div
      className={classes.agThemeAlpineStaffs}
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
        // suppressContextMenu={true}
      />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};
export default ListManager;
