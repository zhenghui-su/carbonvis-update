import React, {useEffect} from 'react';
import * as echarts from 'echarts';
import PubSub from 'pubsub-js';

import {showNewRate} from './IntroduceNewRate.js'

import './IntroduceNewRate.css';

export default function IntroduceNewRate() {
    useEffect(()=>{
        let chartInstance = echarts.init(document.getElementById("new"),"light");
        showNewRate(chartInstance);
    }, []);
    return <section className="new" id="new"></section>;
}
