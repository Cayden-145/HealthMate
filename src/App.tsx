import React from 'react';
import './pages/BMI_Calculator/style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from "./pages/Home/home";
import BMICalculator from "./pages/BMI_Calculator/bmiCalculator";
import HeightConvert from "./pages/Height_Converter/heightConvert";
import NoPage from "./pages/No_Page/nopage";
import WeightConvert from "./pages/Weight_Converter/weightConvert";

const App = () => {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/bmi-calculator" element={<BMICalculator />} />
              <Route path="/height-converter" element={<HeightConvert />} />
              <Route path="/weight-converter" element={<WeightConvert />} />
              <Route path="*" element={<NoPage />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
