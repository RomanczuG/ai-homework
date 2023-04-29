import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './App';
import Tool from './pages/Tool';
import ToolTesting from './pages/ToolTesting';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/tool" element={<Tool />} />
      <Route path="/tool-testing" element={<ToolTesting />} />

    </Routes>
  </BrowserRouter>
);

export default Router;
