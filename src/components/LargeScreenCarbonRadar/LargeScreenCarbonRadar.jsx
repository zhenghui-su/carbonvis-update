import React, {useEffect} from 'react';
import * as echarts from 'echarts';
import PubSub from 'pubsub-js';

import {showCarbonRadar} from "./LargeScreenCarbonRadar.js"

import "./LargeScreenCarbonRadar.css";


export default function LargeScreenCarbonRadar() {
    useEffect(()=>{
        let chartInstance = echarts.init(document.getElementById('carbon'));
        showCarbonRadar(chartInstance, 'http://localhost:8080/2020carbon.json',2020);/*修改数据*/
        let token = PubSub.subscribe('yearToggle', (_, data) => {
            console.log(data.year);
            showCarbonRadar(chartInstance,`http://localhost:8080/${data.year}carbon.json`,data.year)/*修改数据*/
        });
    }, []);
    return <section className="radar" id="carbon"></section>;
}
