import React from 'react';
import './style.css'
import * as IoIcons from "react-icons/io5";
import {FaHeartbeat} from "react-icons/fa";
import * as GiIcons from "react-icons/gi";
import * as FaIcons6 from "react-icons/fa6";
import { useLocation } from 'react-router-dom';

const Links = () => {
    const location = useLocation();
    const currentUrl = location.pathname;

    return (
        <div className={"header__link-container"}>
            {currentUrl !== '/' && '/home' && (
                <a href={"/"} className={"header__link"}>
                    <IoIcons.IoHome className={"header__link-img"}/>
                    Home
                </a>
            )}

            {currentUrl !== '/bmi-calculator' && (
                <a href={'/bmi-calculator'} className={'header__link'}>
                    <FaHeartbeat className={'header__link-img'} />
                    BMI Calculator
                </a>
            )}

            {currentUrl !== '/height-converter' && (
                <a href={"/height-converter"} className={"header__link"}>
                    <GiIcons.GiBodyHeight className={"header__link-img"}/>
                    Height Converter
                </a>
            )}

            {currentUrl !== '/weight-converter' && (
                <a href={"/weight-converter"} className={"header__link"}>
                    <FaIcons6.FaWeightScale className={"header__link-img"}/>
                    Weight Converter
                </a>
            )}

        </div>
    );
};

export default Links;