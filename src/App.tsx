import React, { useEffect, useState } from 'react';
import './pages/bmiCalculator/style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeLoader from "./pages/Home/homeLoader";
import BmiCalcLoader from "./pages/bmiCalculator/bmiCalcLoader";
import HeightConvLoader from "./pages/heightConverter/heightConvLoader";
import NoPage from "./pages/error/pageNotFound/nopage";
import WeightConvLazy from "./pages/weightConverter/weightConvLoader";
import Login from "./pages/auth/login/login";
import Signup from "./pages/auth/signup/signup";
import ManageAccount from "./pages/auth/manageAccount/manageAccount";
import ResetPassword from "./pages/auth/resetPassword/resetPassword";
import UnsupportedDevice from "./pages/error/unsupportedDevice";

const App = () => {
    // Check for Unsupported Device (phone)
    const [isUnsupportedDevice, setIsUnsupportedDevice] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.innerWidth <= 720;
            setIsUnsupportedDevice(isMobile);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (isUnsupportedDevice) {
        return <UnsupportedDevice />;
    }

    // If supported device
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomeLoader />}/>
                    <Route path="/home" element={<HomeLoader />}/>
                    <Route path="/bmi-calculator" element={<BmiCalcLoader />} />
                    <Route path="/height-converter" element={<HeightConvLoader />} />
                    <Route path="/weight-converter" element={<WeightConvLazy />} />
                    <Route path="*" element={<NoPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/manage-account" element={<ManageAccount />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
