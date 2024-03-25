import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import OurMission from './OurMission';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}></Route>
        <Route path="/our-mission" element={<OurMission/>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
