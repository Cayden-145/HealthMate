import React from 'react';
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";

const WeightConvert = () => {
    return (
        <div className={"main"}>
            <Header imageSRC={"weight.png"} headerTITLE={"Weight Converter"} altTAG={"logo"}/>

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

            <div className={"main__footer"}>
                <Footer/>
            </div>
        </div>
    );
};

export default WeightConvert;