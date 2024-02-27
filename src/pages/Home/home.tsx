import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Header from "../../components/Header/header";
import './home.css';
import Footer from "../../components/Footer/footer";

const Home = () => {

    return (
        <>
            <Header />

            <div className={"home"}>
                <div className={"home__title--content"}>
                    <p className={"home__title--introduction"}>
                        Introducing <span className={"home__title--span"}>HealthMate</span>
                    </p>
                </div>

                <div className={"home__memo--container"}>
                    <p className={"home__memo--paragraph"}>
                        <span>Your personal health companion, helping you every step of the way.</span> <br/>
                        HealthMate is designed to help everyone achieve a healthy lifestyle. <br/>
                    </p>
                </div>

                <div className={"home__buttons--container"}>
                    <a className={"home__buttons--full"} href={"/signup"}>
                        Join Today
                    </a>

                    <a className={"home__buttons--semi"} href={"/bmi-calculator"}>
                        Calculate BMI
                    </a>
                </div>

                <div className={"home__offers"}>
                    <p className={"home__offers--title"}>
                        What we offer
                    </p>

                    <p className={"home__offers--description"}>
                        HealthMate comes packed with features to help you with your journey to a healthy
                        lifestyle! <br/>
                        We offer top of the line health tracking features, to ensure you a stress-free experience.
                    </p>
                </div>

                <div className={"home__grid--container"}>
                    <p className={"home__grid--title"}>
                        HealthMate V1.6.5
                    </p>
                    <div className={"home__offers--grid"}>
                        <div className={"grid__item--container"}>
                            <div className={"grid__title--container"}>
                                <img src={"/calculator.png"} alt={"bmi-calculator"} aria-label={"BMI Calculator"}
                                     className={"grid__item--image"}/>
                                <p className={"grid__item--title"}>
                                    BMI Calculator
                                </p>
                            </div>

                            <p className={"grid__item--description"}>
                                Use our BMI calculator to quickly assess your body mass index.
                                HealthMate provides precise results, helping you gauge overall health and set realistic
                                fitness goals.
                            </p>
                        </div>

                        <div className={"grid__item--container"}>
                            <div className={"grid__title--container"}>
                                <img src={"/height.png"} alt={"bmi-calculator"} aria-label={"BMI Calculator"}
                                     className={"grid__item--image"}/>
                                <p className={"grid__item--title"}>
                                    Height Converter
                                </p>
                            </div>

                            <p className={"grid__item--description"}>
                                HealthMate offers an easy height converter, to eliminate confusion!
                                Our height converter ensures a seamless transition between feet & inches to metres!
                            </p>
                        </div>

                        <div className={"grid__item--container"}>
                            <div className={"grid__title--container"}>
                                <img src={"/scale.png"} alt={"bmi-calculator"} aria-label={"BMI Calculator"}
                                     className={"grid__item--image"}/>

                                <p className={"grid__item--title"}>
                                    Weight Converter
                                </p>
                            </div>

                            <p className={"grid__item--description"}>
                                Using our weight converter helps eliminate confusion!
                                We have built the weight converter with simplicity and ease of use in mind to ensure a
                                seamless transition.
                            </p>
                        </div>

                        <div className={"grid__item--container"}>
                            <div className={"grid__title--container"}>
                                <img src={"/flag.png"} alt={"bmi-calculator"} aria-label={"BMI Calculator"}
                                     className={"grid__item--image"}/>

                                <p className={"grid__item--title"}>
                                    Goal Setting
                                </p>
                            </div>

                            <p className={"grid__item--description"}>
                                Set realistic health goals with the help of HealthMate.
                                With the help of HealthMate, you can easily achieve your goal in no time!
                            </p>
                        </div>

                        <div className={"grid__item--container"}>
                            <div className={"grid__title--container"}>
                                <img src={"/track.png"} alt={"bmi-calculator"} aria-label={"BMI Calculator"}
                                     className={"grid__item--image"}/>

                                <p className={"grid__item--title"}>
                                    Progress Tracking
                                </p>
                            </div>

                            <p className={"grid__item--description"}>
                                Effortlessly track your health journey with our comprehensive feature.
                                Securely store and monitor your weight, BMI and height in your account, enhancing
                                fitness progress.
                            </p>
                        </div>

                        <div className={"grid__item--container"}>
                            <div className={"grid__title--container"}>
                                <img src={"/uix.png"} alt={"bmi-calculator"} aria-label={"BMI Calculator"}
                                     className={"grid__item--image"}/>

                                <p className={"grid__item--title"}>
                                    Dashboard
                                </p>
                            </div>

                            <p className={"grid__item--description"}>
                                Using our comprehensive dashboard allows you to track your progress clearly,
                                and receive personalised insights based on your BMI, height and weight data.
                            </p>
                        </div>
                    </div>
                </div>

                <div className={"home__choose--total"}>
                    <p className={"home__choose--title"}>
                        Why Choose HealthMate?
                    </p>

                    <div className={"home__choose--container"}>
                        <div className={"home__choose--grid"}>
                            <div className={"home__choose--grid-container"}>
                                <div className={"home__choose--grid-title"}>
                                    <img src={"/private.png"} alt={"bmi-calculator"} aria-label={"BMI Calculator"}
                                         className={"grid__item--image"}/>
                                    <p className={"grid__item--title"}>
                                        Privacy & Security
                                    </p>
                                </div>

                                <p className={"home__choose--grid-description"}>
                                    Your health data is personal, and we take your privacy seriously.
                                    HealthMate employs robust security measures to ensure your information remains
                                    confidential.
                                </p>
                            </div>
                        </div>

                        <div className={"home__choose--grid"}>
                            <div className={"home__choose--grid-container"}>
                                <div className={"home__choose--grid-title-two"}>
                                    <img src={"/globe.png"} alt={"bmi-calculator"} aria-label={"BMI Calculator"}
                                         className={"grid__item--image"}/>
                                    <p className={"grid__item--title"}>
                                        Accessibility
                                    </p>
                                </div>

                                <p className={"home__choose--grid-description"}>
                                    Whether you're at home or on the go, HealthMate is accessible from your smartphone,
                                    making it easy to track your health no matter where life takes you.
                                </p>
                            </div>
                        </div>

                        <div className={"home__choose--grid"}>
                            <div className={"home__choose--grid-container"}>
                                <div className={"home__choose--grid-title"}>
                                    <img src={"/search.png"} alt={"bmi-calculator"} aria-label={"BMI Calculator"}
                                         className={"grid__item--image"}/>
                                    <p className={"grid__item--title"}>
                                        Personalisation
                                    </p>
                                </div>

                                <p className={"home__choose--grid-description"}>
                                    Using our comprehensive dashboard, you receive
                                    personalised insights based on your saved data, further assisting you
                                    on your weight loss journey!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"home__bottom--container"}>
                    <p className={"home__bottom--last"}>
                        Checkout HealthMate today and embark on a journey towards a healthier, happier you.
                        Your well-being is our priority, and HealthMate is here to guide you towards a lifestyle that
                        promotes vitality and longevity.
                    </p>
                </div>
            </div>

            <Footer/>
        </>
    );
};

export default Home;