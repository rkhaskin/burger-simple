import React from 'react';
import classes from './Input.css';

const Input = (props) => {
    let inputElement = null;
    // separate inputType prop into a separate variable. We cannot pass inputType property into <input, as it does not know what it is when inputType is spelled
    // with uppercase T. One of the solutions is to rename it to inputtype here and from where it is passed
    //const { inputType, ...rest } = props;

    // check the new inputType const
    //switch (inputType) {
      switch (props.elementType) {  
        case ('input'):
            // pass ...rest without inputType
//            inputElement = <input className={classes.InputElement} {...rest}/>
            inputElement = <input className={classes.InputElement} {...props.elementConfig} value={props.value}/>
            break;
        case ('textarea'):
            inputElement = <textarea className={classes.InputElement} {...props.elementConfig} value={props.value}/>
            break;
        case ('select'):
            inputElement = <select 
            className={classes.InputElement} 
            value={props.value}>
            {
                props.elementConfig.options.map(option => (
                <option key={option.value} value={option.value}>{option.displayValue}</option>
            ))};

            }
            </select>
            
            break;    
        default:
            inputElement = <input className={classes.InputElement} {...props.elementConfig} value={props.value}/>

    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>

    );
}


export default Input;