import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import OurMission from './OurMission';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App/>}></Route>
        <Route path="/our-mission" element={<OurMission/>}></Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
