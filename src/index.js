import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import OurMission from './OurMission';
import SignIn from './SignIn.tsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App/>}></Route>
        <Route path="/our-mission" element={<OurMission/>}></Route>
        <Route path="/sign" element={<SignIn/>}></Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
