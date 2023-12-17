import React from 'react';
import './nopage.css';
import { Link } from 'react-router-dom';

const NoPage = () => {
    return (
        <div className={"noPage"}>
            <div className={"noPage__header"}>
                <img
                    src={`${process.env.PUBLIC_URL}/warning.png`}
                    alt={"features"}
                    className={"noPage__header-image"}
                />

                <h1 className={"noPage__header-title"}>
                    404
                </h1>
            </div>

            <p className={"noPage__paragraph"}>
                Oops! It seems you've taken a wrong turn. <br/>
                Don't worry; even GPS gets confused sometimes. <br/>
                While we recalibrate, how about enjoying a cup of virtual coffee? ☕️ <br/>
                Sit back, relax, and let's redirect you to the right path in style!
            </p>

            <Link to="/">
                <button
                    className={"noPage__button"}
                >
                    Return Home
                </button>
            </Link>
        </div>
    );
};

export default NoPage;