import React, {useState} from 'react';
import './style.css';
import AuthDetails from "../../pages/auth/details/AuthDetails";
import { CgProfile } from "react-icons/cg";
import { CiMenuBurger } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { signOut } from 'firebase/auth';
import {auth} from "../../api/firebase";
import {toast} from "sonner";

const Header = (props: { buttonVisible?: boolean }) => {
    const [accountBtnVisible, setAccountBtnVisible] = useState(false);
    const [menuActive, setMenuActive] = useState(false);
    const [dropdownActive, setDropdownActive] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuActive(!menuActive);
        setDropdownActive(false); // Close the dropdown when the menu is toggled
    };

    const toggleDropdown = () => {
        setDropdownActive(!dropdownActive);
    };

    const signOutClick = () => {
        signOut(auth)
            .then(r => {
                toast.success("Successfully signed out.");
            }).catch((error => {
                toast.error("An error occurred whilst signing out.", {
                    description: error
            })
        }))
    }

    return (
        <>
            <AuthDetails headerVisible={setAccountBtnVisible} />

            <div className={'header'}>
                <div className={'header__title'}>
                    <a href={'/'} className={'header__title-link'}>
                        HealthMate
                    </a>
                </div>

                <button className={'hamburger-button'} onClick={toggleMenu}>
                    <CiMenuBurger />
                </button>

                <div
                    className={`menu-overlay ${menuActive ? 'active' : ''}`}
                    onClick={toggleMenu}
                ></div>

                <div className={`menu ${menuActive ? 'active' : ''}`}>
                    <div className="menu-header">
                        <button className="close-button" onClick={toggleMenu}>
                            &times;
                        </button>

                        <p className={'menu-header__text'}>HealthMate</p>
                    </div>

                    <div className="menu-links">
                        {accountBtnVisible ? (
                            <div className="dropdown-container">
                                <button
                                    className={`header__button dropdown-button ${
                                        dropdownActive ? 'active' : ''
                                    }`}
                                    onClick={toggleDropdown}
                                >
                                    <p className={'header__button-image'}>
                                        <CgProfile/>
                                    </p>
                                </button>

                                <div
                                    className={`dropdown-content ${dropdownActive ? 'active' : 'hidden'}`}
                                >
                                    <button onClick={() => navigate('/manage-account')}>
                                        Manage Account
                                    </button>

                                    <button onClick={signOutClick}>
                                        Sign Out
                                    </button>

                                </div>
                            </div>
                        ) : (
                            <a
                                href="/login"
                                className={'menu-links a'}
                            >
                                Login
                            </a>
                        )}

                        <a href="/home">Home</a>
                        <a href="/bmi-calculator">BMI Calculator</a>
                        <a href="/height-converter">Height Converter</a>
                        <a href="/weight-converter">Weight Converter</a>

                    </div>

                    <p className={"version"}>
                        Current Version: <span className={"version-extra"}> 1.6 </span>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Header;
