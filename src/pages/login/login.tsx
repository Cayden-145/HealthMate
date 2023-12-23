import React, {useState} from 'react';
import './login.css'
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const isButtonDisabled =  !email || !password;

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
                            {passwordVisible ? <BsEyeFill /> : <BsEyeSlashFill />}
                        </button>
                    </div>

                    <button
                        className={"login-page__button"}
                        disabled={isButtonDisabled}
                    >
                        Log In
                    </button>

                    <a href={"/signup"} className={"login-page__signup"}>
                        Don't have an account?
                        <span className={"signup-text"}>
                            Sign Up.
                        </span>
                    </a>
                </div>
            </div>

            <Footer/>
        </>
    );
};

export default Login;