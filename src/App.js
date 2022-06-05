import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppLayout from "./layout/AppLayout";
import AppLayoutAdmin from "./layout/AppLayoutAdmin";
// import GymConfig from "./features/Merchant/gymConfig";

function App() {
  // const Home = React.lazy(() => import("./pages/HomePage/home"));
  console.log("object");
  return (
    <BrowserRouter>
      <AppLayout />
      <AppLayoutAdmin />
    </BrowserRouter>

    //     {/* <ToastContainer
    //             position="bottom-right"
    //             autoClose={5000}
    //             hideProgressBar={false}
    //             newestOnTop={false}
    //             closeOnClick
    //             rtl={false}
    //             pauseOnFocusLoss
    //             draggable
    //             pauseOnHover
    //         /> */}
    //   </div>
    // </Fragment>
  );
}

export default App;
