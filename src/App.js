import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import Navbar from './components/nav/Navbar';
import AppViews from './components/AppViews';
import Authorized from './components/Authorized'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="*"
          element={
            <Authorized>
              <>
                <Navbar />
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
