import React from 'react';
import {
  Link,
} from "react-router-dom";

import './Navigation.css';

const Navigation = ({ prevPath, history }) => {
  console.log(prevPath);
  const showBack = prevPath !== '';
  console.log(showBack);
  return (
    <div className="navigationMainDiv">
      {showBack ? 
        <i className="fa fa-angle-left navigationBack" aria-hidden="true" onClick={() => {history.goBack()}}></i>
        : null }
      <p className="navigationCenterP">CanITake</p>
    </div>
  )
}

export default Navigation;