import React, {Fragment} from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import './Home.css';
import Navigation from '../Navigation/Navigation';

const Home = (props) => {
  const style = {
    height: '50%',
    width: '70%',
    border: '3px solid black'
  }
  console.log("History: ", props.history);
  return (
    <Fragment>
      <Navigation prevPath={''} history={props.history}/>
      <div className="BodyDiv">
        <div className="childBodyDiv">
          <div className="infoDivR">
            <p className="introText">Confused about what you can bring on your next <i class="fa fa-plane" aria-hidden="true"></i> ? Look no further just click a picture and we'll let you know!</p>
          </div>
          <Link to="/take-picture">
          <button className="startButton">Start</button>
          </Link>
        </div>
      </div>
    </Fragment>
  )
}

export default Home;