import React, {useEffect} from 'react';
import * as echarts from 'echarts';

import {showIndustry} from './LargeScreenIndustry.js';

import './LargeScreenIndustry.css';

export default function LargeScreenIndustry() {
    useEffect(()=>{
        let chartInstance = echarts.init(document.getElementById('industryEmission'),"light");
        showIndustry(chartInstance, 'http://localhost:8080/industry.json');
    }, []);
    return <section className="industry" id="industryEmission"></section>;
}
