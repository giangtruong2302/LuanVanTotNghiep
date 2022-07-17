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
import { getAllScheduleByWeek } from "../../GymCenter/Staffs/StaffDetail/scheduleAPI";
import moment from "moment";
// import CreateAccount from "../ModalService/modalAddService";
LicenseManager.setLicenseKey(
  "For_Trialing_ag-Grid_Only-Not_For_Real_Development_Or_Production_Projects-Valid_Until-15_August_2020_[v2]_MTU5NzQ0NjAwMDAwMA==9aa5b7bf868ec5d39dc5cb979372325b"
);

const ListSchedule = (props) => {
  const [status, setStatus] = useState("");
  var startOfWeek = moment().startOf("week").toDate();
  var endOfWeek = moment().endOf("week").toDate();
  console.log(
    moment(startOfWeek).format("YYYY-MM-DD hh:mm:ssZ"),
    moment(endOfWeek).format("YYYY-MM-DD hh:mm:ssZ")
  );
  const [columnDefs] = useState([
    {
      field: "Staffname",
      suppressMovable: true,
      // width: 30,
      headerName: "STAFF NAME",
      flex: 2,
      cellRenderer: "staffRenderer",
      cellStyle: {
        // you can use either came case or dashes, the grid converts to whats needed
        borderLeft: "solid 0.5px #eee",
        borderTop: "solid 0.5px #eee",
        borderBottom: "solid 0.5px #eee",
        borderRight: "solid 0.5px #eee",
      },
    },

    {
      field: "mon",
      // suppressMovable: true,
      // width: 252,
      // flex: 0,
      headerName: "Monday",
      cellRenderer: "mondayRenderer",
      // cellStyle: cellClass,
    },
    {
      field: "tue",
      // suppressMovable: true,
      // width: 252,
      // flex: 0,
      headerName: "Tuesday",
      cellRenderer: "tuesdayRenderer",
      // cellStyle: cellClass,
    },
    {
      field: "wed",
      // suppressMovable: true,
      // width: 252,
      // flex: 0,
      headerName: "Wednesday",
      cellRenderer: "wednesdayRenderer",
      // cellStyle: cellClass,
    },
    {
      field: "thu",
      // suppressMovable: true,
      // width: 252,
      // flex: 0,
      headerName: "Thursday",
      cellRenderer: "thursdayRenderer",
      // cellStyle: cellClass,
    },
    {
      field: "fri",
      // suppressMovable: true,
      // width: 252,
      // flex: 0,
      headerName: "Friday",
      cellRenderer: "fridayRenderer",
      // cellStyle: cellClass,
    },
    {
      field: "sat",
      // suppressMovable: true,
      // width: 252,
      // flex: 0,
      headerName: "Satuday",
      cellRenderer: "saturdayRenderer",
      // cellStyle: cellClass,
    },
    {
      field: "sun",
      // suppressMovable: true,
      // width: 252,
      // flex: 0,
      headerName: "Sunday",
      cellRenderer: "sundayRenderer",
      // cellStyle: cellClass,
    },
  ]);
  const [gridApiCustomer, setGridApiCustomer] = useState();
  const CenterId = localStorage.getItem("CenterId");
  startOfWeek = moment(startOfWeek).format("YYYY-MM-DD");
  endOfWeek = moment(endOfWeek).format("YYYY-MM-DD");
  const serverSideDatasource = useCallback(() => {
    console.log("check cuurent salon:", CenterId);

    return {
      getRows: function (params) {
        // loading?.classList.remove("hidden");
        const page = params.request.endRow / 10;
        try {
          //FOR FILTER PURPOSE
          getAllScheduleByWeek(
            props.StartTime ? props.StartTime : startOfWeek,
            props.EndTime ? props.EndTime : endOfWeek
          )
            .then((res) => {
              // console.log(res.data.data);
              const data = res.schedule;
              setTimeout(() => {
                params.successCallback(data, data.length);
              }, 500);
              return data;
              // if (data && data.length > 0) {
              //   const lastRow = () => {
              //     if (parseInt(data.totalPage) <= 1) return data.count;
              //     else if (page <= parseInt(data.totalPages) - 2) return -1;
              //     else return data.count;
              //   };
              //   // call the success callback
              //   setTimeout(() => {
              //     params.successCallback(data.rows, lastRow());
              //   }, 500);
              //   // loading?.classList.add("hidden");
              // } else {
              //   params.api.showNoRowsOverlay();
              // }
            })
            .catch(() => {
              params.api.showLoadingOverlay();
            });
        } catch (error) {}
      },
    };
  }, [CenterId, props.status, props.searchValue, status, props.StartTime]);
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
    console.log("check search value list :", props.searchValue);
    if (props.searchValue !== "") {
      setSearchValue(props.searchValue);
    }
    if (gridApiCustomer) {
      const newDataSource = serverSideDatasource();
      gridApiCustomer.setServerSideDatasource(newDataSource);
    }
  }, [
    serverSideDatasource,
    props.status,
    props.searchValue,
    status,
    props.StartTime,
  ]);

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
        height: 401,
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
export default ListSchedule;
