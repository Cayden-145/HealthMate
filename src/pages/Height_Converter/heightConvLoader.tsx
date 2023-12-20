import React, { lazy, Suspense } from 'react';
import './style.css'

const HeightConvLazy = lazy(() => import('./heightConvert'));
const HeightConvLoader = () => {
    return (
        <Suspense>
            <HeightConvLazy />
        </Suspense>
    );
};

export default HeightConvLoader;