import React from 'react';
import Header from "../../components/Header/header";
import './home.css';
import Footer from "../../components/Footer/footer";

const Home = () => {
    return (
        <div className={"home"}>
            <Header headerTITLE={"Home"} altTAG={"home img"} />

            <div className={"about"}>
                <p className={"bio__paragraph"}>
                    <span className={"bio__paragraph-title"}>
                        Introducing HealthMate.
                    </span>
                    <br/>
                    Your comprehensive health companion
                    designed to empower you on your wellness journey.
                    Whether you're striving for fitness goals, monitoring your health,
                    or simply making lifestyle changes, HealthMate is here to support you every step of the way.
                </p>

                <div className="divider"></div>

                <p className={"bio__paragraph-offer"}>
                    What we offer:
                </p>

                <p className={"bio__offers"}>
                    <span className={"bio__title"}>
                        &#8226; BMI Calculator
                    </span>
                    Our BMI calculator is a powerful tool that helps you assess your body mass index effortlessly.
                    Simply input your height and weight, and HealthMate will provide you with an accurate BMI reading.
                    This information serves as a valuable indicator of your overall health and aids in setting realistic
                    fitness targets.
                </p>

                <p className={"bio__offers"}>
                    <span className={"bio__title"}>
                        &#8226; Height Converter
                    </span>
                    Need to switch between different units of height?
                    HealthMate's height converter ensures seamless transitions between feet & inches to metres.
                    No more confusion or miscalculations - effortlessly compare and track your height in the units
                    that suit you the best.
                </p>

                <p className={"bio__offers-last"}>
                    <span className={"bio__title"}>
                        &#8226; Weight Converter
                    </span>
                    Whether you're tracking your progress in kilograms, pounds & stones,
                    HealthMate's weight converter simplifies the process.
                    Convert your weight effortlessly and stay on top of your fitness journey without the hassle of
                    manual calculations.
                </p>

                <img
                    src={`${process.env.PUBLIC_URL}/heartLogo.png`}
                    alt={"heart"}
                    className={"bio__image"}
                />

                <div className="divider"></div>

                <p className={"bio__paragraph-features"}>
                    Key Features:
                </p>

                <ul className={"bio__paragraph-list"}>
                    <li className={"bio__list"}>
                        <span className={"bio__list-title"}>
                            User-Friendly Interface:
                        </span>
                        {' '}
                        HealthMate boasts an intuitive and user-friendly design,
                        making health monitoring accessible to everyone.
                    </li>

                    <li className={"bio__list"}>
                        <span className={"bio__list-title"}>
                            Personalized Insights:
                        </span>
                        {' '}
                        Receive personalized insights
                        based on your BMI, height, and weight data, helping you make
                        informed decisions about your health and fitness.
                    </li>

                    <li className={"bio__list"}>
                        <span className={"bio__list-title"}>
                            Progress Tracking:
                        </span>
                        {' '}
                        Monitor your progress over time with easy-to-read charts and graphs,
                        allowing you to celebrate achievements and stay motivated.
                    </li>

                    <li className={"bio__list-last"}>
                        <span className={"bio__list-title"}>
                            Goal Setting:
                        </span>
                        {' '}
                        Set realistic health and fitness goals with the help of HealthMate,
                        and let the app guide you towards achieving them.
                    </li>
                </ul>

                <img
                    src={`${process.env.PUBLIC_URL}/layout.png`}
                    alt={"layout"}
                    className={"bio__image"}
                />

                <div className="divider"></div>

                <p className={"bio__paragraph-offer"}>
                    Why Choose HealthMate?
                </p>

                <ul className={"bio__paragraph-list"}>
                    <li className={"bio__list"}>
                        <span className={"bio__list-title"}>
                            Comprehensive Health Monitoring:
                        </span>
                        {' '}
                        HealthMate goes beyond the basics,
                        offering a suite of tools for a holistic approach to health management.
                    </li>

                    <li className={"bio__list"}>
                        <span className={"bio__list-title"}>
                            Privacy and Security:
                        </span>
                        {' '}
                        Your health data is personal, and we take your privacy seriously.
                        HealthMate employs robust security measures to ensure your information remains confidential.
                    </li>

                    <li className={"bio__list-last"}>
                        <span className={"bio__list-title"}>
                            Accessible Anywhere, Anytime:
                        </span>
                        {' '}
                        Whether you're at home or on the go, HealthMate is accessible from your smartphone,
                        making it easy to track your health no matter where life takes you.
                    </li>
                </ul>

                <img
                    src={`${process.env.PUBLIC_URL}/whyChoose.png`}
                    alt={"features"}
                    className={"bio__image"}
                />

                <div className={"divider"}></div>

                <p className={"home__download-text"}>
                    Checkout HealthMate today and embark on a journey towards a healthier, happier you.
                    Your well-being is our priority, and HealthMate is here to
                    guide you towards a lifestyle that promotes vitality and longevity.
                </p>

                <Footer/>

            </div>
        </div>
    );
};

export default Home;