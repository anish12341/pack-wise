import React, { Component, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { get } from 'axios';
import Autosuggest from 'react-autosuggest';

import './Result.css';
import AppContext from '../../context/app-context';
import Navigation from '../Navigation/Navigation';
import { Card, Container } from 'semantic-ui-react';

const sampleResponse = {
  isAllowedCheckin: true,
  isAllowedCarry: true,
  status: true,
  description: 'This is description This is description This is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is description'
}

class Result extends Component {
  static contextType = AppContext;

  constructor() {
    super();
  }

  constructAllowanceMessage = () => {
    if (!sampleResponse.status) {
      return 'Sorry! we could not find the product.'
    } else if (sampleResponse.isAllowedCarry && sampleResponse.isAllowedCheckin) {
      return 'Yes, the item you provided is allowed in both carry-on and check-in luggage.';
    } else if (!sampleResponse.isAllowedCarry && sampleResponse.isAllowedCheckin) {
      return 'The item you provided is allowed in check-in but not in carry-on luggage.'
    } else if (sampleResponse.isAllowedCarry && !sampleResponse.isAllowedCheckin) {
      return 'The item you provided is allowed in carry-on but not in check-in luggage.'
    } else if (!sampleResponse.isAllowedCarry && !sampleResponse.isAllowedCheckin) {
      return 'Sorry! the item you provided is not allowed.'
    }
  }

  render() {
    const { response } = this.context;
    let checkInColor = 'green';
    let checkInAllowance = 'Allowed';
    let carryOnColor = 'green';
    let carryOnAllowance = 'Allowed';

    if (response.isAllowedCheckin === 'yes') {
      checkInColor = 'green';
      checkInAllowance = 'Allowed';
    } else if (response.isAllowedCheckin === 'no') {
      checkInColor = 'red';
      checkInAllowance = 'Not Allowed';
    } else if (response.isAllowedCheckin === 'maybe') {
      checkInColor = 'gray';
      checkInAllowance = 'Conditionally allowed';
    }

    if (response.isAllowedCarry === 'yes') {
      carryOnColor = 'green';
      carryOnAllowance = 'Allowed';
    } else if (response.isAllowedCarry === 'no') {
      carryOnColor = 'red';
      carryOnAllowance = 'Not Allowed';
    } else if (response.isAllowedCarry === 'maybe') {
      carryOnColor = 'gray';
      carryOnAllowance = 'Conditionally allowed';
    }

    return (
      <Fragment>
        <Navigation prevPath={"/select-destination"} history={this.props.history}/>
        
        {/* <div className="BodyDivR"> */}
          <Container className="myContainer">
          {
            response.status ? (
              <Fragment>
            <Card className="myCard">
            <Card.Content>
              <Card.Header>Check-in</Card.Header>
              <Card.Meta>
                <span style={{color: checkInColor }}>{checkInAllowance}</span>
              </Card.Meta>
              <Card.Description className="myDescription">
                {response.descriptionCheckin}
              </Card.Description>
            </Card.Content>
          </Card>

          <Card className="myCard">
            <Card.Content>
              <Card.Header>Carry-on</Card.Header>
              <Card.Meta>
                <span style={{color: carryOnColor }}>{carryOnAllowance}</span>
              </Card.Meta>
              <Card.Description className="myDescription">
                {response.descriptionCabin}
              </Card.Description>
            </Card.Content>
          </Card>
          </Fragment>)
          : 
          <Card className="myCard">
            <Card.Content>
              <Card.Header>Sorry!</Card.Header>
              <Card.Description className="myDescription">
                We could not find the product you sent!
              </Card.Description>
            </Card.Content>
          </Card>
          }
          <p className="myP">For more information on baggage allowance and permissable limits visit TSA guidlines below</p>
          <a href={response.moreInfoLink}><button className="myTSA">TSA Guidlines</button></a>
          </Container>
      </Fragment>
    );
  }
}

export default Result;