import React, {useEffect} from 'react';
import * as echarts from 'echarts';
import PubSub from 'pubsub-js';

import {showCarbonBar} from "./LargeScreenCarbonBar.js"

import "./LargeScreenCarbonBar.css";


export default function LargeScreenCarbonBar() {
    useEffect(()=>{
        let chartInstance = echarts.init(document.getElementById('carbon'));
        showCarbonBar(chartInstance, 'http://localhost:8080/2020carbon.json');
        let token = PubSub.subscribe('yearToggle', (_, data) => {
            showCarbonBar(chartInstance,`http://localhost:8080/${data.year}carbon.json`)
        });
    }, []);
    return <section className="bar" id="carbon"></section>;
}
