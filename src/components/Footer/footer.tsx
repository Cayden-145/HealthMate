import React from 'react';
import './style.css'

const Footer = () => {
    return (
        <div className={"footer"}>
            <p className={"footer-text"}>
                © HealthMate 2023-24
            </p>

            <img
                src={`${process.env.PUBLIC_URL}/heartLogo.png`}
                alt={"heart"}
                className={"footer-img"}
            />
        </div>
    );
};

export default Footer;