import * as echarts from 'echarts'
import axios from 'axios';

export const bindEventForChart = (chartInstance, eventName, handleFun)=>{
    chartInstance.on(eventName, handleFun);
};

export const getChartInstance = (id, isLoading)=>{
    let chartInstance = echarts.init(document.getElementById(id));
    isLoading && chartInstance.showLoading();
    return chartInstance;
};

export const showGeoJson = async (chartInstance, geoUrl, dataUrl, whichYear, level, areaName)=>{
    let geoJson = await axios.get(geoUrl),
        data = await axios.get(dataUrl);
    chartInstance.hideLoading();
    echarts.registerMap('SD', geoJson.data);
    chartInstance.setOption(
        {
            title: {
                text: `${whichYear}年${areaName}碳排放区域分布`,
                left: 'center',
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}<br/>{c}(Mt)'
            },
            visualMap: {
                min: 1,
                max: level === 1 ? 85 : 15,
                text: ['High(Mt)', 'Low'],
                realtime: false,
                calculable: true,
                inRange:{
                    color: ['#5ee7fd','#b49dca']/*渐变颜色*/
                },
                // inRange: {
                //     color: ['lightskyblue', 'yellow', 'orangered']
                // }
            },
            series: [
                {
                    type: 'map',
                    map: 'SD',
                    label: {
                        show: true
                    },
                    data: data.data[whichYear]
                }
            ]
        }
    );
};
