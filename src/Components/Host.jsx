import * as faceapi from '@vladmandic/face-api/';
import kazam from "../assets/kazam.mp4";
//import '../main.css';
import React, { useEffect, useRef } from 'react';
import path from '..'
const MODEL_URL = '/home/sol/Documents/sid_framework/sidharth/node_modules/@vladmandic/face-api/models/';

async function loadModels() {
  await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
  console.log('Models Loaded');
}

const Host = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    loadModels();
  }, []);

  return (
    <div className='box'>
      <video src={kazam} autoPlay loop={Infinity} ></video>

    </div>
  );
}

export default Host;