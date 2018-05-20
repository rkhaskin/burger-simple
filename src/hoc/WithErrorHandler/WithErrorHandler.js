import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxi/Auxi';

// takes wrapped component
/*
we only want to show this component if we got an error. The information on if we failed we get from the wrapped component.
we get this info with the help of axios, where we set the global interceptors. We need to have a class bases component for that.
*/
/* example of a fumctional component. Kept for comment inside
const withErrorHandler = (WithWrappedComponent) => {
    // returns a function which receives props and returns jsx
    return (props) => {
        return (
          <Aux>
            <Modal show>Something does not work!</Modal>
            <WithWrappedComponent {...props} />
           </Aux>
        );
    }   
}
*/

const withErrorHandler = (WithWrappedComponent, axios) => {
    // anonymous class - we never use it by name, it is a class factory
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount() {
            // the first param is response, but we do not care
            axios.interceptors.response.use(res => res, error => {  // return the response. The shortest syntax to do that
                this.setState({error: error});
            });

            axios.interceptors.request.use(req =>{
                // before the request initialize the error to null
                this.setState({error: null});
                return req;
            });
            
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
            <Aux>
                <Modal show={this.state.error} closeBackdrop={this.errorConfirmedHandler}>
                    {this.state.error ? this.state.error.message : null}
                </Modal>
                <WithWrappedComponent {...this.props} />
            </Aux>
            );
        }
    }
}

export default withErrorHandler;