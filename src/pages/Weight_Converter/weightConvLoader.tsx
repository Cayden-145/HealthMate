import React, { lazy, Suspense } from 'react';
import './style.css'

const WeightConvertLazy = lazy(() => import('./weightConvert'));
const WeightConvLazy = () => {
    return (
        <Suspense>
            <WeightConvertLazy />
        </Suspense>
    );
};

export default WeightConvLazy;