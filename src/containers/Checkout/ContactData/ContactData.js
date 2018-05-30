import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Zipcode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength :5,
                    maxLength :5
                },
                isValid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'cheapest',
                validation: {},
                touched: false,
                isValid: true
            }
        },
        loading: false,
        isFormValid: false
    }

    validateForm(value, rules) {

        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.trim().length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.trim().length <= rules.maxLength && isValid;
        }

        return isValid;

    }

    orderHandler = (event) => {
        event.preventDefault();

        const orderForm = {};
        for (let elem in this.state.orderForm) {
            orderForm[elem] = this.state.orderForm[elem].value;
        }

        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderForm: orderForm

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

    ChangedEventHandler = (event, id) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedOrderFormElement = {...updatedOrderForm[id]};
        updatedOrderFormElement.value = event.target.value;
        updatedOrderFormElement.isValid = this.validateForm(updatedOrderFormElement.value, updatedOrderFormElement.validation);
        updatedOrderFormElement.touched = true;
        updatedOrderForm[id] = updatedOrderFormElement;

        let isFormValid = true;
        for (let elem in updatedOrderForm) {
            isFormValid =updatedOrderForm[elem].isValid && isFormValid;
        }

        this.setState({orderForm: updatedOrderForm, isFormValid: isFormValid});

   }


    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }


        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.isValid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        propertyName={formElement.id} 
                        changed={(event) => this.ChangedEventHandler(event, formElement.id)}/>

                ))}
                <Button btnType="Success" disabled={!this.state.isFormValid}>Order</Button>
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