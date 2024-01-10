import React, { useEffect, useState } from 'react';
import AuthDetails from '../details/AuthDetails';
import Header from '../../../components/Header/header';
import './manageAccount.css';
import { collection, query, where, getDocs, Timestamp, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../../api/firebase';
import { MdDeleteOutline } from "react-icons/md";
import { toast, Toaster } from "sonner";
import { SpinningCircles } from 'react-loading-icons'
import {signOut} from "firebase/auth";

interface SavedData {
    id: string;
    bmi: number;
    date: Timestamp;
    user: string;

    feet?: string;
    inches?: string;
    pounds?: string;
    stone?: string;

    metres?: string;
    kilograms?: string;
}

const ManageAccount = () => {
    const [userData, setUserData] = useState<SavedData[]>([]);
    const [loggedInState, setLoggedInState] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

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

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            try {
                if (user) {
                    await firestoreManagement();
                    console.log("fetching user data");
                } else {
                    console.log("User not authenticated");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                toast.loading("Unable to load user data", {
                    description: "Try again later."
                });
            }
        });

        return () => unsubscribe();
    }, []);

    const formatToDdMmYyyy = (date: Date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const deleteData = async (id: string) => {
        try {
            await deleteDoc(doc(db, "savedData", id));
            setUserData((prevData) => prevData.filter((data) => data.id !== id));
            toast.success("Successfully deleted data")
        } catch (error) {
            toast.error("An error occurred whilst loading your data", {
                description: `${error}`
            })
        }
    };

    const firestoreManagement = async () => {
        try {
            const user = auth.currentUser;

            if (user) {
                const q = query(collection(db, "savedData"), where("user", "==", user.uid));

                const querySnapshot = await getDocs(q);

                const userDataArray: SavedData[] = [];
                querySnapshot.forEach((doc) => {
                    userDataArray.push({ id: doc.id, ...doc.data() } as SavedData);
                });

                setUserData(userDataArray);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            toast.error("Unable to load user data", {
                description: "Try again later."
            });
        }
    }

    return (
        <div className={"main"}>
            <Header/>
            <Toaster richColors expand={false} position={"bottom-right"} duration={2000}/>

            <div className={"title__container"}>
                <AuthDetails loginType={"manage"} loggedIn={setLoggedInState}/>
            </div>

            {loggedInState && (
                <div className={loggedInState ? "body__container" : "hidden"}>
                    {loading ? (
                        <SpinningCircles/>
                    ) : (
                        <div className={"data__container"}>
                            {userData.length > 0 ? (
                                userData.map((data) => (
                                    <div key={data.id} className={loggedInState ? "data__information" : "hidden"}>
                                        {loggedInState && (
                                            <p>
                                                {`BMI: ${data.bmi}`}
                                            </p>
                                        )}

                                        {loggedInState && (
                                            <p>
                                                {`Date: ${formatToDdMmYyyy(data.date.toDate())}`}
                                            </p>
                                        )}

                                        <div className={data.feet && data.inches && data.stone && data.pounds ? "data__imperial-container" : "hidden"}>
                                            {data.feet !== undefined && data.inches !== undefined && (
                                                <p className={"data__height-text"}>
                                                    {`Height: ${data.feet} ft ${data.inches} in`}
                                                </p>
                                            )}

                                            {data.stone !== undefined && data.pounds !== undefined && (
                                                <p className={"data__weight-text"}>
                                                    {`Weight: ${data.stone} st ${data.pounds} lbs`}
                                                </p>
                                            )}
                                        </div>

                                        <div className={data.metres && data.kilograms ? "data__metric-container" : "hidden"}>
                                            {data.metres !== undefined && (
                                                <p className={"data__height-text"}>
                                                    {`Height: ${data.metres} m`}
                                                </p>
                                            )}

                                            {data.kilograms !== undefined && (
                                                <p className={"data__weight-text"}>
                                                    {`Weight: ${data.kilograms} kg`}
                                                </p>
                                            )}
                                        </div>

                                        <button
                                            className={"data__information-delete"}
                                            onClick={() => deleteData(data.id)}
                                        >
                                            <MdDeleteOutline/>
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className={"data__error"}>
                                    Unable to find data associated with this account.
                                </p>
                            )}
                        </div>
                    )}
                </div>
            )}

            {loggedInState && (
                <div className={loggedInState ? "personal__information" : "hidden"}>
                    <button
                        className={"sign-out__button"}
                        onClick={signOutClick}
                    >
                        Log Out
                    </button>
                </div>
            )}
        </div>
    );
};

export default ManageAccount;
