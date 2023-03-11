import React, {useEffect} from 'react';
import * as echarts from 'echarts';
import PubSub from 'pubsub-js';

import {showRealization} from './IntroduceRealization.js'

import './IntroduceRealization.css';

export default function IntroduceRealization() {
    useEffect(()=>{
        let chartInstance = echarts.init(document.getElementById("realization"));
        showRealization(chartInstance);/*改数据*/
    }, []);
    return <section className="cir" id="realization"></section>;
}
