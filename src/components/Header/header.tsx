import React from 'react';
import './style.css';
/*import * as IoIcons from "react-icons/io5";
import * as GiIcons from "react-icons/gi";
import * as FaIcons6 from "react-icons/fa6";
import { FaHeartbeat } from "react-icons/fa";*/

const Header = (
    props: {
        altTAG: string
        headerTITLE: string
    }) => {

    const logInButtonClicked = () => {
        console.log("test")
    }

    return (
        <div className={"header"}>
            {/*<div className={"header__image"}>
                {props.altTAG === "home img" && <IoIcons.IoHome />}
                {props.altTAG === "bmi" && <FaHeartbeat />}
                {props.altTAG === "height" && <GiIcons.GiBodyHeight />}
                {props.altTAG === "weight" && <FaIcons6.FaWeightScale />}
            </div>

            <div className={"header__title"}>
                <h1>
                    {props.headerTITLE}
                </h1>
            </div>*/}

            <div className={"header__title"}>
                HealthMate
            </div>

            <div className={"header__links-container"}>
                <div className={"header__links-groupOne"}>
                    <a href={"/"} className={"header__links"}>
                        Home
                    </a>

                    <a href={'/bmi-calculator'} className={'header__links'}>
                        BMI Calculator
                    </a>
                </div>

                <div className={"header__links-groupTwo"}>
                    <a href={"/height-converter"} className={"header__links"}>
                        Height Converter
                    </a>

                    <a href={"/weight-converter"} className={"header__links"}>
                        Weight Converter
                    </a>
                </div>
            </div>

            <div className={"header__button-container"}>
                <button
                    className={"header__button"}
                    onClick={logInButtonClicked}
                >
                    Log In
                </button>
            </div>
        </div>
    );
};

export default Header;