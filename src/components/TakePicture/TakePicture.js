import React, { Component, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import './TakePicture.css';
// import { Webcam } from '../../webcam';
import AppContext from '../../context/app-context';
import Navigation from '../Navigation/Navigation';
import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "environment",
};

class TakePicture extends Component {
  static contextType = AppContext;

  constructor() {
    super();
    this.webcam = null;
    this.webcamRef = React.createRef();
    this.state = {
      capturedImage: null,
      captured: false,
    }
  }

  captureImage = async () => {
    // const capturedData = this.webcam.takeBase64Photo({ type: 'jpeg', quality: 1 });
    const capturedData = this.webcamRef.current.getScreenshot();
    console.log(capturedData);
    this.context.updateImageBlob(capturedData);
    this.setState({
        captured: true,
        capturedImage: capturedData
    });
  }

  discardImage = () => {
    console.log("Here");
    this.setState({
        captured: false,
        capturedImage: null
    })
  }

  componentDidMount() {
    // initialize the camera
    // this.canvasElement = document.createElement('canvas');
    // this.webcam = new Webcam(
    //     document.getElementById('webcam'),
    //     this.canvasElement
    // );
    // this.webcam.setup().catch(() => {
    //     alert('Error getting access to your camera');
    // });
  }

  componentDidUpdate() {
    // initialize the camera
    if (!this.state.captured) {
      // this.canvasElement = document.createElement('canvas');
      // this.webcam = new Webcam(
      //     document.getElementById('webcam'),
      //     this.canvasElement
      // );
      // this.webcam.setup().catch(() => {
      //     alert('Error getting access to your camera');
      // });
    }
  }

  render() {
    const { captured } = this.state;
    const { setCurrentPath } = this.props;
    return (
      <Fragment>
        <Navigation prevPath={"/"} history={this.props.history}/>
        <div className="BodyDivTP">
          <div className="childBodyDivTP">
            {
              captured ? 
              <img src={this.state.capturedImage} alt="captured" width="350" />
              // : <video autoPlay playsInline muted id="webcam" height="200" />
              : <Webcam
                  audio={false}
                  forceScreenshotSourceSize={true}
                  height={200}
                  ref={this.webcamRef}
                  screenshotFormat="image/jpeg"
                  screenshotQuality={1}
                  width={300}
                  videoConstraints={videoConstraints}
                />
            }
            <button 
              className={`startButtonTP ${captured ? '' : 'disabledClassTP'}`}
              disabled={!captured} 
              onClick={this.discardImage}>
                Retake
              </button>
            {captured 
            ? (
            <Link to="/select-destination">
              <button className="startButtonTP">{`Next `}<i class="fa fa-arrow-right" aria-hidden="true"></i></button>
            </Link>)
            : <button className="startButtonTP" onClick={this.captureImage}>Click!</button>
            }
          </div>
        </div>
    </Fragment>
    );
  }
}

export default TakePicture;