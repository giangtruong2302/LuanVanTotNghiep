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
        "486606115670-5eot9c17ma4fvhhej4pbevep3cn2b6jg.apps.googleusercontent.com",
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
