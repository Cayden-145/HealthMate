import React, { useEffect, useState } from 'react';
import AuthDetails from '../details/AuthDetails';
import Header from '../../../components/Header/header';
import './manageAccount.css';
import { collection, query, where, getDocs, Timestamp, deleteDoc, doc, orderBy } from 'firebase/firestore';
import { db, auth } from '../../../api/firebase';
import { MdDeleteOutline } from "react-icons/md";
import { toast, Toaster } from "sonner";
import { TailSpin } from 'react-loading-icons'
import {signOut} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Dashboard from "../../../components/dashboard/dashboard";

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

    const navigate = useNavigate();

    const signOutClick = () => {
        signOut(auth)
            .then(() => {
                navigate("/login")
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
                const q = query(collection(db, "savedData"), where("user", "==", user.uid), orderBy("date", "desc"));

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

            console.log(error)
        }
    }

    return (
        <div className={"main"}>
            <Header/>
            <Toaster richColors expand={false} position={"top-center"} duration={2000}/>

            <div className={"title__container"}>
                <AuthDetails loginType={"manage"} loggedIn={setLoggedInState}/>
            </div>

            {loggedInState && (
                <Dashboard />
            )}

            {loggedInState && (
                <div className={loggedInState ? "body__container" : "hidden"}>
                    {loading ? (
                        <TailSpin />
                    ) : (
                        <div className={"data__container"}>
                            {userData.length > 0 ? (
                                userData.map((data: SavedData) => (
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

                                        {((data.feet ?? 0) > 0 || (data.inches ?? 0) > 0 || (data.stone ?? 0) > 0 || (data.pounds ?? 0) > 0) && (
                                            <div className="data__imperial-container">
                                                <p className={"data__height-text"}>
                                                    {`Height: ${data.feet} ft ${data.inches} in`}
                                                </p>

                                                <p className={"data__weight-text"}>
                                                    {`Weight: ${data.stone} st ${data.pounds} lbs`}
                                                </p>

                                                <p className={"data__range-text"}>
                                                    Range: {data.bmi < 18.5
                                                    ? "Underweight"
                                                    : data.bmi >= 18.5 && data.bmi <= 24.9
                                                        ? "Healthy"
                                                        : data.bmi >= 25 && data.bmi <= 29.9
                                                            ? "Overweight"
                                                            : data.bmi >= 30
                                                                ? "Obese"
                                                                : "N/A"}
                                                </p>
                                            </div>
                                        )}

                                        {((data.metres ?? 0) > 0 || (data.kilograms ?? 0) > 0) && (
                                            <div className="data__metric-container">
                                                <p className={"data__height-text"}>
                                                    {`Height: ${data.metres} m`}
                                                </p>

                                                <p className={"data__weight-text"}>
                                                    {`Weight: ${data.kilograms} kg`}
                                                </p>

                                                <p className={"data__range-text"}>
                                                    Range: {data.bmi < 18.5
                                                    ? "Underweight"
                                                    : data.bmi >= 18.5 && data.bmi <= 24.9
                                                        ? "Healthy"
                                                        : data.bmi >= 25 && data.bmi <= 29.9
                                                            ? "Overweight"
                                                            : data.bmi >= 30
                                                                ? "Obese"
                                                                : "N/A"}
                                                </p>
                                            </div>
                                        )}

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
