import React, {useEffect, useState} from 'react';

import {initRelationEle, drawFactorTrend} from './Relation.js';
import './Relation.css';

export default function Relation(props) {
  const [eles, setEles] = useState('');
  useEffect(()=>{
    initRelationEle('http://localhost:8080/relation_analysis.json', 'http://localhost:8080/gravity_center.json').then((s)=>{
      setEles(s);
    }).then(()=>{
      drawFactorTrend('http://localhost:8080/factors.json');
    });
  }, []);

  return (
    <section className='relation'>
      <section className="detail">
        <h1 className='title'>关联强度</h1>
        <section className='colorBox'><span className="colorMark" style={{backgroundColor:'rgba(153,0,0,0.3)'}}></span><span className='text'>强相关</span></section>
        <section className='colorBox'><span className='colorMark' style={{backgroundColor:'rgba(51,153,0,0.3)'}}></span><span className='text'>弱相关</span></section>
        <section className='colorBox'><span className='colorMark' style={{backgroundColor:'rgba(255,153,0,0.3)'}}></span><span className='text'>不相关</span></section>
      </section>
      <section className="relationPanel">{eles}</section>
    </section>
  );
}