import React from 'react';
import './pages/bmiCalculator/style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomeLoader from "./pages/Home/homeLoader";
import BmiCalcLoader from "./pages/bmiCalculator/bmiCalcLoader";
import HeightConvLoader from "./pages/heightConverter/heightConvLoader";
import NoPage from "./pages/noPage/nopage";
import WeightConvLazy from "./pages/weightConverter/weightConvLoader";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";

const App = () => {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<HomeLoader />} />
              <Route path="/home" element={<HomeLoader />} />
              <Route path="/bmi-calculator" element={<BmiCalcLoader />} />
              <Route path="/height-converter" element={<HeightConvLoader />} />
              <Route path="/weight-converter" element={<WeightConvLazy />} />
              <Route path="*" element={<NoPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
