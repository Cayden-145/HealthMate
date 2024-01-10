import React, {useEffect, useState} from 'react';
import './style.css';
import Header from "../../components/Header/header";
import {
    useFeetState, useInchesState, useKilogramsState, useMetresState, usePoundsState, useStoneState
} from "../../utils";
import { useLocation, useNavigate } from 'react-router-dom';
import SubmitButton from "../../components/Buttons/submitButton";
import ResetButton from "../../components/Buttons/resetButton";
import SlidingToggle from "../../components/Toggle/toggle";
import AuthDetails from "../auth/details/AuthDetails";
import {IoIosArrowDropdown} from "react-icons/io";
import Confetti from 'react-dom-confetti';
import { Toaster, toast } from 'sonner';
import { db } from '../../api/firebase';
import { collection, addDoc, deleteDoc, doc, Timestamp, DocumentReference } from "firebase/firestore";

const BMICalculator = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const kilogramsLocation = new URLSearchParams(location.search).get('kilograms');
    const stoneLocation = new URLSearchParams(location.search).get('stone');
    const poundsLocation = new URLSearchParams(location.search).get('pounds');

    const metresLocation = new URLSearchParams(location.search).get('metres');
    const feetLocation = new URLSearchParams(location.search).get('feet');
    const inchesLocation = new URLSearchParams(location.search).get('inches');

    const typeLocation = new URLSearchParams(location.search).get('type');

    const { feet, setFeet } = useFeetState();
    const { inches, setInches } = useInchesState();
    const { stone, setStone } = useStoneState();
    const { pounds, setPounds } = usePoundsState();
    const { kilograms, setKilograms } = useKilogramsState();
    const { metres, setMetres } = useMetresState();

    const [results, setResults] = useState<number | string>('Unknown');
    const [range, setRange] = useState<string>("")
    const [isBMIVisible, setisBMIVisible] = useState<boolean>(false);

    const [heightError, setHeightError] = useState<boolean>(false);
    const [inchesError, setInchesError] = useState<boolean>(false);
    const [stoneError, setStoneError] = useState<boolean>(false);
    const [poundsError, setPoundsError] = useState<boolean>(false);
    const [metresError, setMetresError] = useState<boolean>(false);
    const [kilogramsError, setKilogramsError] = useState<boolean>(false);

    const [imperialToggle, setImperialToggle] = useState<boolean>(true);
    const [metricToggle, setMetricToggle] = useState<boolean>(false);

    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
    const [dropdownActive, setDropdownActive] = useState<boolean>(false);
    const [confetti, setConfetti] = useState<boolean>(false);
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
    const [authUserID, setAuthUserID] = useState<string>('');

    useEffect(() => {
        if (typeLocation === "imperial") {
            setImperialToggle(true);
            setMetricToggle(false);

            if (feetLocation !== null) setFeet(parseFloat(feetLocation));
            if (inchesLocation !== null) setInches(parseFloat(inchesLocation));

            if (stoneLocation !== null) setStone(parseFloat(stoneLocation));
            if (poundsLocation !== null) setPounds(parseFloat(poundsLocation));

            navigate('/bmi-calculator');

        } else if (typeLocation === "metric") {
            setMetricToggle(true);
            setImperialToggle(false);

            if (metresLocation !== null) {
                const sanitizedInput: string = metresLocation.replace(/[^0-9.]+/g, '');

                const isValidInput: boolean = sanitizedInput.split('.').length <= 2;

                if (isValidInput) {
                    const parsedValue: number = sanitizedInput === '' ? -1 : parseFloat(sanitizedInput);
                    setMetres(parsedValue > 0 && parsedValue <= 10 ? parsedValue : -1);
                }
            }

            if (kilogramsLocation !== null) setKilograms(parseFloat(kilogramsLocation));

            navigate('/bmi-calculator');
        }
    }, [navigate, stoneLocation, poundsLocation, kilogramsLocation, typeLocation, feetLocation, inchesLocation, metresLocation, setStone, setPounds, setImperialToggle, setMetricToggle, setFeet, setInches, setMetres, setKilograms]);

    useEffect(() => {
        const resetURL = () => {
            window.history.replaceState({}, '', '/bmi-calculator');
        };

        resetURL();

        // Add event listener to reset URL when the page is refreshed
        const handleBeforeUnload = () => {
            resetURL();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const handleImperialToggle = () => {
        setImperialToggle(!imperialToggle);

        if (metricToggle) {
            setMetricToggle(false);
        }

        if (metres !== -1 || kilograms !== -1) {
            if (metres !== -1) {
                const metresToFeet: number = 3.281;
                const metresToInches: number = 39.37;

                const feetFromMetres: number = metres * metresToFeet;
                const totalInches: number = metres * metresToInches;

                const remainingFeet: number = Math.floor(feetFromMetres);

                const inchesFromMetres: number = totalInches % 12;

                const roundedInches: number = inchesFromMetres % 1 > 0.5 ? Math.ceil(inchesFromMetres) : inchesFromMetres;

                const feetResult: number = isNaN(remainingFeet) || remainingFeet < 0 ? 0 : remainingFeet;
                const inchesResult: string = isNaN(roundedInches) || roundedInches < 0
                    ? 'Unknown'
                    : roundedInches % 1 === 0
                        ? roundedInches.toFixed(0)
                        : roundedInches.toFixed(2);

                setFeet(feetResult);
                setInches(parseFloat(inchesResult));
            }

            if (kilograms !== -1) {
                const stone = Math.floor(kilograms / 6.35029);
                const remainingPounds = (kilograms % 6.35029) / 0.453592;
                const pounds = Math.round(remainingPounds);

                setStone(stone);
                setPounds(pounds);
            }
        }
    };

    const handleMetricToggle = () => {
        setMetricToggle(!metricToggle)

        if (imperialToggle) {
            setImperialToggle(false);
        }

        if (feet !== -1 || inches !== -1 || stone !== -1 || pounds !== -1) {
            if (feet !== -1 && inches !== -1) {
                const feetToMetres: number = 0.3048
                const inchesToMetres: number = 0.0254

                const metresFromFeet: number = feet * feetToMetres
                const metresFromInches: number = inches * inchesToMetres

                const totalMetres: number = metresFromFeet + metresFromInches

                setMetres(parseFloat(totalMetres.toFixed(2)));
            }

            if (stone !== -1 && pounds !== -1) {
                const results: number = (stone * 6.35029) + (pounds * 0.453592)

                setKilograms(parseFloat(results.toFixed(2)));
            }
        }
    };

    const heightInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const inputValue: string = event.target.value.trim();
        const parsedValue: number = inputValue === '' || isNaN(parseFloat(inputValue)) ? -1 : parseFloat(inputValue);
        setFeet(parsedValue);
    };

    const inchesInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const inputValue: string = event.target.value.trim();
        const parsedValue: number = inputValue === '' || isNaN(parseFloat(inputValue)) ? -1 : parseFloat(inputValue);
        setInches(parsedValue);
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

    const metresInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const inputValue: string = event.target.value.trim();

        const sanitizedInput: string = inputValue.replace(/[^0-9.]+/g, '');

        const isValidInput: boolean = sanitizedInput.split('.').length <= 2;

        if (isValidInput) {
            const parsedValue: number = sanitizedInput === '' ? -1 : parseFloat(sanitizedInput);
            setMetres(parsedValue > 0 && parsedValue <= 10 ? parsedValue : -1);
        }
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

    const calculate = () => {
        setHeightError(false);
        setInchesError(false);
        setStoneError(false);
        setPoundsError(false);
        setKilogramsError(false);
        setMetresError(false);
        setButtonDisabled(false);
        setDropdownActive(false);

        if (imperialToggle) {
            if (feet <= -1 || inches <= -1 || stone <= -1 || pounds <= -1) {
                if (feet <= -1) {
                    setHeightError(true);
                } else {
                    setHeightError(false);
                }

                if (inches <= -1) {
                    setInchesError(true);
                } else {
                    setInchesError(false);
                }

                if (stone <= -1) {
                    setStoneError(true);
                } else {
                    setStoneError(false);
                }

                if (pounds <= -1) {
                    setPoundsError(true);
                } else {
                    setPoundsError(false);
                }

                return;
            }
        }

        if (metricToggle) {
            if (metres <=-1 || kilograms <=-1) {
                if (metres <= -1) {
                    setMetresError(true);
                } else {
                    setMetresError(false);
                }

                if (kilograms <= -1) {
                    setKilogramsError(true);
                } else {
                    setKilogramsError(false);
                }

                return;
            }
        }

        if (imperialToggle) {
            let height_in_inches: number = (feet * 12) + inches;
            let weight_in_pounds: number = (stone * 14) + pounds;
            let squared_height: number = height_in_inches ** 2;

            const bmiResult = (weight_in_pounds / squared_height) * 703;
            setResults(isNaN(bmiResult) ? 'Unknown' : bmiResult.toFixed(2));

            if (bmiResult <= 18.5) {
                setRange("Underweight")
            } else if (bmiResult >= 18.5 && bmiResult <= 24.9) {
                setRange("Healthy Weight")
            } else if (bmiResult >= 25 && bmiResult <= 29.9) {
                setRange("Overweight")
            } else if (bmiResult >= 30) {
                setRange("Obese")
            }

            setisBMIVisible(true);
        }

        if (metricToggle) {
            const bmiResult: number = kilograms / (metres ** 2);
            setResults(isNaN(bmiResult) ? 'Unknown' : bmiResult.toFixed(2));

            if (bmiResult <= 18.5) {
                setRange("Underweight")
            } else if (bmiResult >= 18.5 && bmiResult <= 24.9) {
                setRange("Healthy Weight")
            } else if (bmiResult >= 25 && bmiResult <= 29.9) {
                setRange("Overweight")
            } else if (bmiResult >= 30) {
                setRange("Obese")
            }

            setisBMIVisible(true);
        }
    }

    const reset = () => {
        setFeet(-1);
        setInches(-1);
        setStone(-1);
        setPounds(-1);
        setMetres(-1);
        setKilograms(-1);
        setResults('Unknown');
        setRange("");
        setisBMIVisible(false);
        setButtonDisabled(false);
        setDropdownActive(false);

        setHeightError(false);
        setInchesError(false);
        setStoneError(false);
        setPoundsError(false);
        setKilogramsError(false);
        setMetresError(false);
        navigate('/bmi-calculator');
    }

    const confettiConfig = {
        angle: 90,
        spread: 45,
        startVelocity: 30,
        elementCount: 50,
        decay: 0.9,
    };

    const saveData = async () => {
        setDropdownActive(!dropdownActive)
        try {
            let docRef: DocumentReference | undefined;

            if (metricToggle) {
                docRef = await addDoc(collection(db, "savedData"), {
                    metres: metres,
                    kilograms: kilograms,
                    bmi: results,
                    date: Timestamp.now(),
                    user: authUserID
                });
            } else if (imperialToggle) {
                docRef = await addDoc(collection(db, "savedData"), {
                    feet: feet,
                    inches: inches,
                    stone: stone,
                    pounds: pounds,
                    bmi: results,
                    date: Timestamp.now(),
                    user: authUserID
                });
            } else {
                docRef = await addDoc(collection(db, "savedData"), {
                    bmi: results,
                    date: Timestamp.now(),
                    user: authUserID
                });
            }

            if (docRef) {
                const savedDocId = docRef.id;

                toast.success("Success", {
                    description: `Your BMI, ${results}, has been saved.`,
                    action: {
                        label: "Undo",
                        onClick: () => undoSaveData(savedDocId),
                    },
                })

                setButtonDisabled(true);
                setConfetti(true);

                setTimeout(() => {
                    setConfetti(false);
                }, 900);
            } else {
                toast.error("Error Occurred whilst Saving", {
                    description: `Unable to find document reference, try again later.`
                })
            }

        } catch (error) {
            toast.error("Error Occurred whilst Saving", {
                description: `An error has occurred: ${error}`
            })

            console.log(error)
        }
    }

    const undoSaveData = async (docId: string) => {
        try {
            await deleteDoc(doc(db, "savedData", docId));

            toast.success("Undo Successful", {
                description: `Your BMI data has been successfully undone.`,
            });

            setButtonDisabled(false);
            setConfetti(false);
        } catch (error) {
            toast.error("Error Occurred while Undoing", {
                description: `An error has occurred: ${error}`,
            });

            console.log(error);
        }
    }

    return (
        <>
            <AuthDetails loggedIn={setIsUserLoggedIn} userId={setAuthUserID} />
            <Toaster richColors expand={false} position={"bottom-right"}/>

            <div className={"app"}>
                <Header buttonVisible={true}/>

                <div className={"page__title"}>
                    <p className={"page__title-text"}>
                        BMI Calculator
                    </p>
                </div>

                <div className={"errors"}>
                    <p className={"errors"}>
                        {heightError ? "* You must enter a valid amount of feet." : ""}
                    </p>

                    <p className={"errors"}>
                        {inchesError ? "* You must enter a valid amount of inches." : ""}
                    </p>

                    <p className={"errors"}>
                        {stoneError ? "* You must enter a valid amount of stones." : ""}
                    </p>

                    <p className={"errors"}>
                        {poundsError ? "* You must enter a valid amount of pounds." : ""}
                    </p>

                    <p className={"errors"}>
                        {kilogramsError ? "* You must enter a valid amount of kilograms." : ""}
                    </p>

                    <p className={"errors"}>
                        {metresError ? "* You must enter a valid amount of metres." : ""}
                    </p>
                </div>

                <div className={"toggle"}>
                    <div className={"toggle__one"}>
                        <SlidingToggle toggleTrue={imperialToggle} handleLogic={handleImperialToggle}/>

                        <button
                            className={"toggle__text"}
                            onClick={handleImperialToggle}>
                            <span style={{fontWeight: imperialToggle ? '600' : 'normal'}}>
                              Imperial
                            </span>
                        </button>
                    </div>

                    <div className={"toggle__two"}>
                        <SlidingToggle toggleTrue={metricToggle} handleLogic={handleMetricToggle}/>

                        <button
                            className={"toggle__text"}
                            onClick={handleMetricToggle}>
                            <span style={{fontWeight: metricToggle ? '600' : 'normal'}}>
                              Metric
                            </span>
                        </button>
                    </div>
                </div>

                <div className={`${imperialToggle ? 'fields' : 'hidden'}`}>

                    <p className={"fields__text"}>
                        Height:
                    </p>

                    <input
                        type={"numeric"}
                        id={"heightInput"}
                        value={feet === -1 ? '' : feet}
                        onChange={heightInputChange}
                        className={`fields__input ${heightError ? 'error' : ''}`}
                    />

                    <p className={"fields__text"}>
                        ft
                    </p>

                    <input
                        type={"numeric"}
                        id={"inchesInput"}
                        value={inches === -1 ? '' : inches}
                        onChange={inchesInputChange}
                        className={`fields__input ${inchesError ? 'error' : ''}`}
                    />

                    <p className={"fields__text"}>
                        inch
                    </p>
                </div>

                <div className={`${imperialToggle ? 'fields' : 'hidden'}`}>
                    <p className={"fields__text-weight"}>
                        Weight:
                    </p>

                    <input
                        type={"numeric"}
                        id={"stoneInput"}
                        value={stone === -1 ? '' : stone}
                        onChange={stoneInputChange}
                        className={`fields__input ${stoneError ? 'error' : ''}`}
                    />

                    <p className={"fields__text"}>
                        st
                    </p>

                    <input
                        type={"numeric"}
                        id={"poundsInput"}
                        value={pounds === -1 ? '' : pounds}
                        onChange={poundsInputChange}
                        className={`fields__input ${poundsError ? 'error' : ''}`}
                    />

                    <p className={"fields__text"}>
                        lbs
                    </p>

                </div>

                <div className={`${metricToggle ? 'metric-fields' : 'hidden'}`}>
                    <p className={"fields__text"}>
                        Height:
                    </p>

                    <input
                        type={"number"}
                        id={"heightInput"}
                        value={metres === -1 ? '' : metres}
                        onChange={metresInputChange}
                        className={`fields__input ${metresError ? 'error' : ''}`}
                    />

                    <p className={"fields__text"}>
                        metres
                    </p>
                </div>

                <div className={`${metricToggle ? 'metric-fields' : 'hidden'}`}>
                    <p className={"metric-fields__text-weight"}>
                        Weight:
                    </p>

                    <input
                        type={"number"}
                        id={"heightInput"}
                        value={kilograms === -1 ? '' : kilograms}
                        onChange={kilogramsInputChange}
                        className={`fields__input ${kilogramsError ? 'error' : ''}`}
                    />

                    <p className={"fields__text"}>
                        kilograms
                    </p>

                </div>

                <div className={"buttons"}>
                    <SubmitButton onClick={calculate} title={"Calculate"}/>
                    <ResetButton onClick={reset} title={"Reset"}/>
                </div>

                <div className={`${isBMIVisible ? 'results' : 'hidden'}`}>
                    <p>
                        Your BMI is:
                    </p>

                    <p className={"results__text"}>
                        {results > 0 ? results : "unknown"}
                    </p>

                    <div className={isUserLoggedIn ? "save-data__container" : "hidden"}>
                        <button
                            className={isUserLoggedIn ? "save-data__button" : "hidden"}
                            onClick={() => {setDropdownActive(!dropdownActive)}}
                        >
                            <IoIosArrowDropdown/>
                        </button>

                        <div className={dropdownActive ? "save-data__dropdown" : "hidden"}>
                            <button
                                className={"dropdown__button"}
                                onClick={saveData}
                                disabled={buttonDisabled}
                            >
                                Save Data
                            </button>
                        </div>
                    </div>
                    <Confetti active={confetti} config={confettiConfig}/>
                </div>

                <div className={"bottom-container"}>
                    <div className={"information"}>
                        <p className={"info-text__title"}>
                            BMI weight ranges:
                        </p>

                        <p className={"information__text"}>
                            <span>
                              <span style={{
                                  fontWeight: range === 'Underweight' ? '600' : 'normal',
                                  color: range === 'Underweight' ? "#c4e7ff" : "var(--text-color)",
                                  textDecoration: range === 'Underweight' ? "underline" : "none"
                              }}>
                                Less than 18.5 = Underweight
                              </span>

                              <br/>

                              <span style={{
                                  fontWeight: range === 'Healthy Weight' ? '600' : 'normal',
                                  color: range === 'Healthy Weight' ? "#c4e7ff" : "var(--text-color)",
                                  textDecoration: range === 'Healthy Weight' ? "underline" : "none"
                              }}>
                                Between 18.5 - 24.9 = Healthy Weight
                              </span>

                              <br/>

                              <span style={{
                                  fontWeight: range === 'Overweight' ? '600' : 'normal',
                                  color: range === 'Overweight' ? "#c4e7ff" : "var(--text-color)",
                                  textDecoration: range === 'Overweight' ? "underline" : "none"
                              }}>
                                  Between 25 - 29.9 = Overweight
                              </span>

                              <br/>

                              <span style={{
                                  fontWeight: range === 'Obese' ? '600' : 'normal',
                                  color: range === 'Obese' ? "#c4e7ff" : "var(--text-color)",
                                  textDecoration: range === 'Obese' ? "underline" : "none"
                              }}>
                                  Over 30 = Obese
                              </span>
                          </span>
                        </p>

                        <div>
                            <div className={"divider-alt"}></div>

                            <div className='hw-results__container-alt'>
                                <p className={"hw-results__height"}>
                                    {metricToggle ? `Height: ${metres} m` : `Height: ${feet} ft, ${inches} in`}
                                </p>

                                <p className={"hw-results__weight"}>
                                    {metricToggle ? `Weight: ${kilograms} kg` : `Weight: ${stone} st, ${pounds} lbs`}
                                </p>
                            </div>

                            <p className={"weight__alt-text"}>
                                {range !== "" ? `You are in the ${range} range.` : ""}
                            </p>

                            <a
                                href="https://patient.info/healthy-living/obesity-overweight"
                                className="weight__alt-link"
                                target="_blank"
                                rel="noreferrer"
                            >
                                {range !== "" ? "See why this matters" : ""}
                            </a>
                        </div>
                    </div>

                    <div className={`${isBMIVisible ? 'weight' : 'hidden'}`}>
                        <div className='hw-results__container'>
                            <p className={"hw-results__height"}>
                                {metricToggle ? `Height: ${metres} m` : `Height: ${feet} ft, ${inches} in`}
                            </p>

                            <p className={"hw-results__weight"}>
                                {metricToggle ? `Weight: ${kilograms} kg` : `Weight: ${stone} st, ${pounds} lbs`}
                            </p>
                        </div>

                        <div className="weight__text">
                            <p>{range !== "" ? `You are in the ${range} range.` : ""}</p>
                            <a
                                href="https://patient.info/healthy-living/obesity-overweight"
                                className="weight__text-link"
                                target="_blank"
                                rel="noreferrer"
                            >
                                {range !== "" ? "See why this matters" : ""}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BMICalculator;