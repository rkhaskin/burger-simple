import React, { Component } from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxi';

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show; 
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} closeBackdrop={this.props.closeBackdrop}/>
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)'
          }}>
           {this.props.children}
        </div>
      </Aux>
    )
}
}

export default Modal;
