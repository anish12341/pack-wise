
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import React, { Component } from 'react';

import './App.css';
import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import TakePicture from './components/TakePicture/TakePicture';
import SelectDestination from './components/SelectDestination/SelectDestination';
import AppContext from './context/app-context';
import Result from './components/Result/Result';

class App extends Component {
  constructor(props) {
    super(props);

    this.updateImageBlob = (clickedImage) => {
      this.setState({
        imageBlob: clickedImage
      });
    };

    this.state = {
      imageBlob: undefined,
      updateImageBlob: this.updateImageBlob,
      currentPath: '/',
      response: {}
    };
  }

  setCurrentPath = (path) => {
    this.setState({
      currentPath: path
    })
  }

  setResponse = (response) => {
    this.setState({
      response
    })
  }
 
  render() {
    return (
      <AppContext.Provider value={this.state}>
        <div className="App">
          <switch>
            <Route path="/" component={Home} exact/>
            <Route 
              path="/take-picture" 
              component={TakePicture} />
            <Route 
              path="/select-destination" 
              component={(props) => <SelectDestination {...props} setResponse={this.setResponse}/>} />
            <Route 
              path="/result" 
              component={Result} />
          </switch>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
