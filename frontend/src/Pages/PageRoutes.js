import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './MainPage/MainPage';

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
      <Route path='/' index element={<h1>Login page</h1>} />
      <Route path='/administration' />
    </Routes>
  );
};

export default PageRoutes;
