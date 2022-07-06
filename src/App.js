import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppLayout from "./layout/AppLayout";
import AppLayoutAdmin from "./layout/AppLayoutAdmin";
import { gapi } from "gapi-script";
// import GymConfig from "./features/Merchant/gymConfig";

function App() {
  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId:
        "486606115670-699qfj88ffthucqe7lhpr8q0k65gq7hv.apps.googleusercontent.com",
      plugin_name: "chat",
    });
  });
  // const Home = React.lazy(() => import("./pages/HomePage/home"));
  console.log("object");
  return (
    <BrowserRouter>
      <AppLayout />
      <AppLayoutAdmin />
    </BrowserRouter>

    //   </div>
    // </Fragment>
  );
}

export default App;
