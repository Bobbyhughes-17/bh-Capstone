import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import CustomNavbar from "./components/nav/Navbar";
import AppViews from "./components/AppViews";
import Authorized from "./components/Authorized";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="*"
          element={
            <Authorized>
              <>
                <CustomNavbar />
                <AppViews />
              </>
            </Authorized>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
