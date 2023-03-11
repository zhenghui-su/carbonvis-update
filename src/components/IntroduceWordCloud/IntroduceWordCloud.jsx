import React, {useEffect} from 'react';
import * as echarts from 'echarts';
import PubSub from 'pubsub-js';

import {showWordCloud} from './IntroduceWordCloud.js'

import './IntroduceWordCloud.css';

export default function IntroduceWordCloud() {
    useEffect(()=>{
        let chartInstance = echarts.init(document.getElementById("wordCloud"));
        showWordCloud(chartInstance);
    }, []);
    return <section className="cloud" id="wordCloud"></section>;
}
