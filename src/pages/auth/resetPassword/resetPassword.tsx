import React, {useState} from 'react';
import './resetPassword.css'
import Header from "../../../components/Header/header";
import Footer from "../../../components/Footer/footer";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import AuthDetails from "../details/AuthDetails";

const ResetPassword = () => {
    const [email, setEmail] = useState<string>('');

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [emailSentSuccess, setEmailSentSuccess] = useState<boolean>(false);

    const [errorCode, setErrorCode] = useState<string>('');

    const resetPasswordSubmit = async (e: { preventDefault: () => void; }) => {
        setErrorCode('')
        e.preventDefault();

        await sendPasswordResetEmail(auth, email);
        setEmailSentSuccess(true);
    };

    const goBack = () => {
        window.history.back();
    };

    return (
        <>
            <Header />


            <div className={"main-page"}>
                <div className={"reset-page__container"}>
                    <p className={"reset-page__title"}>
                        Reset Password
                    </p>

                    <div className={"reset-errors"}>
                        <p className={errorCode !== '' ? "reset-errors__text" : 'hidden'}>
                            {errorCode === 'auth/invalid-email' ? <> * Invalid Email. <br/> </> : ""}
                            {errorCode === 'auth/user-not-found' || 'auth/invalid-credential' ? <> * No existing user with these credentials. <br/> </> : ""}
                        </p>

                        <p className={"reset-errors__text"}>
                            {isButtonDisabled ? "* You must log out to reset your password." : ""}
                        </p>
                    </div>

                    <input
                        type={"email"}
                        placeholder={"Email"}
                        className={"reset-page__input"}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button
                        className={"reset-page__button"}
                        type={"submit"}
                        disabled={isButtonDisabled || !email}
                        onClick={resetPasswordSubmit}
                    >
                        Submit
                    </button>

                    <p className={emailSentSuccess ? "reset-success" : 'hidden'}>
                        {`An email has been sent to ${email}.`}
                    </p>

                    <button
                        className={'reset-page__signup'}
                        onClick={goBack}
                    >
                        Change your mind?
                        <span className={'signup-text'}>Return</span>
                    </button>
                </div>
            </div>

            <Footer/>

            <AuthDetails setIsButtonDisabled={setIsButtonDisabled}/>
        </>
    );
};

export default ResetPassword;