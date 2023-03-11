import React, {useEffect} from 'react';
import * as echarts from 'echarts';
import PubSub from 'pubsub-js';

import {
    initChart,
    setClick,
    showGdpCarbonTreemap,
    showPersonCarbonTreemap,
    showPmTreemap,
    showSumCarbonTreemap,
} from "./LargeScreenTreemap.js"

import "./LargeScreenTreemap.css";


export default function LargeScreenTreemap() {
    useEffect(()=>{
        initChart();
        setClick();
        let chartInstance1 = echarts.init(document.getElementById('pm'),"light");
        let chartInstance2 = echarts.init(document.getElementById('personCarbon'),"light");
        let chartInstance3 = echarts.init(document.getElementById('gdpCarbon'),"light");
        let chartInstance4 = echarts.init(document.getElementById('sumCarbon'),"light");
        showPmTreemap(chartInstance1, 'http://localhost:8080/2020carbon.json',2020);
        showPersonCarbonTreemap(chartInstance2, 'http://localhost:8080/2020carbon.json',2020);
        showGdpCarbonTreemap(chartInstance3, 'http://localhost:8080/2020carbon.json',2020);
        showSumCarbonTreemap(chartInstance4, 'http://localhost:8080/2020carbon.json',2020);
        let token = PubSub.subscribe('yearToggle', (_, data) => {
            showPmTreemap(chartInstance1,`http://localhost:8080/${data.year}carbon.json`,data.year)
            showPersonCarbonTreemap(chartInstance2,`http://localhost:8080/${data.year}carbon.json`,data.year)
            showGdpCarbonTreemap(chartInstance3,`http://localhost:8080/${data.year}carbon.json`,data.year)
            showSumCarbonTreemap(chartInstance4,`http://localhost:8080/${data.year}carbon.json`,data.year)
        });
    }, []);
    return (
        <section className="treemap">
            <section className="tab-item" id='tablist'>
                <section id='sumCarbonTitle'>总碳排放量</section>
                <section id='personCarbonTitle'>人均碳排放量</section>
                <section id='gdpCarbonTitle'>单位GDP碳排放</section>
                <section id='pmTitle'>PM2.5</section>
            </section>
            <section className="tab-content" id="chartlist">
                <section id='sumCarbon' className='chart'/>
                <section id='personCarbon' className='chart'/>
                <section id='gdpCarbon' className='chart'/>
                <section id='pm' className='chart'/>
            </section>
        </section>
    );
}
