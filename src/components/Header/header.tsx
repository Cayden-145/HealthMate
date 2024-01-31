import React, {useState} from 'react';
import './style.css';
import AuthDetails from "../../pages/auth/details/AuthDetails";
import { CgProfile } from "react-icons/cg";
import { CiMenuBurger } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { signOut } from 'firebase/auth';
import {auth} from "../../api/firebase";
import {toast} from "sonner";

const Header = () => {
    const [accountBtnVisible, setAccountBtnVisible] = useState(false);
    const [menuActive, setMenuActive] = useState(false);
    const [dropdownActive, setDropdownActive] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuActive(!menuActive);
        setDropdownActive(false);
    };

    const toggleDropdown = () => {
        setDropdownActive(!dropdownActive);
    };

    const signOutClick = () => {
        signOut(auth)
            .then(() => {
                toast.success("Successfully signed out.");
            }).catch((error => {
                toast.error("An error occurred whilst signing out.", {
                    description: error
            })
        }))
    }

    return (
        <>
            <AuthDetails headerVisible={setAccountBtnVisible}/>

            <div className={'header'}>
                <div className={'header__title'}>
                    <a href={'/'} className={'header__title-link'}>
                        HealthMate
                    </a>
                </div>

                <button className={'hamburger-button'} onClick={toggleMenu} aria-label={"Menu"}>
                    <CiMenuBurger/>
                </button>

                <div
                    className={`menu-overlay ${menuActive ? 'active' : ''}`}
                    onClick={toggleMenu}></div>

                <div className={`menu ${menuActive ? 'active' : ''}`}>
                    <div className="menu-header">
                        <button className="close-button" onClick={toggleMenu} aria-label={"Close Menu"}>
                            &times;
                        </button>

                        <p className={'menu-header__text'}>HealthMate</p>
                    </div>

                    <div className="menu-links">
                        {accountBtnVisible ? (
                            <div className="dropdown-container">
                                <button
                                    aria-label={"Profile"}
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
                                    <button aria-label={"Manage Account"} onClick={() => navigate('/manage-account')}>
                                        Manage Account
                                    </button>

                                    <button onClick={signOutClick} aria-label={"Sign Out"}>
                                        Sign Out
                                    </button>

                                </div>
                            </div>
                        ) : (
                            <a
                                aria-label={"Login"}
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
                </div>
            </div>
        </>
    );
};

export default Header;
