import React, {MouseEventHandler} from 'react';
import './style.css';

const SubmitButton = (
    props: {
        onClick?: MouseEventHandler<HTMLButtonElement>
        title: string
    }) => {
    return (
        <div className={"buttons"}>
            <button
                className={"buttons__submit"}
                onClick={props.onClick}
            >
                {props.title}
            </button>
        </div>
    );
};

export default SubmitButton;