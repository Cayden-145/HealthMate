import React from 'react';
import './styles.css';

const UnsupportedDevice = () => {
    return (
        <div className="unsupported-device-container">
            <h1>Device Not Supported</h1>
            <p>We're sorry, but your current device is not supported. Please use a desktop or tablet to access this
                website.</p>
        </div>
    );
};

export default UnsupportedDevice;