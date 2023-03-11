import React, {useEffect} from 'react';
import * as echarts from 'echarts';
import PubSub from 'pubsub-js';

import {showCarbon} from './IntroduceCarbon.js'

import './IntroduceCarbon.css';

export default function IntroduceCarbon() {
    useEffect(()=>{
        let chartInstance = echarts.init(document.getElementById("carbon"));
        showCarbon(chartInstance);/*改数据*/
    }, []);
    return <section className="bar" id="carbon"></section>;
}
