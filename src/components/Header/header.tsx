import React from 'react';
import './style.css';
import * as IoIcons from "react-icons/io5";
import * as GiIcons from "react-icons/gi";
import * as FaIcons6 from "react-icons/fa6";
import { FaHeartbeat } from "react-icons/fa";

const Header = (
    props: {
        altTAG: string
        headerTITLE: string
    }) => {

    return (
        <div className={"header"}>
            <div className={"header__image"}>
                {props.altTAG === "home img" && <IoIcons.IoHome />}
                {props.altTAG === "bmi" && <FaHeartbeat />}
                {props.altTAG === "height" && <GiIcons.GiBodyHeight />}
                {props.altTAG === "weight" && <FaIcons6.FaWeightScale />}
            </div>

            <div className={"header__title"}>
                <h1>
                    {props.headerTITLE}
                </h1>
            </div>
        </div>
    );
};

export default Header;