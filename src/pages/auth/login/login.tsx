import React, { useState, useEffect } from 'react';
import './login.css'
import Header from "../../../components/Header/header";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { auth } from "../../../api/firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';
import AuthDetails from "../details/AuthDetails";
import Confetti from 'react-dom-confetti';

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [confetti, setConfetti] = useState(false);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const [errorCode, setErrorCode] = useState<string>('');
    const [demoAccount, setDemoAccount] = useState<boolean>(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const demoParam = urlParams.get('demo');

        if (demoParam && demoParam.toLowerCase() === 'true') {
            setDemoAccount(true);
        }
    }, [setDemoAccount]);

    const loginSubmit = (e: { preventDefault: () => void; }) => {
        setErrorCode('')
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                setConfetti(true);
                setTimeout(() => setConfetti(false), 2000);
            })
            .catch((error) => {
                setErrorCode(error.code)
                console.log(error.code)
            });
    };

    const confettiConfig = {
        angle: 90,
        spread: 45,
        startVelocity: 45,
        elementCount: 50,
        decay: 0.9,
    };

    return (
        <>
            <Header/>


            <div className={"login-page"}>

                <div className={"login-page__information"}>
                    <p className={"login-page__information-text"}>
                        <span className={"login-page__information-span"}>
                            Welcome to HealthMate. <br/>
                        </span>

                        Your comprehensive health companion
                        designed to empower you on your wellness journey.
                        Whether you're striving for fitness goals, monitoring your health,
                        or simply making lifestyle changes, HealthMate is here to support you every step of the way.
                    </p>
                </div>

                <div className={"login-page__container"}>
                    <p className={"login-page__title"}>
                        Login to Your Account
                    </p>

                    <div className={"login-errors"}>
                        <p className={errorCode !== '' ? "login-errors__text" : 'hidden'}>
                            {errorCode === 'auth/invalid-email' ? <> * Invalid Email. <br/> </> : ""}
                            {errorCode === 'auth/internal-error' ? <> * Unable to connect to authentication
                                server. <br/> </> : ""}
                            {errorCode === 'auth/invalid-password' ? <> * Invalid Password. <br/> </> : ""}
                            {errorCode === 'auth/user-not-found' || 'auth/invalid-credential' ? <> * No existing user
                                with these credentials. <br/> </> : ""}
                        </p>
                    </div>

                    <input
                        aria-label={"Input Email"}
                        type={"email"}
                        placeholder={"Email"}
                        className={"login-page__input"}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <div className={"login-page__password-container"}>
                        <input
                            aria-label={"Input Password"}
                            type={passwordVisible ? 'text' : 'password'}
                            placeholder={"Password"}
                            className={"login-page__password"}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            aria-label={"Password Visible"}
                            className={"login-page__password-visible"}
                            onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                            {passwordVisible ? <BsEyeFill/> : <BsEyeSlashFill/>}
                        </button>
                    </div>

                    <button
                        aria-label={"Log In"}
                        className={"login-page__button"}
                        type={"submit"}
                        disabled={isButtonDisabled || !email || !password}
                        onClick={loginSubmit}
                    >
                        Log In
                        <Confetti active={confetti} config={confettiConfig}/>
                    </button>

                    <a href={"/signup"} className={"login-page__signup"} aria-label={"Sign Up"}>
                        Don't have an account?
                        <span className={"signup-text"}>
                            Sign Up
                        </span>
                    </a>

                    <a href={"/reset-password"} className={"login-page__signup-a"} aria-label={"Reset Password"}>
                        Forgot your password?
                        <span className={"signup-text"}>
                            Reset It
                        </span>
                    </a>
                </div>

                <AuthDetails loggedIn={setIsButtonDisabled} displayNameVisible={true}/>

                {demoAccount && (
                    <div className={"demo__container"}>
                        <p className={"demo__paragraph"}>
                            <span className={demoAccount ? "demo__title" : "hidden"}>
                                {demoAccount ? "Demo Account" : ""} <br/>
                            </span>
                            {demoAccount ? "Email: demoacc@demo.com" : ""} <br/>
                            {demoAccount ? "Password: demo1234" : ""} <br/>

                            <span className={demoAccount ? "demo__important" : "hidden"}>
                            {demoAccount ? "This account is to be used for demonstration purposes only. The account is not linked to an email that is in use." : ""}
                        </span>
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};

export default Login;