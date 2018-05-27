import React, { Component } from 'react';
import Aux from '../../hoc/Auxi/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../../src/axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    showSummary: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axios.get('https://max-burger-d04a8.firebaseio.com/ingredients.json')
      .then(response => {
        console.log(response);
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }


  // must be arrow function. Simple functions do not have "this" if called from an event
  purchaseHandler = () => {
    this.setState({ showSummary: true });
  }

  purchaseCancelledHandler = () => {
    this.setState({ showSummary: false });
  }

  purchaseContinueHandler = () => {

    const queryParams = [];
    // for..in is a method for iterating over "enumerable" properties of an object
    for (let i in this.state.ingredients) {
      // i is the key - ingredient name, this.state.ingredients[i] - is the ingredient value
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price='+ this.state.totalPrice);

    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: "/checkout",
      search: '?' + queryString
    });
  }

  updatePurchasable(ingredients) {
    // copy state.INGREDIENT_PRICES - cannot do that as the ingredients are old, not yet updated by the add or remove handlers
    //const ingredients = {...this.state.ingredients};

    // calculate sum of all ingredients by convertin the object to array
    const sum = Object.keys(ingredients)
      .map(igKey => { // convert object into an array
        return ingredients[igKey];
      })
      .reduce((sum, elem) => { // flatten the sums into one sum
        return sum + elem;
      }, 0); // if sum is not defined, set init = 0;
    // set state based on the sum
    this.setState({ purchasable: sum > 0 })
    console.log(this.state.purchasable);

  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    // copy old state to the new state
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;

    // calculate the price
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchasable(updatedIngredients);
  }


  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    // copy old state to the new state
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;

    // calculate the price
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchasable(updatedIngredients);
  }

  render() {
    // disable buttons where needed
    const disabledInfo = { ...this.state.ingredients };
    for (let i in disabledInfo) {
      // {salad:true, bacon:false...} - where true and false show whether to disable the buttons
      disabledInfo[i] = disabledInfo[i] <= 0;
    }


    let orderSummary = null;



    let burger = this.state.error ? <p>Ingredients cannot be loaded!</p> : <Spinner />
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );

      orderSummary = <OrderSummary ingredients={this.state.ingredients}
        purchaseCancelled={this.purchaseCancelledHandler}
        purchaseContinued={this.purchaseContinueHandler}
        totalPrice={this.state.totalPrice} />;

    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }


    return (
      <Aux>
        {/* when ingredients or price changes, we rerender Modal and Order Summary. But only need to do so when Modal show prop changes*/}
        <Modal show={this.state.showSummary} closeBackdrop={this.purchaseCancelledHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
