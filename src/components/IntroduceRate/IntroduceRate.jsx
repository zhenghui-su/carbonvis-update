import React, {useEffect} from 'react';
import * as echarts from 'echarts';
import PubSub from 'pubsub-js';

import {showRate} from './IntroduceRate.js'

import './IntroduceRate.css';

export default function IntroduceRate() {
    useEffect(()=>{
        let chartInstance = echarts.init(document.getElementById("bar"));
        showRate(chartInstance, 'http://localhost:8080/2010provinceRain.json', 2010);
        let token = PubSub.subscribe('yearToggle2',(_, data)=>{
            console.log(data);
            showRate(chartInstance, `http://localhost:8080/${data.year}provinceRain.json`, data.year);/*在此更换数据*/
        });
        return ()=>{
            PubSub.unsubscribe(token);
        }
    }, []);
    return <section className="rate" id="bar"></section>;
}
