import React from 'react';
import './style.css'
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";

const HeightConverter = () => {
    return (
        <div className={"main"}>
            <Header imageSRC={"height.png"} headerTITLE={"Height Converter"} altTAG={"logo"}/>

            <div className={"main__link-container"}>
                <a href={"/"} className={"main__link-a"}>
                    Home
                </a>

                <a href={"/bmi-calculator"} className={"main__link-a"}>
                    BMI Calculator
                </a>

                <a href={"/weight-converter"} className={"main__link-a"}>
                    Weight Converter
                </a>
            </div>

            <div className={"main__footer"}>
                <Footer/>
            </div>
        </div>
    );
};

export default HeightConverter;