import React, {useEffect} from 'react';
import * as echarts from 'echarts';
import PubSub from 'pubsub-js';

import {showPmAndTem} from './IntroducePmAndTem.js'

import './IntroducePmAndTem.css';

export default function IntroducePmAndTem() {
    useEffect(()=>{
        let chartInstance = echarts.init(document.getElementById("scatter"));
        showPmAndTem(chartInstance, 'http://localhost:8080/2010provinceData.json', 2010);/*加上数据*/
        let token = PubSub.subscribe('yearToggle2',(_, data)=>{
            showPmAndTem(chartInstance, `http://localhost:8080/${data.year}provinceData.json`, data.year);/*在此更换数据*/
        });
        return ()=>{
            PubSub.unsubscribe(token);
        }
    }, []);
    return <section className="pm" id="scatter"></section>;
}
