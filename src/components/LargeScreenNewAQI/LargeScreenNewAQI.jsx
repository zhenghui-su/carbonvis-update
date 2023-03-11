import React, {useEffect} from "react";
import * as echarts from 'echarts';
import PubSub from 'pubsub-js';

import {showCityNewAQI} from './LargeScreenNewAQI.js';

import './LargeScreenNewAQI.css';


export default function LargeScreenNewAQI() {
    useEffect(()=>{
        let chartInstance = echarts.init(document.getElementById('cityNewAQI'),"light");
        showCityNewAQI(chartInstance, 'http://localhost:8080/山东省airQuality.json', 3, '山东省');
        let token = PubSub.subscribe('cityToggle', (_, data)=>{
            console.log(data);
            showCityNewAQI(chartInstance, `http://localhost:8080/${data.cityName}airQuality.json`, data.divisor, data.cityName);
        });
        return ()=>{
            PubSub.unsubscribe(token);
        }
    }, []);
    return <section className="newAqi" id="cityNewAQI"></section>;
}
