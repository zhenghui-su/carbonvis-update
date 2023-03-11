import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import { Input } from 'antd';
import PubSub from 'pubsub-js';

import {drawAllFactorsTable} from './Moran.js';

import './Moran.css';

const { Search } = Input;

export default function Moran() {

  const onSearch = (value) => {
    drawAllFactorsTable(`http://localhost:8080/${value}MGWR.json`, value);
    PubSub.publish('updateGeo', value);
  };

  useEffect(()=>{

    drawAllFactorsTable('http://localhost:8080/2005MGWR.json', 2005);
    ReactDOM.render(
      <Search placeholder="输入2005-2017任意年份" onSearch={onSearch} style={{ width: 230}} />,
      document.getElementById('search')
    );
  }, []);
  return (
    <section className='moran'>
      <section className="detail">
        <h1 className="title">影响因素地区差异</h1>
        <section id="search" className='searchBox'></section>
        <section className='colorBox'><span className="colorMark" style={{backgroundColor:'rgba(204, 51, 51, 0.4)'}}></span><span className='text'>正相关</span></section>
        <section className='colorBox'><span className='colorMark' style={{backgroundColor:'rgba(0, 153, 0.4)'}}></span><span className='text'>负相关</span></section>
      </section>
      <section id="moranTable" className='table'></section>
    </section>
  );
}