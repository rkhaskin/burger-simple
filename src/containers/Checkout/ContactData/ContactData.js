import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        enail: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Pushkin',
                address: {
                    street: '111 Main street',
                    city: 'Plantation',
                    state: 'FL',
                    country: 'USA'
                },
                email: 'test@test.com'
            },
            deliveryMethod: '1-hour'
        }

        // https://console.firebase.google.com/project/max-burger-d04a8/database/max-burger-d04a8/data    

        // if order sent to the server successfully, close the modal
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            });

    }

    render() {
        let form = (
            <form>
                <input type="text" name="name" placeholder="Your Name" />
                <input type="email" name="email" placeholder="Your Email" />
                <input type="text" name="street" placeholder="Your Street" />
                <input type="text" name="postal" placeholder="Your Postal Code" />
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter you Contact Data</h4>
                {form}
            </div>
        );
    }

}

export default ContactData;