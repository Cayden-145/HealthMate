import React from 'react';
import './style.css';

const Header = (
    props: {
        imageSRC: string
        altTAG: string
        headerTITLE: string
    }) => {

    return (
        <div className={"header"}>
            <div className={"header__image"}>
                <img
                    src={`${process.env.PUBLIC_URL}/${props.imageSRC}`}
                    alt={props.altTAG}
                />
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