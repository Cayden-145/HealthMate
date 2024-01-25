import React, { useEffect, useState } from 'react';
import { auth } from '../../../api/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import './authDetails.css';

const AuthDetails = (props: {
    loginType?: string;
    loggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
    headerVisible?: React.Dispatch<React.SetStateAction<boolean>>;
    displayName?: React.Dispatch<React.SetStateAction<string>>;
    userId?: React.Dispatch<React.SetStateAction<string>>;
    displayNameVisible?: boolean;
}) => {
    const [authUser, setAuthUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
                props.loggedIn?.(true);
                props.headerVisible?.(true);

                if (user.displayName) {
                    props.displayName?.(user.displayName);
                }

                props.userId?.(user.uid);
            } else {
                setAuthUser(null);
                props.loggedIn?.(false);
                props.headerVisible?.(false);
                props.displayName?.('');
                props.userId?.('');
            }
        });

        return () => unsubscribe();
    }, [props, props.loggedIn, props.headerVisible]);

    return (
        <>
            {props.displayNameVisible && (
                <div className={props.displayNameVisible ? 'display-name' : 'hidden'}>
                    {authUser ? (
                        <>
                            <div className={'authUser__text-container'}>
                                <a href={"/"} className={'auth-text__email'}>
                                    {`Welcome, ${authUser.displayName}.`}
                                    <span
                                        style={{textDecoration: "underline", fontSize: "18px", marginLeft: "20px"}}
                                    >
                                    Navigate Home
                                </span>
                                </a>
                            </div>
                        </>
                    ) : (
                        <>
                            <p></p>
                        </>
                    )}
                </div>
            )}

            {props.loginType && (
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

                            <div className={"manageUser__information-container"}>
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
            )}
        </>
    );
};

export default AuthDetails;
