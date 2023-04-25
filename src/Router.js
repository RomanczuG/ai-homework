import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './App';
import Tool from './pages/Tool';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/tool" element={<Tool />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
