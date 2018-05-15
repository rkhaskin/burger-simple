import React from 'react';
import LogoImage from '../../assets/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => (
  <div className={classes.Logo}>
    <img src={LogoImage} alt="My Burger"></img>
  </div>
);

export default logo;
