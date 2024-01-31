import React from 'react';
import './style.css';
import { FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <>
            <div className={"footer"}>
                <p className={"footer-text"}>
                    © HealthMate 2023-24
                </p>

                <a href={"https://github.com/Cayden-145/HealthMate"} className={"source-code"} target="_blank"
                   rel="noopener noreferrer">
                    <FaGithub/>
                </a>

                <img
                    src={`${process.env.PUBLIC_URL}/HM_logo.svg`}
                    alt={"logo"}
                    className={"footer-img"}
                />
            </div>
        </>
    );
};

export default Footer;