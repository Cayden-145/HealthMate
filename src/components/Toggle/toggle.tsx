import React from 'react';
import './toggle.css';

const SlidingToggle = (props: {
    toggleTrue?: boolean;
    handleLogic?:  React.MouseEventHandler<HTMLDivElement>;
}) => {
    // const [isToggled, setIsToggled] = useState(false);

    // const handleToggle = () => {
    //     setIsToggled(!isToggled);
    //     props.toggleTrue(!isToggled);
    // };

    return (
        <div className={`sliding-toggle ${props.toggleTrue ? 'toggled' : ''}`} onClick={props.handleLogic}>
            <div className="sliding-track">
                <div className="sliding-thumb"></div>
            </div>
        </div>
    );
};

export default SlidingToggle;