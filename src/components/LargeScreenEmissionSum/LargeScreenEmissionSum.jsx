import React,{useEffect} from 'react';
import * as echarts from 'echarts';
import PubSub from 'pubsub-js';

import {showEmissionSum} from './LargeScreenEmissionSum.js';

import './LargeScreenEmissionSum.css';

export default function LargeScreenEmissionSum() {
    useEffect(()=>{
        let chartInstance = echarts.init(document.getElementById('provinceSum'),"light");
        showEmissionSum(chartInstance, 'http://localhost:8080/emissionSum.json');
        chartInstance.on('click', (e)=>{
            console.log(e);
            PubSub.publish('yearToggle', {year: new Date(e.data[0]).getFullYear()});
        });
    }, []);
    return <section className="sum" id="provinceSum"></section>;
}
