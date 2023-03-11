import React, {useEffect, useRef} from 'react';
import { Input } from 'antd';
import PubSub from 'pubsub-js';

import {drawCarbonTrendGra} from './FilterAndForecast.js'

import './FilterAndForecast.css'
import axios from 'axios';

const { Search } = Input;

const predict = async ()=>{
  const mapList = ['CE', 'UR', 'PCLA', 'BUS', 'PS', 'CC'];
  let valueList = document.getElementById('valueList');
  valueList = [...valueList.children];
  valueList.pop();
  let url = 'http://localhost:8080/prediction?';
  valueList.forEach((element, index) => {
    url += `${mapList[index]}=${element.value}&`;
  });
  url = url.slice(0,url.length-1);
  let result = await axios.get(url);
  document.getElementsByClassName('ant-input-lg')[0].value = result.data;
}

export default function FilterAndForecast() {
  const chartStore = useRef(null);
  const reback = ()=>{
    chartStore.current.innerHTML = '';
    drawCarbonTrendGra('http://localhost:8080/carbonprediction.json', 'carbon');
  }

  useEffect(()=>{
    chartStore.current = document.getElementById('trendChart');

    drawCarbonTrendGra('http://localhost:8080/carbonprediction.json', 'carbon');

    let token = PubSub.subscribe('drawGravityCenter', (_, par)=>{
      chartStore.current.innerHTML = '';
      drawCarbonTrendGra(`http://localhost:8080/${par.key}prediction.json`, par.key);
    });

    return ()=>{
      PubSub.unsubscribe(token);
    }
  }, []);

  return (
    <section className='filterAndForecast'>
      <section className="titleBox">
        <h1 className="title">碳排放预测</h1>
        <span className="reback" onClick={reback}></span>
      </section>
      <section className='outter'>
        <section className='trendGra' id="trendChart"></section>
        <section className='valuePrediction' id='valueList'>
          <Input placeholder="输入能源消耗总量" />
          <Input placeholder="输入城镇化率" />
          <Input placeholder="输入道路总长" />
          <Input placeholder="输入公共车辆总数" />
          <Input placeholder="输入人口总数" />
          <Input placeholder="输入煤炭消耗量" />
          <Search
            placeholder="碳排放预测输出值"
            allowClear
            enterButton="预测"
            size="large"
            onSearch={predict}
          />
        </section>
      </section>
    </section>
  );
}