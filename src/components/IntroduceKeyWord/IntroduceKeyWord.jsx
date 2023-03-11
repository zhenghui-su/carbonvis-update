import React, {useEffect} from 'react';
import * as echarts from 'echarts';
import PubSub from 'pubsub-js';

import {showKeyWord} from './IntroduceKeyWord.js'

import './IntroduceKeyWord.css'

export default function IntroduceKeyWord() {
    useEffect(()=>{
        let chartInstance = echarts.init(document.getElementById("keyword"));
        showKeyWord(chartInstance);/*改数据*/
    }, []);
    return <section className="key" id="keyword"></section>;
}
