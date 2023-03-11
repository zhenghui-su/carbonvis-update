import React, {useEffect} from 'react';
import * as echarts from 'echarts';
import PubSub from 'pubsub-js';

import {showTimeline} from './IntroduceTimeline.js'

import './IntroduceTimeline.css';

export default function IntroduceTimeline() {
    useEffect(()=>{
        let chartInstance = echarts.init(document.getElementById("timeline"));
        showTimeline(chartInstance, 'http://localhost:8080/firstLevelCityEmission.json');
    }, []);
    return <section className="time" id="timeline"></section>;
}
