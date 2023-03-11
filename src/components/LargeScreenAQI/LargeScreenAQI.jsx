import React, {useEffect} from 'react';
import * as echarts from 'echarts';
import PubSub from 'pubsub-js';

import {showCityAQI} from './LargeScreenAQI.js';

import './LargeScreenAQI.css';


export default function LargeScreenAQI() {
    useEffect(()=>{
        let chartInstance = echarts.init(document.getElementById('cityAQI'),"light");
        showCityAQI(chartInstance, 'http://localhost:8080/山东省airQuality.json', 3, '山东省');
        let token = PubSub.subscribe('cityToggle', (_, data)=>{
            showCityAQI(chartInstance, `http://localhost:8080/${data.cityName}airQuality.json`, data.divisor, data.cityName);
        });
        return ()=>{
            PubSub.unsubscribe(token);
        }
    }, []);
    return <section className="aqi" id="cityAQI"></section>;
}
