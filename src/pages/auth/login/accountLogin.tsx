import React, {useState} from 'react';
import './login.css';
import Header from "../../../components/Header/header";
import Footer from "../../../components/Footer/footer";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../../api/firebase";
import AuthDetails from "../details/AuthDetails";
import Confetti from 'react-dom-confetti';
import {BsEyeFill, BsEyeSlashFill} from "react-icons/bs";
import { GoogleAuthProvider, getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import {Toaster} from "sonner";

const AccountLogin = () => {
    const provider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [confetti, setConfetti] = useState(false);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const [errorCode, setErrorCode] = useState<string>('');

    const loginViaGoogle = () => {
        const auth = getAuth();

        signInWithPopup(auth, provider)
            .then((result) => {
                setIsButtonDisabled(true);
                setConfetti(true);
                setTimeout(() => setConfetti(false), 2000);

                setErrorCode('')
        }).catch((error) => {
            const errorCode = error.code;
            setErrorCode(errorCode)
        })
    }

    const loginViaGithub = () => {
        const auth = getAuth();

        signInWithPopup(auth, githubProvider)
            .then((result) => {
                setIsButtonDisabled(true);
                setConfetti(true);
                setTimeout(() => setConfetti(false), 2000);

                setErrorCode('')
            }).catch((error) => {
            const errorCode = error.code;
            setErrorCode(errorCode)
        })
    }

    const loginSubmit = (e: { preventDefault: () => void; }) => {
        setErrorCode('')
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                setIsButtonDisabled(true);

                setConfetti(true);
                setTimeout(() => setConfetti(false), 2000);

                setErrorCode('')
            })
            .catch((error) => {
                setErrorCode(error.code)
                console.log(error.code, '\n', error.message)
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
            <Header />

            <div className={"healthmate__login--body"}>
                <Toaster richColors expand={false} position={"top-center"} duration={2000}/>

                <p className={"healthmate__login--title"}>
                    Welcome to <span>HealthMate</span>
                </p>

                <p className={"healthmate__login--memo"}>
                    <span>Your personal health companion, helping you every step of the way.</span> <br/>
                    HealthMate is designed to help everyone achieve a healthy lifestyle.
                </p>

                <div className={"divider"}></div>

                <div className={"healthmate__login--alternative"}>
                    <button disabled={isButtonDisabled} onClick={loginViaGoogle}>
                        <img src={"google.svg"} alt={"google"}/>
                    </button>

                    <button disabled={isButtonDisabled} onClick={loginViaGithub}>
                        <img src={"github.svg"} alt={"github"}/>
                    </button>
                </div>

                <div className={"healthmate__login--divider"}></div>

                {errorCode === '' ? (
                    <div className={"healthmate__error--container-none"}></div>
                ) : (
                    <div className={"healthmate__error--container"}>
                        <p>
                            {errorCode === 'auth/account-exists-with-different-credential' ? 'Account already exists\n' : ''}
                            {errorCode === 'auth/invalid-credential' ? 'Invalid account credentials\n' : ''}
                            {errorCode !== 'auth/invalid-credential' && errorCode !== 'auth/account-exists-with-different-credential' ? 'An unknown error has occurred, try again later.\n' : ''}
                        </p>
                    </div>
                )}

                <div className={"healthmate__login--information"}>
                    <input
                        aria-label={"Input Email"}
                        type={"email"}
                        placeholder={"Enter your Email"}
                        className={"healthmate__login--input"}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <div className={"healthmate__password--container"}>
                        <input
                            aria-label={"Input Password"}
                            type={passwordVisible ? 'text' : 'password'}
                            placeholder={"Enter your Password"}
                            className={"healthmate__login--password"}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            aria-label={"Password Visible"}
                            className={"healthmate__password--visible"}
                            onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                            {passwordVisible ? <BsEyeFill/> : <BsEyeSlashFill/>}
                        </button>
                    </div>
                </div>

                <button
                    className={"healthmate__login--button"}
                    aria-label={"Log In"}
                    type={"submit"}
                    disabled={isButtonDisabled || !email || !password}
                    onClick={loginSubmit}
                >
                    Login
                    <Confetti active={confetti} config={confettiConfig}/>
                </button>

                <AuthDetails loggedIn={setIsButtonDisabled} displayNameVisible={true}/>

                <div className={"healthmate__login--support"}>
                    <a href={"/signup"} aria-label={"Make an account"}>
                        Don't have a HealthMate account?
                        <span>
                            Register now
                        </span>
                    </a>

                    <a href={"/reset-password"} aria-label={"Reset Password"}>
                        Forgot your password?
                        <span>
                            Reset it
                        </span>
                    </a>
                </div>
            </div>

            <Footer/>
        </>
    );
};

export default AccountLogin;