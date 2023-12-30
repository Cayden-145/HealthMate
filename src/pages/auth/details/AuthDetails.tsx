import React, { useEffect, useState } from 'react';
import { auth } from '../../../api/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import './authDetails.css';
import { GiPartyPopper } from 'react-icons/gi';

const AuthDetails = (props: {
    loginType?: string;
    setIsButtonDisabled?: React.Dispatch<React.SetStateAction<boolean>>;
    headerVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [authUser, setAuthUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
                props.setIsButtonDisabled?.(true);
                props.headerVisible?.(true);
            } else {
                setAuthUser(null);
                props.setIsButtonDisabled?.(false);
                props.headerVisible?.(false);
            }
        });

        return () => unsubscribe();
    }, [props, props.setIsButtonDisabled, props.headerVisible]);

    return (
        <>
            <div className={props.loginType === 'signup' ? 'authUser__container' : 'hidden'}>
                {authUser ? (
                    <>
                        <div className={'authUser__text-container'}>
                            <p className={'auth-text__email'}>{`You are logged in as ${authUser.email}`}</p>
                        </div>
                    </>
                ) : (
                    <>
                        <p></p>
                    </>
                )}
            </div>

            <div className={props.loginType === 'login' ? 'authUser-container' : 'hidden'}>
                {authUser ? (
                    <>
                        <div className={'authUser__text-container'}>
                            <div className={'authUser__container-main'}>
                                <p className={'auth-text__image'}>
                                    <GiPartyPopper/>
                                </p>

                                <p className={'auth-text'}>{`Logged In as ${authUser.email}`}</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <p></p>
                    </>
                )}
            </div>

            <div className={props.loginType === 'manage' ? 'manageUser__container' : 'hidden'}>
                {authUser ? (
                    <>
                        <div className={'manageUser__text-container'}>
                            <p className={'manageUser-text__email'}>
                                Welcome,
                                <span className={"email"}>
                                    {authUser.email}
                                </span>
                            </p>
                        </div>
                    </>
                ) : (
                    <>
                        <p className={"manageUser__error"}>
                            * You must be logged in to access this page!
                        </p>
                    </>
                )}
            </div>
        </>
    );
};

export default AuthDetails;
