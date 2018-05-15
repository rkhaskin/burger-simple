import React, { Component } from 'react';
import Aux from '../Auxi';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

  state = {
    showSideDrawer: false
  }
  sideDrawerCloseHandler = () => {
    this.setState({showSideDrawer: false});
  }

  drawerToggleClickedHandler = () => {
    // due to async nature of setState, this can lead to unexpected outcomes
    //this.setState({showSideDrawer: !this.state.showSideDrawer});
     this.setState((prevState) => {
       return {showSideDrawer: !prevState.showSideDrawer}
     });
  }

  render() {
    return (
      <Aux>
        <Toolbar DrawerToggleClicked={this.drawerToggleClickedHandler}/>
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerCloseHandler}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

export default Layout;
