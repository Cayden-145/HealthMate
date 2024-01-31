import React, { useState } from 'react';
import './signup.css';
import Header from '../../../components/Header/header';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { auth } from '../../../api/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import AuthDetails from '../details/AuthDetails';
import Confetti from 'react-dom-confetti';

const Signup = () => {
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [confetti, setConfetti] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorCode, setErrorCode] = useState<string>('');

    const signUpEvent = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setErrorCode('')

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                setConfetti(true);
                setTimeout(() => setConfetti(false), 2000);
                return user?.uid ? updateProfile(user, { displayName: name }) : null;
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

            <div className={'signup-page'}>
                <div className={'signup-page__information'}>
                    <p className={'signup-page__information-text'}>
                        <span className={'signup-page__information-span'}>
                            Welcome to HealthMate. <br />
                        </span>
                        Your comprehensive health companion designed to empower you on your wellness journey. Whether you're striving for fitness goals, monitoring your health, or simply making lifestyle changes, HealthMate is here to support you every step of the way.
                    </p>
                </div>

                <div className={'signup-page__container'}>
                    <p className={'signup-page__title'}>
                        Create an Account
                    </p>

                    <div className={"login-errors"}>
                        <p className={errorCode !== '' ? "login-errors__text" : 'hidden'}>
                            {errorCode === 'auth/invalid-email' ? <> * Invalid Email. <br/> </> : ""}
                            {errorCode === 'auth/email-already-in-use' ? <> * Email already Exists. <br/> </> : ""}
                            {errorCode === 'auth/internal-error' ? <> * Unable to connect to authentication
                                server. <br/> </> : ""}
                            {errorCode === 'auth/weak-password' ? <> * Weak Password. <br/> </> : ""}
                        </p>
                    </div>

                    <input
                        aria-label={"Input Display Name"}
                        type={'text'}
                        placeholder={'Display Name'}
                        className={'signup-page__input'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        aria-label={"Input Email"}
                        type={'email'}
                        placeholder={'Email'}
                        className={'signup-page__input'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <div className={'signup-page__password-container'}>
                        <input
                            aria-label={"Input Password"}
                            type={passwordVisible ? 'text' : 'password'}
                            placeholder={'Password'}
                            className={'signup-page__password'}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            aria-label={"Password Visible"}
                            className={'signup-page__password-visible'}
                            onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                            {passwordVisible ? <BsEyeFill/> : <BsEyeSlashFill/>}
                        </button>
                    </div>

                    <button
                        aria-label={"Create Account"}
                        className={'signup-page__button'}
                        disabled={isButtonDisabled || !email || !password || !name}
                        onClick={signUpEvent}
                    >
                        Create Account
                        <Confetti active={confetti} config={confettiConfig}/>
                    </button>

                    <a href={'/login'} className={'signup-page__signup'} aria-label={"Go To Login"}>
                        Already have an account?
                        <span className={'signup-text'}>
                            Log In.
                        </span>
                    </a>
                </div>

                <AuthDetails loggedIn={setIsButtonDisabled} displayNameVisible={true} />
            </div>
        </>
    );
};

export default Signup;
