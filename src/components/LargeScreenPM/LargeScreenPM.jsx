import React, {useEffect} from 'react';
import * as echarts from 'echarts';
import PubSub from 'pubsub-js';

import {showCityPM} from './LargeScreenPM.js';

import './LargeScreenPM.css';


export default function LargeScreenPM() {
    useEffect(()=>{
        let chartInstance = echarts.init(document.getElementById('cityPM'));
        showCityPM(chartInstance, 'http://localhost:8080/山东省PM2.5.json', 3, '山东省');
        let token = PubSub.subscribe('cityToggle', (_, data)=>{
            showCityPM(chartInstance, `http://localhost:8080/${data.cityName.replace('市', '')}PM2.5.json`, data.divisor, data.cityName);//数据链接改为{城市名}PM2.5.json
        });
        return ()=>{
            PubSub.unsubscribe(token);
        }
    }, []);
    return <section className="pm" id="cityPM"></section>;
}
