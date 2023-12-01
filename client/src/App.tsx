import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/views/NavBar/NavBar';
import LoginPage from './components/views/LoginPage/LoginPage';
import LandingPage from './components/views/LandingPage/LandingPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from "./hoc/auth";
import ViewUploadPage from './components/views/ViewUploadPage/ViewUploadPage';

const App = () => {
  const AuthLandingPage = Auth(LandingPage, null);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthRegisterPage = Auth(RegisterPage, false);
  const AuthViewUploadPage = Auth(ViewUploadPage, false);

  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route index element={<AuthLandingPage />} />
          <Route path="/login" element={<AuthLoginPage />} />
          <Route path="/register" element={<AuthRegisterPage />} />
          <Route path="/upload" element={<AuthViewUploadPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
