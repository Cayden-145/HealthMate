import React, {useState} from 'react';
import './signup.css'
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const Signup = () => {
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const isButtonDisabled = !firstName || !lastName || !email || !password;

    const signUpEvent = () => {

    }

    return (
        <>
            <Header buttonVisible={false} />


            <div className={"signup-page"}>

                <div className={"signup-page__information"}>
                    <p className={"signup-page__information-text"}>
                        <span className={"signup-page__information-span"}>
                            Welcome to HealthMate. <br />
                        </span>

                        Your comprehensive health companion
                        designed to empower you on your wellness journey.
                        Whether you're striving for fitness goals, monitoring your health,
                        or simply making lifestyle changes, HealthMate is here to support you every step of the way.
                    </p>
                </div>

                <div className={"signup-page__container"}>
                    <p className={"signup-page__title"}>
                        Create an Account
                    </p>

                    <input
                        type={'text'}
                        placeholder={'First Name'}
                        className={'signup-page__input'}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />

                    <input
                        type={'text'}
                        placeholder={'Last Name'}
                        className={'signup-page__input'}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />

                    <input
                        type={'email'}
                        placeholder={'Email'}
                        className={'signup-page__input'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <div className={'signup-page__password-container'}>
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            placeholder={'Password'}
                            className={'signup-page__password'}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            className={'signup-page__password-visible'}
                            onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                            {passwordVisible ? <BsEyeFill/> : <BsEyeSlashFill/>}
                        </button>
                    </div>

                    <button
                        className={'signup-page__button'}
                        disabled={isButtonDisabled}
                        onClick={signUpEvent}
                    >
                        Create Account
                    </button>

                    <a href={"/login"} className={"signup-page__signup"}>
                        Already have an account?
                        <span className={"signup-text"}>
                            Log In.
                        </span>
                    </a>
                </div>
            </div>

            <Footer/>
        </>
    );
};

export default Signup;