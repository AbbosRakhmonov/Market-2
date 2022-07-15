import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login } from './Login/Login';
import { MainPage } from './MainPage/MainPage';

const PageRoutes = () => {
  const localdata = JSON.parse(localStorage.getItem('userData'));
  const isAuthenticated = localdata ? !!localdata.token : null;

  if (isAuthenticated) {
    return (
      <Routes>
        <Route path='/' index element={<MainPage />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path='/' index element={<Login />} />
      <Route path='/administration' element={<h1>Admin panel</h1>} />
    </Routes>
  );
};

export default PageRoutes;
