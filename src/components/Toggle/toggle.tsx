import React from 'react';
import './toggle.css';

const SlidingToggle = (props: {
    toggleTrue?: boolean;
    handleLogic?:  React.MouseEventHandler<HTMLDivElement>;
}) => {

    return (
        <div className={`sliding-toggle ${props.toggleTrue ? 'toggled' : ''}`} onClick={props.handleLogic}>
            <div className="sliding-track">
                <div className="sliding-thumb"></div>
            </div>
        </div>
    );
};

export default SlidingToggle;