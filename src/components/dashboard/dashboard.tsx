import React, { useEffect, useState } from 'react';
import './styles.css';
import SlidingToggle from '../Toggle/toggle';
import {
    useKilogramsState,
    usePoundsState,
    useStoneState,
} from '../../utils';
import SubmitButton from '../Buttons/submitButton';
import ResetButton from '../Buttons/resetButton';
import {
    collection,
    query,
    where,
    getDocs,
    deleteDoc,
    doc,
    DocumentReference,
    addDoc,
    updateDoc,
    Timestamp,
    orderBy,
    limit,
} from 'firebase/firestore';
import { db, auth } from '../../api/firebase';
import { toast } from 'sonner';
import AuthDetails from '../../pages/auth/details/AuthDetails';
import { FaArrowUpLong, FaArrowDownLong, FaBan } from "react-icons/fa6";
import { TailSpin } from 'react-loading-icons';

interface SavedData {
    id: string;
    bmi: number;
    date: Timestamp;
    user: string;
    feet?: string;
    inches?: string;
    pounds?: number;
    stone?: number;
    metres?: string;
    kilograms?: number;
}
const Dashboard = () => {
    const [goal, setGoal] = useState<string>('none');
    const [updateGoalVisible, setUpdateGoalVisible] = useState<boolean>(false);
    const [userData, setUserData] = useState<SavedData[]>([]);
    const [trendData, setTrendData] = useState<SavedData[]>([]);
    const [trendArrow, setTrendArrow] = useState<string>('none');
    const [trend, setTrend] = useState<string>('none');

    const [loading, setLoading] = useState<boolean>(true);

    const { stone, setStone } = useStoneState();
    const { pounds, setPounds } = usePoundsState();
    const { kilograms, setKilograms } = useKilogramsState();
    const [authUserID, setAuthUserID] = useState<string>('');

    const [stoneError, setStoneError] = useState<boolean>(false);
    const [poundsError, setPoundsError] = useState<boolean>(false);
    const [kilogramsError, setKilogramsError] = useState<boolean>(false);

    const [imperialToggle, setImperialToggle] = useState<boolean>(true);
    const [metricToggle, setMetricToggle] = useState<boolean>(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            setLoading(true);
            try {
                if (user) {
                    await downloadData();
                    await firestoreManagement();
                    setLoading(false);
                } else {
                    console.log("user not authenticated");
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                toast.loading("Unable to load user data", {
                    description: "Try again later.",
                });

                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleImperialToggle = () => {
        setImperialToggle(!imperialToggle);

        if (metricToggle) {
            setMetricToggle(false);
        }

        if (kilograms !== -1) {
            const stone = Math.floor(kilograms / 6.35029);
            const remainingPounds = (kilograms % 6.35029) / 0.453592;
            const pounds = Math.round(remainingPounds);

            setStone(stone);
            setPounds(pounds);
        }
    };

    const handleMetricToggle = () => {
        setMetricToggle(!metricToggle);

        if (imperialToggle) {
            setImperialToggle(false);
        }
        if (stone !== -1 && pounds !== -1) {
            const results: number = stone * 6.35029 + pounds * 0.453592;

            setKilograms(parseFloat(results.toFixed(2)));
        }
    };

    const stoneInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const inputValue: string = event.target.value.trim();
        const parsedValue: number = inputValue === '' || isNaN(parseFloat(inputValue)) ? -1 : parseFloat(inputValue);
        setStone(parsedValue);
    };

    const poundsInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const inputValue: string = event.target.value.trim();
        const parsedValue: number = inputValue === '' || isNaN(parseFloat(inputValue)) ? -1 : parseFloat(inputValue);
        setPounds(parsedValue);
    };
    const kilogramsInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const inputValue: string = event.target.value.trim();

        const sanitizedInput: string = inputValue.replace(/[^0-9.]+/g, '');

        const isValidInput: boolean = sanitizedInput.split('.').length <= 2;

        if (isValidInput) {
            const parsedValue: number = sanitizedInput === '' ? -1 : parseFloat(sanitizedInput);
            setKilograms(parsedValue > 0 && parsedValue <= 150 ? parsedValue : -1);
        }
    };

    const downloadData = async () => {
        setLoading(true);

        try {
            const user = auth.currentUser;

            if (user) {
                const q = query(collection(db, 'Dashboard'), where('user', '==', user.uid));
                const querySnapshot = await getDocs(q);

                querySnapshot.forEach((doc) => {
                    const goalData = doc.data().goal;
                    setGoal(goalData);
                });

                setLoading(false);
            }
        } catch (error) {
            toast.error("Unable to load user data", {
                description: `Download Dashboard Data: Try again later.`,
            });

            console.log(error);
            setLoading(false);
        }
    };

    const firestoreManagement = async () => {
        setLoading(true);

        try {
            const user = auth.currentUser;

            if (user) {
                const q = query(
                    collection(db, 'savedData'),
                    where('user', '==', user.uid),
                    orderBy("date", "desc"),
                    limit(3)
                );

                const querySnapshot = await getDocs(q);

                const userDataArray: SavedData[] = [];
                querySnapshot.forEach((doc) => {
                    userDataArray.push({ id: doc.id, ...doc.data() } as SavedData);
                });

                setUserData(userDataArray);
                setLoading(false);
            }
        } catch (error) {
            toast.error('Unable to load user data', {
                description: 'Download General Data: Try again later.',
            });

            console.log(error);
            setLoading(false);
        }
    };

    const downloadTrendData = async () => {
        setLoading(true);

        try {
            const user = auth.currentUser;

            if (user) {
                const q = query(collection(db, "savedData"), where("user", "==", user.uid), orderBy("date", "desc"));

                const querySnapshot = await getDocs(q);

                const userDataArray: SavedData[] = [];
                querySnapshot.forEach((doc) => {
                    userDataArray.push({ id: doc.id, ...doc.data() } as SavedData);
                });

                setTrendData(userDataArray);
                setLoading(false);
            }
        } catch (error) {
            toast.error('Unable to load user data', {
                description: 'Download Trend Data: Try again later.',
            });

            console.log(error);
            setLoading(false);
        }
    };

    const convertKilogramsToPounds = (kilograms: number | undefined) => {
        const pounds = kilograms ? kilograms * 2.20462 : 0;
        return parseFloat(pounds.toFixed(2))
    }

    const calculateTrend = () => {
        if (trendData.length >= 2) {
            const latestData = trendData[0];
            const oldestData = trendData[trendData.length - 1];

            let latestWeight: number | undefined;
            let oldestWeight: number | undefined;

            if (latestData && oldestData && 'kilograms' in latestData && 'kilograms' in oldestData) {
                const latestKilogramsWeight = latestData.kilograms ? latestData.kilograms : undefined;
                const oldestKilogramsWeight = oldestData.kilograms ? oldestData.kilograms : undefined;

                latestWeight = convertKilogramsToPounds(latestKilogramsWeight);
                oldestWeight = convertKilogramsToPounds(oldestKilogramsWeight);
            } else if (latestData && oldestData && 'stone' in latestData && 'pounds' in latestData && 'stone' in oldestData && 'pounds' in oldestData) {
                const latestImperialWeight = latestData.stone !== undefined && latestData.pounds !== undefined
                    ? (latestData.stone * 14) + latestData.pounds
                    : undefined;

                const oldestImperialWeight = oldestData.stone !== undefined && oldestData.pounds !== undefined
                    ? (oldestData.stone * 14) + oldestData.pounds
                    : undefined;

                latestWeight = latestImperialWeight;
                oldestWeight = oldestImperialWeight;
            } else {
                console.log("Unsupported measurements units in data");
                return;
            }

            if (latestWeight !== undefined && oldestWeight !== undefined) {
                const weightDifference = latestWeight - oldestWeight;

                let trendMessage = `No significant change in weight`

                if (weightDifference > 0) {
                    trendMessage = `Total Gained ${weightDifference.toFixed(2)} lbs`
                    setTrendArrow('gaining');
                } else if (weightDifference < 0) {
                    trendMessage = `Total Lost ${Math.abs(weightDifference).toFixed(2)} lbs`
                    setTrendArrow('loosing');
                }

                setTrend(trendMessage);
            } else {
                setTrend("Unable to calculate trend")
            }
        } else {
            setTrend("Not enough data to calculate")
        }
    };

    useEffect(() => {
        downloadTrendData()
            .then(() => console.log("downloading trend data"));
        calculateTrend()

            // eslint-disable-next-line
    }, [userData]);


    const updateGoalBtn = async () => {
        setStoneError(false);
        setPoundsError(false);
        setKilogramsError(false);

        let newGoal = '';

        if (imperialToggle) {
            if (stone < 0 || pounds < 0) {
                if (stone < 0) {
                    setStoneError(true);
                } else {
                    setStoneError(false);
                }

                if (pounds < 0) {
                    setPoundsError(true);
                } else {
                    setPoundsError(false);
                }

                return;
            }

            newGoal = `${stone} st ${pounds} lbs`;
            setGoal(newGoal);
            setUpdateGoalVisible(false);
        }

        if (metricToggle) {
            if (kilograms < 0) {
                setKilogramsError(true);
                return;
            }

            newGoal = `${kilograms} kg`;
            setGoal(newGoal);
            setUpdateGoalVisible(false);
        }

        let docRef: DocumentReference;

        try {
            const querySnapshot = await getDocs(query(collection(db, 'Dashboard'), where('user', '==', authUserID)));

            if (!querySnapshot.empty) {
                docRef = querySnapshot.docs[0].ref;
                await updateDoc(docRef, { goal: newGoal });
            } else {
                await addDoc(collection(db, 'Dashboard'), {
                    goal: newGoal,
                    user: authUserID,
                });
            }

            toast.success('Success', {
                description: 'Successfully updated your goal.',
            });
        } catch (error) {
            toast.error('Error Occurred whilst Saving', {
                description: `An error has occurred: ${error}`,
            });

            console.log(error);
        }

        setUpdateGoalVisible(false);
    };

    const removeGoal = async () => {
        try {
            const querySnapshot = await getDocs(query(collection(db, 'Dashboard'), where('user', '==', authUserID)));

            if (!querySnapshot.empty) {
                const docId = querySnapshot.docs[0].id;
                await deleteDoc(doc(db, 'Dashboard', docId));
                toast.success('Successfully deleted goal');
                setGoal('none');
            } else {
                toast.error('No goal found for the user');
            }
        } catch (error) {
            toast.error('An error occurred while removing the goal', {
                description: `${error}`,
            });
        }
    };

    return (
        <>
            <AuthDetails userId={setAuthUserID} />

            <div className="dashboard__container">
                {updateGoalVisible ? (
                    <div className={`popup__goal`}>
                        <div className="dashboard__title">New Goal</div>

                        <div className={"popup__goal--toggle"}>
                            <div className={"toggle__one"}>
                                <SlidingToggle toggleTrue={imperialToggle} handleLogic={handleImperialToggle}/>

                                <button
                                    className={"toggle__text"}
                                    onClick={handleImperialToggle}
                                >
                                    <span style={{fontWeight: imperialToggle ? '600' : 'normal', cursor: "pointer"}}>
                                        Imperial
                                    </span>
                                </button>
                            </div>

                            <div className={"toggle__two"}>
                                <SlidingToggle toggleTrue={metricToggle} handleLogic={handleMetricToggle}/>

                                <button
                                    className={"toggle__text"}
                                    onClick={handleMetricToggle}
                                >
                                    <span style={{fontWeight: metricToggle ? '600' : 'normal', cursor: "pointer"}}>
                                        Metric
                                    </span>
                                </button>
                            </div>
                        </div>

                        {imperialToggle && (
                            <>
                                <div className={"fields"}>
                                    <input
                                        type={"numeric"}
                                        id={"stoneInput"}
                                        value={stone === -1 ? '' : stone}
                                        onChange={stoneInputChange}
                                        className={`popup__fields--input ${stoneError ? 'error' : ''}`}
                                    />

                                    <p className={"popup__field--text"}>
                                        st
                                    </p>

                                    <input
                                        type={"numeric"}
                                        id={"poundsInput"}
                                        value={pounds === -1 ? '' : pounds}
                                        onChange={poundsInputChange}
                                        className={`popup__fields--last ${poundsError ? 'error' : ''}`}
                                    />

                                    <p className={"popup__field--text"}>
                                        lbs
                                    </p>

                                </div>
                            </>
                        )}

                        {metricToggle && (
                            <>
                                <div className={'fields'}>
                                    <input
                                        type={"number"}
                                        id={"heightInput"}
                                        value={kilograms === -1 ? '' : kilograms}
                                        onChange={kilogramsInputChange}
                                        className={`popup__fields--input ${kilogramsError ? 'error' : ''}`}
                                    />

                                    <p className={"popup__field--text"}>
                                        kg
                                    </p>

                                </div>
                            </>
                        )}

                        <div className={"popup__goal--buttons"}>
                            <SubmitButton title={"Update"} onClick={updateGoalBtn}/>
                            <ResetButton onClick={() => {
                                setUpdateGoalVisible(!updateGoalVisible)
                            }} title={"Cancel"}/>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="dashboard__recent">
                            <div className="dashboard__title">Recent Weight</div>
                            {loading ? (
                                <div className={"dashboard__loading"}>
                                    <TailSpin/>
                                </div>
                            ) : (
                                <>
                                    {userData.slice(0, 3).map((entry, index) => (
                                        <div key={index}
                                             className={`dashboard__recent--text ${goal !== 'none' ? 'visible' : ''}`}>
                                            {((entry.stone ?? 0) > 0 || (entry.pounds ?? 0) > 0) ? (
                                                <div>
                                            <span className="dashboard__recent--weight">
                                                {entry.stone} st, {entry.pounds} lbs
                                            </span> <br/>
                                                </div>
                                            ) : ((entry.kilograms ?? 0) > 0) ? (
                                                <div>
                                            <span className="dashboard__recent--weight">
                                                {entry.kilograms} kg
                                            </span> <br/>
                                                </div>
                                            ) : (
                                                <div>
                                            <span className="dashboard__recent--weight">
                                                Unable to find recent weight.
                                            </span> <br/>
                                                </div>
                                            )}

                                            <span className="dashboard__recent--date">
                                        {entry.date.toDate().toLocaleDateString()}
                                    </span>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>

                        <div className="dashboard__recent">
                            <div className="dashboard__title">Recent BMI</div>
                            {loading? (
                                <div className={"dashboard__loading"}>
                                    <TailSpin />
                                </div>
                            ) : (
                                <>
                                    {userData.slice(0, 3).map((entry, index) => (
                                        <div key={index}
                                             className={`dashboard__recent--text ${goal !== 'none' ? 'visible' : ''}`}>
                                            <span className="dashboard__recent--bmi"> BMI: {entry.bmi} </span> <br/>
                                            <span
                                                className="dashboard__recent--date"> {entry.date.toDate().toLocaleDateString()} </span>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>

                        <div className={`dashboard__goal  ${goal === "none" ? 'none' : ''}`}>
                            <div className="dashboard__title">Goal <span className={"dashboard__title--alt"}>{goal === "none" ? `none` : ``}</span></div>

                            {loading ? (
                                <div className={"dashboard__loading--goal"}>
                                    <TailSpin />
                                </div>
                            ) : (
                                <>
                                    {goal !== "none" ? (
                                        <div className={"dashboard__goal--container"}>
                                            <p className={"dashboard__goal--text"}>
                                                Current Goal: <span className={"dashboard__goal--span"}> {goal} </span>
                                            </p>

                                            <div className={"dashboard__button--container"}>
                                                <button className={"dashboard__goal--btn"} onClick={() => {
                                                    setUpdateGoalVisible(!updateGoalVisible)
                                                }}>
                                                    Update
                                                </button>

                                                <button className={"dashboard__goal--btn"} onClick={removeGoal}>
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className={"dashboard__goal--none"}>
                                            <button className={"dashboard__goal--btn"} onClick={() => {
                                                setUpdateGoalVisible(!updateGoalVisible)
                                            }}>
                                                Set goal
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        <div className="dashboard__trend">
                            <div className="dashboard__title">Weight Loss</div>

                            {loading ? (
                                <div className={"dashboard__loading"}>
                                    <TailSpin />
                                </div>
                            ) : (
                                <>
                                    {trendArrow === "loosing" && (
                                        <div className={"dashboard__trend--container"}>
                                            <span className={"dashboard__trend--icon"}> <FaArrowDownLong/> </span>
                                            <p className={"dashboard__trend--text"}>
                                                {trend}
                                            </p>
                                        </div>
                                    )}

                                    {trendArrow === "gaining" && (
                                        <div className={"dashboard__trend--container"}>
                                            <span className={"dashboard__trend--icon"}> <FaArrowUpLong /> </span>

                                            <p className={"dashboard__trend--text"}>
                                                {trend}
                                            </p>
                                        </div>
                                    )}

                                    {trendArrow === "none" && (
                                        <div className={"dashboard__trend--container"}>
                                            <span className={"dashboard__trend--icon"}> <FaBan /> </span>
                                            <p className={"dashboard__trend--text"}>
                                                {trend}
                                            </p>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Dashboard;