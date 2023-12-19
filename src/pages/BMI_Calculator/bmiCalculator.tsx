import React, { useState } from 'react';
import './style.css';
import Toggle from "react-toggle";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";

const BMICalculator = () => {
    const [height, setHeight] = useState<number>(-1);
    const [inches, setInches] = useState<number>(-1);
    const [stone, setStone] = useState<number>(-1);
    const [pounds, setPounds] = useState<number>(-1);
    const [kilograms, setKilograms] = useState<number>(-1);
    const [metres, setMetres] = useState<number>(-1);

    const [results, setResults] = useState<number | string>('Unknown');
    const [range, setRange] = useState<string>("")
    const [isWeightVisible, setIsWeightVisible] = useState<boolean>(false);
    const [isBMIVisible, setisBMIVisible] = useState<boolean>(false);

    const [heightError, setHeightError] = useState<boolean>(false);
    const [inchesError, setInchesError] = useState<boolean>(false);
    const [stoneError, setStoneError] = useState<boolean>(false);
    const [poundsError, setPoundsError] = useState<boolean>(false);
    const [metresError, setMetresError] = useState<boolean>(false);
    const [kilogramsError, setKilogramsError] = useState<boolean>(false);

    const [imperialToggle, setImperialToggle] = useState<boolean>(true);
    const [metricToggle, setMetricToggle] = useState<boolean>(false);

    const handleImperialToggle = () => {
        setImperialToggle(!imperialToggle);

        if (metricToggle) {
            setMetricToggle(false);
        }
    };

    const handleMetricToggle = () => {
        setMetricToggle(!metricToggle)

        if (imperialToggle) {
            setImperialToggle(false);
        }
    };

    const heightInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const inputValue: string = event.target.value.trim();
        const parsedValue: number = inputValue === '' || isNaN(parseFloat(inputValue)) ? -1 : parseFloat(inputValue);
        setHeight(parsedValue >= 0 && parsedValue <= 11 ? parsedValue : -1);
    };

    const inchesInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const inputValue: string = event.target.value.trim();
        const parsedValue: number = inputValue === '' || isNaN(parseFloat(inputValue)) ? -1 : parseFloat(inputValue);
        setInches(parsedValue >= 0 && parsedValue <= 11 ? parsedValue : -1);
    };

    const stoneInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const inputValue: string = event.target.value.trim();
        const parsedValue: number = inputValue === '' || isNaN(parseFloat(inputValue)) ? -1 : parseFloat(inputValue);
        setStone(parsedValue > 0 && parsedValue <= 30 ? parsedValue : -1);
    };

    const poundsInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const inputValue: string = event.target.value.trim();
        const parsedValue: number = inputValue === '' || isNaN(parseFloat(inputValue)) ? -1 : parseFloat(inputValue);
        setPounds(parsedValue >= 0 && parsedValue <= 14 ? parsedValue : -1);
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
        const parsedValue: number = inputValue === '' || isNaN(parseFloat(inputValue)) ? -1 : parseFloat(inputValue);
        setKilograms(parsedValue > 0 && parsedValue <= 150 ? parsedValue : -1);
    };

    const calculate = () => {
        setHeightError(false);
        setInchesError(false);
        setStoneError(false);
        setPoundsError(false);
        setKilogramsError(false);
        setMetresError(false);

        if (imperialToggle) {
            if (height <= -1 || inches <= -1 || stone <= -1 || pounds <= -1) {
                if (height <= -1) {
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

                // alert("All values must be above 0.")

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

                // alert("All values must be above 0.")

                return;
            }
        }

        if (imperialToggle) {
            let height_in_inches: number = (height * 12) + inches;
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

            setIsWeightVisible(true);
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

            setIsWeightVisible(true);
            setisBMIVisible(true);
        }
    }

    const reset = () => {
        setHeight(-1);
        setInches(-1);
        setStone(-1);
        setPounds(-1);
        setMetres(-1);
        setKilograms(-1);
        setResults('Unknown');
        setRange("");
        setIsWeightVisible(false);
        setisBMIVisible(false);

        setHeightError(false);
        setInchesError(false);
        setStoneError(false);
        setPoundsError(false);
        setKilogramsError(false);
        setMetresError(false);
    }

    return (
        <div className={"app"}>
            <Header imageSRC={"logo_bmi.png"} altTAG={"bmi"} headerTITLE={"BMI Calculator"}/>

            <div className={"header__link-container"}>
                <a href={"/"} className={"header__link-a"}>
                    Home
                </a>

                <a href={"/height-converter"} className={"header__link-a"}>
                    Height Converter
                </a>

                <a href={"/weight-converter"} className={"header__link-a"}>
                    Weight Converter
                </a>
            </div>

            <div className={"errors"}>
                <p>
                    {heightError ? "* You must enter a valid amount of feet." : ""}
                </p>

                <p>
                    {inchesError ? "* You must enter a valid amount of inches." : ""}
                </p>

                <p>
                    {stoneError ? "* You must enter a valid amount of stones." : ""}
                </p>

                <p>
                    {poundsError ? "* You must enter a valid amount of pounds." : ""}
                </p>

                <p>
                    {kilogramsError ? "* You must enter a valid amount of kilograms." : ""}
                </p>

                <p>
                    {metresError ? "* You must enter a valid amount of metres." : ""}
                </p>
            </div>

            <div className={"toggle"}>
                <Toggle
                    type={"checkbox"}
                    checked={imperialToggle}
                    onChange={handleImperialToggle}
                    className={"toggle__checkbox"}
                />

                <button
                    className={"toggle__text"}
                    onClick={handleImperialToggle}>
                        <span style={{fontWeight: imperialToggle ? 'bold' : 'normal'}}>
                          Imperial
                        </span>
                </button>

                <Toggle
                    type={"checkbox"}
                    checked={metricToggle}
                    onChange={handleMetricToggle}
                    className={"toggle__checkbox"}
                />

                <button
                    className={"toggle__text"}
                    onClick={handleMetricToggle}>
                        <span style={{fontWeight: metricToggle ? 'bold' : 'normal'}}>
                          Metric
                        </span>
                </button>
            </div>

            <div className={`${imperialToggle ? 'fields' : 'hidden'}`}>

                <p className={"fields__text"}>
                    Height:
                </p>

                <input
                    type={"numeric"}
                    id={"heightInput"}
                    value={height === -1 ? '' : height}
                    onChange={heightInputChange}
                    className={"fields__input"}
                />

                <p className={"fields__text"}>
                    ft
                </p>

                <input
                    type={"numeric"}
                    id={"inchesInput"}
                    value={inches === -1 ? '' : inches}
                    onChange={inchesInputChange}
                    className={"fields__input"}
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
                    id={"heightInput"}
                    value={stone === -1 ? '' : stone}
                    onChange={stoneInputChange}
                    className={"fields__input"}
                />

                <p className={"fields__text"}>
                    st
                </p>

                <input
                    type={"numeric"}
                    id={"inchesInput"}
                    value={pounds === -1 ? '' : pounds}
                    onChange={poundsInputChange}
                    className={"fields__input"}
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
                    className={"fields__input"}
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
                    type={"numeric"}
                    id={"heightInput"}
                    value={kilograms === -1 ? '' : kilograms}
                    onChange={kilogramsInputChange}
                    className={"fields__input"}
                />

                <p className={"fields__text"}>
                    kilograms
                </p>

            </div>

            <div className={"buttons"}>
                <button
                    className={"buttons__submit"}
                    type={"submit"}
                    onClick={calculate}
                >
                    Calculate
                </button>

                <button
                    className={"buttons__reset"}
                    onClick={reset}
                >
                    Reset
                </button>
            </div>

            <div className={`${isBMIVisible ? 'results' : 'hidden'}`}>
                <p>
                    Your BMI is:
                </p>

                <p className={"results__text"}>
                    {results > 0 ? results : "unknown"}
                </p>
            </div>

            <div className={"information"}>
                <p className={"information__text"}>
                  <span>
                      <span style={{textDecoration: 'underline'}}>
                        BMI weight ranges:
                      </span>
                      <br/>

                      <span style={{fontWeight: range === 'Underweight' ? 'bold' : 'normal'}}>
                        Less than 18.5 = Underweight
                      </span>
                                <br/>
                      <span style={{fontWeight: range === 'Healthy Weight' ? 'bold' : 'normal'}}>
                        Between 18.5 - 24.9 = Healthy Weight
                      </span>
                                <br/>
                      <span style={{fontWeight: range === 'Overweight' ? 'bold' : 'normal'}}>
                          Between 25 - 29.9 = Overweight
                      </span>

                                <br/>
                      <span
                          style={{fontWeight: range === 'Obese' ? 'bold' : 'normal'}}
                      >
                          Over 30 = Obese
                      </span>
                  </span>
                </p>
            </div>

            <div className={`${isWeightVisible ? 'weight' : 'hidden'}`}>
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
    );
}

export default BMICalculator;