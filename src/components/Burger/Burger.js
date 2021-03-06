import React from 'react';
import BurgerIngredient from './BurgerIngedient/BurgerIngredient'
import classes from './Burger.css';

const burger = (props) => {
  console.log(props.ingredients);
  let transformedIngredients1 = Object.keys(props.ingredients);
  const ar = transformedIngredients1.map((igKey) => {
    return [...Array(props.ingredients[igKey])];
  });
  console.log(ar);

  let transformedIngredients = Object.keys(props.ingredients)
    .map((igKey) => {
      return [...Array(props.ingredients[igKey])]
        .map((_, i) => {
          return <BurgerIngredient key={igKey+i} type={igKey}/>
        });
    })
    .reduce((arr, el) => {
      return arr.concat(el)
    }, []);

  if (transformedIngredients.length === 0)  {
    transformedIngredients = <p>Please start adding ingredients</p>
  }
  console.log(transformedIngredients);
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
        {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

export default burger;
