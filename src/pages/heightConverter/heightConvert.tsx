import React, {useState} from 'react';
import './style.css'
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import {
    useFeetState, useInchesState, useMetresState
} from "../../utils";
import SubmitButton from "../../components/Buttons/submitButton";
import ResetButton from "../../components/Buttons/resetButton";
import SlidingToggle from "../../components/Toggle/toggle";

const HeightConverter = () => {
    const { feet, setFeet } = useFeetState();
    const { inches, setInches } = useInchesState();
    const { metres, setMetres } = useMetresState();

    const [imperialToMetric, setImperialToMetric] = useState<boolean>(true);
    const [metricToImperial, setMetricToImperial] = useState<boolean>(false);

    const [feetError, setFeetError] = useState<boolean>(false);
    const [inchesError, setInchesError] = useState<boolean>(false);
    const [metresError, setMetresError] = useState<boolean>(false);

    const [metresResults, setMetresResults] = useState<number | string>('Unknown');
    const [feetResults, setFeetResults] = useState<number | string>('Unknown');
    const [inchesResults, setInchesResults] = useState<number | string>('Unknown');

    const [imperialResultsVisible, setImperialResultsVisible] = useState<boolean>(false);
    const [metricResultsVisible, setMetricResultsVisible] = useState<boolean>(false);

    const handleImperialToggle = () => {
        setImperialToMetric(!imperialToMetric);

        if (metricToImperial) {
            setMetricToImperial(false);
        }
    };

    const handleMetricToggle = () => {
        setMetricToImperial(!metricToImperial)

        if (imperialToMetric) {
            setImperialToMetric(false);
        }
    };

    const feetInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const inputValue: string = event.target.value.trim();
        const parsedValue: number = inputValue === '' || isNaN(parseFloat(inputValue)) ? -1 : parseFloat(inputValue);
        setFeet(parsedValue >= 0 && parsedValue <= 11 ? parsedValue : -1);
    };

    const inchesInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const inputValue: string = event.target.value.trim();
        const parsedValue: number = inputValue === '' || isNaN(parseFloat(inputValue)) ? -1 : parseFloat(inputValue);
        setInches(parsedValue >= 0 && parsedValue <= 11 ? parsedValue : -1);
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

    const calculate = () => {
        setFeetError(false);
        setInchesError(false);
        setMetresError(false);
        setMetricResultsVisible(false);
        setImperialResultsVisible(false);

        if (imperialToMetric) {
            if (feet <= -1 || inches <= -1) {
                if (feet <= -1) {
                    setFeetError(true);
                } else {
                    setFeetError(false);
                }

                if (inches <= -1) {
                    setInchesError(true);
                } else {
                    setInchesError(false);
                }

                return;
            }
        }

        if (metricToImperial) {
            if (metres <= -1) {
                if (metres <= -1) {
                    setMetresError(true);
                } else {
                    setMetresError(false);
                }

                return;
            }
        }

        if (imperialToMetric) {
            const feetToMetres: number = 0.3048
            const inchesToMetres: number = 0.0254

            const metresFromFeet: number = feet * feetToMetres
            const metresFromInches: number = inches * inchesToMetres

            const totalMetres: number = metresFromFeet + metresFromInches

            setMetresResults(totalMetres.toFixed(2));

            setMetricResultsVisible(true);
        }

        if (metricToImperial) {
            const metresToFeet: number = 3.281;
            const metresToInches: number = 39.37;

            const feetFromMetres: number = metres * metresToFeet;
            const totalInches: number = metres * metresToInches;

            const remainingFeet: number = Math.floor(feetFromMetres);

            const inchesFromMetres: number = totalInches % 12;

            const roundedInches: number = inchesFromMetres % 1 > 0.5 ? Math.ceil(inchesFromMetres) : inchesFromMetres;

            const feetResult: number | string = isNaN(remainingFeet) || remainingFeet < 0 ? 'Unknown' : remainingFeet;
            const inchesResult: string = isNaN(roundedInches) || roundedInches < 0
                ? 'Unknown'
                : roundedInches % 1 === 0
                    ? roundedInches.toFixed(0)
                    : roundedInches.toFixed(2);

            setFeetResults(feetResult);
            setInchesResults(inchesResult);

            setImperialResultsVisible(true);
        }
    };

    const reset = () => {
        setFeet(-1);
        setInches(-1);
        setMetres(-1);
        setMetresResults('Unknown');
        setFeetResults('Unknown');
        setInchesResults('Unknown');

        setFeetError(false);
        setMetresError(false);
        setInchesError(false);
        setMetricResultsVisible(false);
        setImperialResultsVisible(false);
    };

    return (
        <div className={"main"}>
            <Header buttonVisible={true}/>

            <div className={"page__title"}>
                <p className={"page__title-text"}>
                    Height Converter
                </p>
            </div>

            <div className={"errors"}>
                <p>
                    {feetError ? "* You must enter a valid amount of feet." : ""}
                </p>

                <p>
                    {inchesError ? "* You must enter a valid amount of inches." : ""}
                </p>

                <p>
                    {metresError ? "* You must enter a valid amount of metres." : ""}
                </p>
            </div>

            <div className={"toggle"}>
                <div className={"toggle__one"}>
                    <SlidingToggle toggleTrue={imperialToMetric} handleLogic={handleImperialToggle}/>

                    <button
                        className={"toggle__text"}
                        onClick={handleImperialToggle}>
                            <span style={{fontWeight: imperialToMetric ? '600' : 'normal'}}>
                              Imperial
                            </span>
                    </button>
                </div>

                <div className={"toggle__two"}>
                    <SlidingToggle toggleTrue={metricToImperial} handleLogic={handleMetricToggle}/>

                    <button
                        className={"toggle__text"}
                        onClick={handleMetricToggle}>
                            <span style={{fontWeight: metricToImperial ? '600' : 'normal'}}>
                              Metric
                            </span>
                    </button>
                </div>
            </div>

            <div className={`${imperialToMetric ? 'fields' : 'hidden'}`}>
                <p className={"fields__text"}>
                    Height:
                </p>

                <input
                    type={"numeric"}
                    value={feet === -1 ? '' : feet}
                    onChange={feetInputChange}
                    className={"fields__input"}
                />

                <p className={"fields__text"}>
                    ft
                </p>

                <input
                    type={"numeric"}
                    value={inches === -1 ? '' : inches}
                    onChange={inchesInputChange}
                    className={"fields__input"}
                />

                <p className={"fields__text"}>
                    inch
                </p>
            </div>

            <div className={`${metricToImperial ? 'fields' : 'hidden'}`}>
                <p className={"fields__text"}>
                    Height:
                </p>

                <input
                    type={"number"}
                    value={metres === -1 ? '' : metres}
                    onChange={metresInputChange}
                    className={"fields__input"}
                />

                <p className={"fields__text"}>
                    metres
                </p>
            </div>

            <div className={"buttons"}>
                <SubmitButton onClick={calculate} title={"Calculate"}/>
                <ResetButton onClick={reset} title={"Reset"}/>
            </div>

            <div className={`${imperialResultsVisible ? 'results' : 'hidden'}`}>
                <p className={"results__text"}>
                    Your height is: <br/>
                </p>

                <p className={"results__text-two"}>
                    {feetResults > 0 ? `${feetResults} ft` : "Unknown"}
                </p>

                <p className={"results__text-two"}>
                    {inchesResults > 0 ? `${inchesResults} in` : "Unknown"}
                </p>
            </div>

            <div className={`${metricResultsVisible ? 'results' : 'hidden'}`}>
                <p className={"results__text"}>
                    Your height is: <br/>
                </p>

                <p className={"results__text-two"}>
                    {metresResults > 0 ? metresResults : "Unknown"} metres
                </p>
            </div>

            <div className={`${metricResultsVisible || imperialResultsVisible ? 'results__info' : 'hidden'}`}>
                <a
                    href={
                        metricResultsVisible
                            ? `/bmi-calculator?metres=${metresResults}&type=metric`
                            : `/bmi-calculator?feet=${feetResults}&inches=${inchesResults}&type=imperial`
                    }
                    className={"results__info-link"}
                >
                    Use this to find out your <span className={"results__info-span"}>BMI</span>
                </a>
            </div>

            <div className={"main__footer"}>
                <Footer/>
            </div>
        </div>
    );
};

export default HeightConverter;