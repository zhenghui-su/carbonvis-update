import React, {useEffect} from 'react';

import {drawFrechetdistBar} from './Gravity.js';
import PubSub from 'pubsub-js';

import './Gravity.css';

export default function Gravity() {
  useEffect(()=>{
    drawFrechetdistBar('http://localhost:8080/frechetdist.json').then((xName)=>{
      PubSub.publish('startGravity', xName);
    });
  },[]);

  return (
    <section className="outter">
      <h1 className='title'>轨迹相似度</h1>
      <section className='gravity' id="frechetdist"></section>
    </section>
  );
}