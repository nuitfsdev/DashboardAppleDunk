
import React, { useState } from 'react';
import classes from './input.module.scss';

function Input(inpDetails) {
    const [focus, setFocus] = useState(false);
    const { lable, onChange, type, errorMsg, ...detail } = inpDetails;

    const handleBlur = () => {
        setFocus(true);
    };

    return (
        <div className={classes.input_component}>
            <label className={classes.form__label}>{lable}</label>
            <input
                className={classes.input_field}
                {...detail}
                onChange={onChange}
                onBlur={handleBlur}
                onFocus={() => detail.name === 'password' && setFocus(true)}
                focused={focus.toString()}
                type={type}
            />
            <span>{errorMsg}</span>
        </div>
    );
}

export default Input;
