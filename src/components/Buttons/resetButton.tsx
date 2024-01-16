import React, {MouseEventHandler} from 'react';
import './style.css';

const ResetButton = (props: {
    onClick: MouseEventHandler<HTMLButtonElement>
    title: string
}) => {
    return (
        <div className={"buttons"}>
            <button
                className={"buttons__reset"}
                onClick={props.onClick}
            >
                {props.title}
            </button>
        </div>
    );
};

export default ResetButton;