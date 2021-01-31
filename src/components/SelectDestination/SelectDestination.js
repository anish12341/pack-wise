import React, { Component, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { get, post } from 'axios';
import Autosuggest from 'react-autosuggest';
import ReactLoading from 'react-loading';

import './SelectDestination.css';
import AppContext from '../../context/app-context';
import Navigation from '../Navigation/Navigation';

class SelectDestination extends Component {
  static contextType = AppContext;

  constructor() {
    super();
    this.sourceInputRef = React.createRef();
    this.destinationInputRef = React.createRef();
    this.sourceCountryListDiv = React.createRef();
    this.destCountryListDiv = React.createRef();
    this.state = {
      destinationSearch: localStorage.getItem("destination") || '',
      sourceSearch: localStorage.getItem("source") || '',
      destinationSuggestions: [],
      sourceSuggestions: [],
      isLoading: false
    }
  }

  componentDidMount() {   
    console.log("Props: ", this.props);
  }

  componentDidUpdate() {
  }

  handleChangeDestionation = ({ target: { value: destinationSearch } }) => {
    this.setState({
      destinationSearch
    });
    console.log(this);
    const savingThis = this;
    get(`https://restcountries.eu/rest/v2/name/${destinationSearch}`)
    .then(function ({ data }) {
      console.log(this);
      savingThis.setState({
        destinationSuggestions: data
      })
    })
    .catch(() => {
      savingThis.setState({
        destinationSuggestions: []
      })
    })
  }

  handleChangeSource = ({ target: { value: sourceSearch } }) => {
    this.setState({
      sourceSearch
    });
    console.log(this);
    const savingThis = this;
    get(`https://restcountries.eu/rest/v2/name/${sourceSearch}`)
    .then(function ({ data }) {
      console.log(this);
      savingThis.setState({
        sourceSuggestions: data
      })
    })
    .catch(() => {
      savingThis.setState({
        sourceSuggestions: []
      })
    })
  }

  selectCountry = (evt) => {
    console.log(evt.target.dataset);
    if (evt.target.dataset.type === 'source') {
      const countryName = evt.target.children.length > 0 ? evt.target.children[0].innerHTML : evt.target.innerHTML;
      localStorage.setItem("source", countryName);
      this.sourceInputRef.current.value = countryName;
      this.sourceCountryListDiv.current.remove();
    } else {
      const countryName = evt.target.children.length > 0 ? evt.target.children[0].innerHTML : evt.target.innerHTML;
      localStorage.setItem("destination", countryName);
      this.destinationInputRef.current.value = countryName;
      this.destCountryListDiv.current.remove();
    } 
  }

  getResponse = () => {
    this.setState({
      isLoading: true
    });
    console.log("Blob: ", this.context.imageBlob);
    post('https://packwise-303322.uc.r.appspot.com/api', {
      source: this.sourceInputRef.current.value,
      destination: this.destinationInputRef.current.value,
      image: this.context.imageBlob
    })
    .then(({ data }) => {
      console.log(data);
      this.props.setResponse(data);
      this.props.history.push('/result');
    })
  }

  render() {
    let { sourceSearch, destinationSearch, sourceSuggestions, destinationSuggestions } = this.state;
    sourceSuggestions = sourceSuggestions.slice(0, 5);
    destinationSuggestions = destinationSuggestions.slice(0, 5);
    const style = {
      height: '100px',
      width: '100px',
      /* text-align: center, */
      position: 'absolute',
      left: 0,
      right: 0,
      margin: 'auto',
      top: 0,
      bottom: 0,
    }

    return (
      <Fragment>
        <Navigation prevPath={"/take-picture"} history={this.props.history}/>
        <div className="BodyDivSD">
          <div className="childBodyDivSD">
          <label className="inputLabelSD">Source</label>
          <input 
              ref={this.sourceInputRef}
              className="sourceInputSD"
              type="text"
              value={sourceSearch}
              onChange={this.handleChangeSource} />
          <div className="countryEntriesSD" ref={this.sourceCountryListDiv}>
              {sourceSuggestions.map(eachCountry => {
                return (
                  <div key={`${eachCountry.name}-source`} className="eachCountrySD" data-type="source" onClick={this.selectCountry}>
                    <span className="countryNameSD" data-type="source" onClick={this.selectCountry}>{eachCountry.name}</span>
                  </div>
                )
              })}
            </div>
            <label className="inputLabelSD">Destination</label>
            <input 
              ref={this.destinationInputRef}
              className="destinationInputSD"
              type="text"
              value={destinationSearch}
              onChange={this.handleChangeDestionation} />
            <div className="countryEntriesSD" ref={this.destCountryListDiv}>
              {destinationSuggestions.map(eachCountry => {
                return (
                  <div key={`${eachCountry.name}-destination`} className="eachCountrySD" data-type="destination" onClick={this.selectCountry}>
                    <span className="countryNameSD" data-type="destination" onClick={this.selectCountry}>{eachCountry.name}</span>
                  </div>
                )
              })}
            </div>
            {/* <Link to="/result"> */}
              <button className="startButtonSD" onClick={this.getResponse}>Submit</button>
            {/* </Link> */}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default SelectDestination;