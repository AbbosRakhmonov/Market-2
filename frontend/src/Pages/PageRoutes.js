import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from './MainPage/MainPage';

const PageRoutes = () => {
  return (
    <Routes>
      <Route path='/' index element={<MainPage />} />
    </Routes>
  );
};

export default PageRoutes;
