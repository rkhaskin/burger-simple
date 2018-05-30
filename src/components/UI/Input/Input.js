import React from 'react';
import classes from './Input.css';

const Input = (props) => {
    let inputElement = null;
    // separate inputType prop into a separate variable. We cannot pass inputType property into <input, as it does not know what it is when inputType is spelled
    // with uppercase T. One of the solutions is to rename it to inputtype here and from where it is passed
    //const { inputType, ...rest } = props;

    // check the new inputType const
    //switch (inputType) {

    let validationError = null
    const inputClasses = [classes.InputElement];
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);

        validationError = <p className={classes.ValidationError}>Please enter a valid {props.propertyName}</p>;

    }

    switch (props.elementType) {
        case ('input'):
            // pass ...rest without inputType
            //            inputElement = <input className={classes.InputElement} {...rest}/>
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />
            break;
        case ('textarea'):
            inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />
            break;
        case ('select'):
            inputElement = <select
                className={inputClasses.join(' ')}
                value={props.value} onChange={props.changed}>
                {
                    props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value} onChange={props.changed}>{option.displayValue}</option>
                    ))};
    
                }
            </select>

            break;
        default:
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />

    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>

    );
}


export default Input;