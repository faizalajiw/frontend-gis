import React from "react";
//react notification
import { Toaster } from "react-hot-toast";
//import
import Routes from "./routes/routes";

function App() {
  return (
    <React.Fragment>
      <Toaster />
      <Routes />
    </React.Fragment>
  );
}

export default App;
