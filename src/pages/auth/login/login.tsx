import React, {useState} from 'react';
import './login.css'
import Header from "../../../components/Header/header";
import Footer from "../../../components/Footer/footer";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { auth } from "../../../firebase/firebase";
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

    const loginSubmit = (e: { preventDefault: () => void; }) => {
        setErrorCode('')
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
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
            <Header buttonVisible={false} />


            <div className={"login-page"}>

                <div className={"login-page__information"}>
                    <p className={"login-page__information-text"}>
                        <span className={"login-page__information-span"}>
                            Welcome to HealthMate. <br />
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
                        type={"email"}
                        placeholder={"Email"}
                        className={"login-page__input"}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <div className={"login-page__password-container"}>
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            placeholder={"Password"}
                            className={"login-page__password"}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            className={"login-page__password-visible"}
                            onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                            {passwordVisible ? <BsEyeFill/> : <BsEyeSlashFill/>}
                        </button>
                    </div>

                    <button
                        className={"login-page__button"}
                        type={"submit"}
                        disabled={isButtonDisabled || !email || !password}
                        onClick={loginSubmit}
                    >
                        Log In
                        <Confetti active={confetti} config={confettiConfig}/>
                    </button>

                    <a href={"/signup"} className={"login-page__signup"}>
                        Don't have an account?
                        <span className={"signup-text"}>
                            Sign Up
                        </span>
                    </a>

                    <a href={"/reset-password"} className={"login-page__signup-a"}>
                        Forgot your password?
                        <span className={"signup-text"}>
                            Reset It
                        </span>
                    </a>
                </div>

                <AuthDetails loginType={'signup'} setIsButtonDisabled={setIsButtonDisabled}/>
            </div>

            <Footer/>
        </>
    );
};

export default Login;