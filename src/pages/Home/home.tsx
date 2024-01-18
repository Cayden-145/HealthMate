import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Header from "../../components/Header/header";
import './home.css';
import Footer from "../../components/Footer/footer";

const Home = () => {

    return (
        <div className={"home"}>
            <Header />

            <div className={"about"}>
                <div className={"bio__paragraph-container"}>
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
                </div>

                <div className={"offer__title-container"}>
                    <p className={"bio__paragraph-offer"}>
                        What we offer:
                    </p>
                </div>

                <div className={"total-container"}>
                    <div className={"offer__paragraph-container"}>
                        <p className={"bio__offers-last"}>
                            <span className={"bio__title"}>
                                &#8226; BMI Calculator
                            </span>
                            Effortlessly evaluate your BMI with our powerful calculator.
                            Input your height and weight, and HealthMate delivers precise results, offering a valuable gauge of overall health and aiding in the
                            establishment of realistic fitness goals.
                        </p>
                    </div>

                    <div className={"offer__paragraph-container"}>
                        <p className={"bio__offers-last"}>
                            <span className={"bio__title"}>
                                &#8226; Height Converter
                            </span>
                            Need to switch between different units of height?
                            HealthMate's height converter ensures seamless transitions between feet & inches to metres.
                            No more confusion or miscalculations - effortlessly compare and track your height in the
                            units
                            that suit you the best.
                        </p>
                    </div>

                    <div className={"offer__paragraph-container"}>
                        <p className={"bio__offers-last"}>
                            <span className={"bio__title"}>
                                &#8226; Weight Converter
                            </span>
                            Track your progress effortlessly with HealthMate's weight converter,
                            whether in kilograms or pounds & stones. Simplify the conversion process, ensuring seamless monitoring of your
                            fitness journey without the need for manual calculations.
                        </p>
                    </div>
                </div>

                <div className="divider"></div>

                <div className={"offer__title-container"}>
                    <p className={"bio__paragraph-offer"}>
                        Key Features:
                    </p>
                </div>

                <div className={"total-container-list"}>
                    <ul className={"bio__paragraph-list"}>
                        <li className={"bio__list-last"}>
                            <span className={"bio__list-title"}>
                                User-Friendly Interface:
                            </span>
                            {' '}
                            <br/>
                            HealthMate boasts an intuitive and user-friendly design,
                            making health monitoring accessible to everyone.
                        </li>

                        <li className={"bio__list-last"}>
                            <span className={"bio__list-title"}>
                                Personalized Insights:
                            </span>
                            {' '}
                            Receive personalized insights
                            based on your BMI, height, and weight data, helping you make
                            informed decisions about your health and fitness.
                        </li>

                        <li className={"bio__list-last"}>
                            <span className={"bio__list-title"}>
                                Progress Tracking:
                            </span>
                            {' '}
                            Effortlessly track and preserve your health journey with our comprehensive feature.
                            Securely store and monitor weight, BMI, and height in your account, enhancing fitness progress.
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
                </div>

                <div className="divider"></div>

                <div className={"offer__title-container-last"}>
                    <p className={"bio__paragraph-offer"}>
                        Why Choose HealthMate?
                    </p>
                </div>

                <ul className={"bio__paragraph-list__choosing"}>
                    <li className={"bio__list-last"}>
                        <span className={"bio__list-title"}>
                            Comprehensive Health Monitoring:
                        </span>
                        {' '}
                        HealthMate goes beyond the basics,
                        offering a suite of tools for a holistic approach to health management.
                    </li>

                    <li className={"bio__list-last"}>
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