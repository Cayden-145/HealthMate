import React, {useState} from 'react';
import './style.css'
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import Toggle from "react-toggle";

const WeightConvert = () => {
    const [kilograms, setKilograms] = useState<number>(-1);
    const [stone, setStone] = useState<number>(-1);
    const [pounds, setPounds] = useState<number>(-1);

    const [imperialToMetric, setImperialToMetric] = useState<boolean>(true);
    const [metricToImperial, setMetricToImperial] = useState<boolean>(false);

    const [stoneError, setStoneError] = useState<boolean>(false);
    const [poundsError, setPoundsError] = useState<boolean>(false);
    const [kilogramsError, setKilogramsError] = useState<boolean>(false);

    const [kilogramsResults, setKilogramsResults] = useState<number | string>('Unknown');
    const [poundsResults, setPoundsResults] = useState<number | string>('Unknown');
    const [stoneResults, setStoneResults] = useState<number | string>('Unknown');

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

    const stoneInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const inputValue: string = event.target.value.trim();
        const parsedValue: number = inputValue === '' || isNaN(parseFloat(inputValue)) ? -1 : parseFloat(inputValue);
        setStone(parsedValue >= 0 && parsedValue <= 100 ? parsedValue : -1);
    };

    const poundsInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const inputValue: string = event.target.value.trim();
        const parsedValue: number = inputValue === '' || isNaN(parseFloat(inputValue)) ? -1 : parseFloat(inputValue);
        setPounds(parsedValue >= 0 && parsedValue <= 15 ? parsedValue : -1);
    };

    const kilogramsInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const inputValue: string = event.target.value.trim();
        const parsedValue: number = inputValue === '' || isNaN(parseFloat(inputValue)) ? -1 : parseFloat(inputValue);
        setKilograms(parsedValue >= 0 && parsedValue <= 200 ? parsedValue : -1);
    };

    const calculate = () => {
        setPoundsError(false);
        setKilogramsError(false);
        setStoneError(false);
        setMetricResultsVisible(false);
        setImperialResultsVisible(false);

        if (imperialToMetric) {
            if (stone <= -1 || pounds <= -1) {
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

        if (metricToImperial) {
            if (kilograms <= -1) {
                if (kilograms <= -1) {
                    setKilogramsError(true);
                } else {
                    setKilogramsError(false);
                }

                return;
            }
        }

        if (imperialToMetric) {
            const results = (stone * 6.35029) + (pounds * 0.453592)

            setKilogramsResults(results.toFixed(2));

            setMetricResultsVisible(true);
        }

        if (metricToImperial) {
            const stone = Math.floor(kilograms / 6.35029);
            const remainingPounds = (kilograms % 6.35029) / 0.453592;
            const pounds = Math.round(remainingPounds);

            setStoneResults(stone);
            setPoundsResults(pounds);

            setImperialResultsVisible(true);
        }
    };

    const reset = () => {
        setKilograms(-1);
        setPounds(-1);
        setStone(-1);
        setKilogramsResults('Unknown');
        setPoundsResults('Unknown');
        setStoneResults('Unknown');

        setStoneError(false);
        setKilogramsError(false);
        setPoundsError(false);
        setMetricResultsVisible(false);
        setImperialResultsVisible(false);
    };

    return (
        <div className={"main"}>
            <Header imageSRC={"height.png"} headerTITLE={"Weight Converter"} altTAG={"logo"}/>

            <div className={"main__link-container"}>
                <a href={"/"} className={"main__link-a"}>
                    Home
                </a>

                <a href={"/bmi-calculator"} className={"main__link-a"}>
                    BMI Calculator
                </a>

                <a href={"/height-converter"} className={"main__link-a"}>
                    Height Converter
                </a>
            </div>

            <div className={"errors"}>
                <p>
                    {kilogramsError ? "* You must enter a valid amount of kilograms." : ""}
                </p>

                <p>
                    {poundsError ? "* You must enter a valid amount of pounds." : ""}
                </p>

                <p>
                    {stoneError ? "* You must enter a valid amount of stone." : ""}
                </p>
            </div>

            <div className={"toggle"}>
                <Toggle
                    type={"checkbox"}
                    checked={imperialToMetric}
                    onChange={handleImperialToggle}
                    className={"toggle__checkbox"}
                />

                <button
                    className={"toggle__text"}
                    onClick={handleImperialToggle}>
                        <span style={{fontWeight: imperialToMetric ? 'bold' : 'normal'}}>
                          Imperial
                        </span>
                </button>

                <Toggle
                    type={"checkbox"}
                    checked={metricToImperial}
                    onChange={handleMetricToggle}
                    className={"toggle__checkbox"}
                />

                <button
                    className={"toggle__text"}
                    onClick={handleMetricToggle}>
                        <span style={{fontWeight: metricToImperial ? 'bold' : 'normal'}}>
                          Metric
                        </span>
                </button>
            </div>

            <div className={`${imperialToMetric ? 'fields' : 'hidden'}`}>
                <p className={"fields__text"}>
                    Weight:
                </p>

                <input
                    type={"numeric"}
                    value={stone === -1 ? '' : stone}
                    onChange={stoneInputChange}
                    className={"fields__input"}
                />

                <p className={"fields__text"}>
                    st
                </p>

                <input
                    type={"numeric"}
                    value={pounds === -1 ? '' : pounds}
                    onChange={poundsInputChange}
                    className={"fields__input"}
                />

                <p className={"fields__text"}>
                    lbs
                </p>
            </div>

            <div className={`${metricToImperial ? 'fields' : 'hidden'}`}>
                <p className={"fields__text"}>
                    Weight:
                </p>

                <input
                    type={"number"}
                    value={kilograms === -1 ? '' : kilograms}
                    onChange={kilogramsInputChange}
                    className={"fields__input"}
                />

                <p className={"fields__text"}>
                    kg
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

            <div className={`${imperialResultsVisible ? 'results' : 'hidden'}`}>
                <p className={"results__text"}>
                    Your weight is: <br/>
                </p>

                <p className={"results__text-two"}>
                    {stoneResults > 0 ? `${stoneResults} st` : "Unknown"}
                </p>

                <p className={"results__text-two"}>
                    {poundsResults > 0 ? `${poundsResults} lbs` : "Unknown"}
                </p>
            </div>

            <div className={`${metricResultsVisible ? 'results' : 'hidden'}`}>
                <p className={"results__text"}>
                    Your weight is: <br/>
                </p>

                <p className={"results__text-two"}>
                    {kilogramsResults > 0 ? kilogramsResults : "Unknown"} kg
                </p>
            </div>

            <div className={`${metricResultsVisible || imperialResultsVisible ? 'results__info' : 'hidden'}`}>
                <a href={"/bmi-calculator"} className={"results__info-link"}>
                    Use this to find out your <span className={"results__info-span"}>BMI</span>
                </a>
            </div>

            <div className={"main__footer"}>
                <Footer/>
            </div>
        </div>
    );
};

export default WeightConvert;