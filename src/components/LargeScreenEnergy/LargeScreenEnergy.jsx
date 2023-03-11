import {} from "./LargeScreenEnergy.js"

import "./LargeScreenEnergy.css";
import {useEffect} from "react";
import * as echarts from "echarts";
import {showEnergy} from "./LargeScreenEnergy.js";
import PubSub from "pubsub-js";


export default function LargeScreenEnergy() {
    useEffect(()=>{
        let chartInstance = echarts.init(document.getElementById('energy'),"light");
        showEnergy(chartInstance, 'http://localhost:8080/2018carbon.json');
        chartInstance.on('click', (e)=>{
            PubSub.publish('yearToggle', {year: new Date(e.data[0]).getFullYear()});
        });
    }, []);

    return <section className="line" id="energy"></section>;
}
