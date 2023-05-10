import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import CustomNavbar from "./components/nav/Navbar";
import AppViews from "./components/AppViews";
import Authorized from "./components/Authorized";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider, Button } from "react-bootstrap";

const theme = {
  colors: {
    primary: "#007bff",
    secondary: "#6c757d",
    success: "#28a745",
    danger: "#dc3545",
    warning: "#ffc107",
    info: "#17a2b8",
    light: "#f8f9fa",
    dark: "#343a40",
  },
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="*"
        element={
          <Authorized>
            <>
              <ThemeProvider theme={theme}>
                <CustomNavbar />
                <AppViews />
              </ThemeProvider>
            </>
          </Authorized>
        }
      />
    </Routes>
  );
}

export default App;
