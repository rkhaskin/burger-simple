import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
  {/* we need exact here to allow the correct active tab highlighting.
      Without it both tabs are marked as active after clicked. 
      One of the tabls s routed from "/", and "/" is always active
      if exact is not specified
   */}
    <NavigationItem exact link="/">Burger Builder</NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem>
  </ul>
);

export default navigationItems;
