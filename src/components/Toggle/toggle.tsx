import React from 'react';
import './toggle.css';

const SlidingToggle = (props: {
    toggleTrue?: boolean;
    handleLogic?:  React.MouseEventHandler<HTMLDivElement>;
    stringToggle?: string;
}) => {

    return (
        <div className={`sliding-toggle ${props.toggleTrue ? 'toggled' : '' || props.stringToggle === 'metric' ? 'toggled' : ''}`} onClick={props.handleLogic}>
            <div className="sliding-track">
                <div className="sliding-thumb"></div>
            </div>
        </div>
    );
};

export default SlidingToggle;