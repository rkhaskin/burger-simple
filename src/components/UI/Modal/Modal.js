import React, { Component } from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxi/Auxi';

class Modal extends Component {

  // we are passing <Spinner /> as children, 
 //so as show does not change, need to add this || statement
                                                    
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show 
      || nextProps.children !== this.props.children; 
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
