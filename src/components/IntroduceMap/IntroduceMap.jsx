import React, {useEffect} from 'react';
import * as echarts from 'echarts';
import PubSub from 'pubsub-js';

import {showMap} from './IntroduceMap.js'

import './IntroduceMap.css';


export default function IntroduceMap() {
    useEffect(()=>{
        let chartInstance = echarts.init(document.getElementById("china"));
        showMap(chartInstance, 'http://localhost:8080/china.json', "http://localhost:8080/geoMap.json", "http://localhost:8080/chinaCarbon.json");
        /*跳转页面*/
        chartInstance.on('click', function (params){
            if(params.name.replace("省", "") === "山东"){
                window.location.href='http://localhost:3000/#/Home';
                PubSub.publish('changeHeader', {page: 1});
            }
        });
        chartInstance.on('click', function (params){
            // console.log(params);
            if(params.componentType === "timeline"){
                PubSub.publish('yearToggle2', {year: params.name});
            }
        });
    }, []);

    return <section className="map" id="china"></section>;
}
