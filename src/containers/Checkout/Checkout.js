import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount() {
        // extract query string params
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};

        // entries returns iterator, so use 'let q OF ...'. 
        let price = 0;
        for (let q of query.entries()) {
            if (q[0] === 'price') {
                price = q[1];
            }
            else {
                // salad                convert to number 1
                ingredients[q[0]] = +q[1];
            }
        }

        this.setState({ ingredients: ingredients, totalPrice: price });

    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }


    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutSummaryCancelled={this.checkoutCancelledHandler}
                    checkoutSummaryContinued={this.checkoutContinuedHandler}
                />
                <Route path={this.props.match.url + '/contact-data'}
                    // component={ContactData}
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)}
                />
                {/* <Route render={() => {
                    return (<h1>{this.props.match.url}</h1>)
                } */}

            </div>
        );
    }
}

export default Checkout;