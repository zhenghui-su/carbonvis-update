import React, {useEffect} from 'react';
import * as echarts from 'echarts';

import {showRain} from './IntroduceHeatMap.js'

import './IntroduceHeatMap.css';

export default function IntroduceHeatMap() {
    useEffect(()=>{
        let chartInstance = echarts.init(document.getElementById("rain"));
        showRain(chartInstance, 'http://localhost:8080/provinceRain.json');
    }, []);
    return <section className="heatmap" id="rain"></section>;
}
