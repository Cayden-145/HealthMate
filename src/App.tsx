import React from 'react';
import './pages/BMI_Calculator/style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomeLoader from "./pages/Home/homeLoader";
import BmiCalcLoader from "./pages/BMI_Calculator/bmiCalcLoader";
import HeightConvLoader from "./pages/Height_Converter/heightConvLoader";
import NoPage from "./pages/No_Page/nopage";
import WeightConvLazy from "./pages/Weight_Converter/weightConvLoader";

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
          </Routes>
      </BrowserRouter>
  );
}

export default App;
