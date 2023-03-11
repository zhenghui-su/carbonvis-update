import React, {useEffect, useRef} from 'react';
import * as echarts from 'echarts';
import { Input } from 'antd';

import PubSub from 'pubsub-js';

import {drawLineChart} from './TemRain.js';
import './TemRain.css';

const { Search } = Input;

export default function TemRain() {
    const containerStore = useRef(null);

    useEffect(()=>{
        let container = echarts.init(document.getElementById('line_chart'));
        containerStore.current = container;
        drawLineChart(container, 'http://localhost:8080/cityList.json', 'http://localhost:8080/2017tem.json', 'http://localhost:8080/2017rain.json');
    }, []);

    return (
    <section className="temRain">
        <section className="titleBox">
            <h1 className="title">各区县降雨量和气温</h1>
            <Search placeholder="2017年" style={{ width: 200 }} onSearch={(year)=>{
                PubSub.publish('updateLayer', year);
                containerStore.current.clear();
                drawLineChart(containerStore.current, 'http://localhost:8080/cityList.json', `http://localhost:8080/${year}tem.json`, `http://localhost:8080/${year}rain.json`);
            }}/>
        </section>
        <section className="lineChart" id="line_chart"></section>
    </section>
    )
}