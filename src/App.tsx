import React, {useEffect, useState} from 'react';
import './pages/bmiCalculator/style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeLoader from "./pages/Home/homeLoader";
import BmiCalcLoader from "./pages/bmiCalculator/bmiCalcLoader";
import HeightConvLoader from "./pages/heightConverter/heightConvLoader"                                                                                                                                                                                                                                                                     ;
import NoPage from "./pages/error/pageNotFound/nopage";
import WeightConvLazy from "./pages/weightConverter/weightConvLoader";
import Login from "./pages/auth/login/login";
import Signup from "./pages/auth/signup/signup";
import ManageAccount from "./pages/auth/manageAccount/manageAccount";
import ResetPassword from "./pages/auth/resetPassword/resetPassword";
import '../src/pages/Home/home.css'

const App = () => {

    const [showPopup, setShowPopup] = useState<boolean>(false)

    useEffect(() => {
        const currentDomain = window.location.hostname;
        const desiredDomain = 'healthmate.site';

        if (currentDomain !== desiredDomain) {
            setShowPopup(true);
        }
    }, []);

    const handleClose = () => {
        setShowPopup(false);
        window.location.href = 'https://healthmate.site';
    }

    return (
        <>
            <div>
                {showPopup && (
                    <div className="cookie-popup">
                        <div className="cookie-popup-content">
                            <p>You are currently using an unsupported domain. Please change to our updated domain: <a
                                href={"https://healthmate.site"}>
                                https://healthmate.site
                            </a></p>

                            <button onClick={handleClose}>Take me there</button>
                        </div>
                    </div>
                )}
            </div>

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomeLoader/>}/>
                    <Route path="/home" element={<HomeLoader/>}/>
                    <Route path="/bmi-calculator" element={<BmiCalcLoader/>}/>
                    <Route path="/height-converter" element={<HeightConvLoader/>}/>
                    <Route path="/weight-converter" element={<WeightConvLazy/>}/>
                    <Route path="*" element={<NoPage/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/manage-account" element={<ManageAccount/>}/>
                    <Route path="/reset-password" element={<ResetPassword/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;