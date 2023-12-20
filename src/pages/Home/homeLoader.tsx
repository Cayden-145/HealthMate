import React, { lazy, Suspense } from 'react';
import './home.css'

const HomeLazy = lazy(() => import('./home'));
const HomeLoader = () => {
    return (
        <Suspense>
            <HomeLazy />
        </Suspense>
    );
};

export default HomeLoader;