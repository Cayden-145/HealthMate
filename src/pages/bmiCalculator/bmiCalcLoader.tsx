import React, { lazy, Suspense } from 'react';
import './style.css'

const BMICalculatorLazy = lazy(() => import('./bmiCalculator'));
const BmiCalcLoader = () => {
    return (
        <Suspense>
            <BMICalculatorLazy />
        </Suspense>
    );
};

export default BmiCalcLoader;