import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: "Salad", type:"salad"},
  {label: "Bacon", type:"bacon"},
  {label: "Cheese", type:"cheese"},
  {label: "Meat", type:"meat"}
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p><strong>Total price is {props.price.toFixed(2)}</strong></p>
    {controls.map((ctrl) => (
      <BuildControl
        label={ctrl.label}
        key={ctrl.label}
        // also need to pass in type, as BuildControl will invoke the ingredientAdded callback and will pass the type to it.
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <button disabled={!props.purchasable} className={classes.OrderButton} onClick={props.ordered}>ORDER NOW</button>
  </div>
);

export default buildControls;
