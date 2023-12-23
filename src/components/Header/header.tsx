import React from 'react';
import './style.css';
import {Link} from "react-router-dom";

const Header = (
    props: {
        buttonVisible?: boolean
    }) => {

    return (
        <div className={"header"}>
            <div className={"header__title"}>
                <a href={"/"} className={"header__title-link"}>
                    HealthMate
                </a>
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

            <div className={props.buttonVisible ? "header__button-container" : "hidden"}>
                <Link to={"/login"}>
                    <button
                        className={"header__button"}
                    >
                        Log In
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Header;