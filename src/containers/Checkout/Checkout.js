import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

    state = {
        ingredients: {
            salad: 1,
            cheese: 0,
            bacon: 0,
            meat: 1
        }
    }

    componentDidMount() {
        // extract query string params
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let q of query.entries()) {
            // salad                convert to number 1
            ingredients[q[0]] = +q[1];
        }

        this.setState({ingredients:ingredients});

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
                checkoutSummaryContinued={this.props}
                />
            </div>
        );
    }
}

export default Checkout;