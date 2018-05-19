import React from 'react';
import Aux from '../../../hoc/Auxi/Auxi'
import Button from '../../../components/UI/Button/Button';

const orderSummary = (props) => {  // use ( ) when creating jsx, and {} when need to do some processing
      const ingredientSummary = Object.keys(props.ingredients)
      .map(igKey => {
        return (
          <li key={igKey} >
          <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
        </li>
      )}
    )
    return (
        <Aux>
          <h3>Your Order</h3>
          <p>Decicious Burger with the following ingredients:</p>
          <ul>
              {ingredientSummary}
          </ul>
          <p><strong>Total price {props.totalPrice.toFixed(2)}</strong></p>
          <p>Continue to checkout?</p>
          <Button btnType="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
          <Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>
        </Aux>

  )
}

export default orderSummary;
