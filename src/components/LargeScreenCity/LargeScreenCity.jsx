import React, {useEffect} from 'react';
import * as echarts from 'echarts';
import PubSub from 'pubsub-js';

import {showCityEmission} from './LargeScreenCity.js';

import './LargeScreenCity.css';

export default function LargeScreenCity() {
    useEffect(()=>{
        let chartInstance = echarts.init(document.getElementById('cityEmission'));
        showCityEmission(chartInstance, 'http://localhost:8080/firstLevelCityEmission.json', 3, '山东省');
        let token = PubSub.subscribe('cityToggle', (_, data)=>{
            showCityEmission(chartInstance, `http://localhost:8080/${data.dataName}`, data.divisor, data.cityName);
        });
        return ()=>{
            PubSub.unsubscribe(token);
        }
    }, []);
    return <section className="area" id="cityEmission"></section>;
}
