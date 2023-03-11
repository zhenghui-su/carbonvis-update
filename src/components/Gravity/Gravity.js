import L from 'leaflet';
import axios from 'axios';
import * as echarts from 'echarts';

const color = ['#0099CC', '#99CC99', '#FF9900', '#FFCC99', '#CC9933', '#666699', '#993399', '#33CC33', '#336699', '#99CCFF', '#CCFF66', '#333333', '#FFCC33'];
let xName = null;

// export const loadMap = ()=>{
//     let map = L.map('gravity_map').setView([36.40, 117], 6);
//     // 'http://wprd0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7'
//     L.tileLayer('https://api.mapbox.com/styles/v1/smallma/cl06fupgu00kw15oa4pq4y9i3/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic21hbGxtYSIsImEiOiJja3lxeTRwdGUwaHpnMnV0Z2puN3hqY2Y4In0.JPUf6RG-a2zrvBVsyKLAFA').addTo(map);
//     return map;
// };

export const drawFrechetdistBar = async (dataUrl)=>{
    let chart = echarts.init(document.getElementById('frechetdist'));
    let data = await axios.get(dataUrl);
    xName = Object.keys(data.data);
    chart.setOption({
        toolbox: {
            top: '10%'
        },
        brush: {
            toolbox: ['lineX'],
            throttleType: 'debounce',
            throttleDelay: 1
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: xName,
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                interval: 0,
                rotate: 30
            }
        },
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Direct',
                type: 'bar',
                barWidth: '60%',
                data: Object.values(data.data),
                itemStyle: {
                    normal: {
                        color: (params)=>{
                            return color[params.dataIndex]
                        }
                    }
                }
            }
        ]
    });
    chart.on('brushEnd', (params)=>{
        console.log(params.areas[0].range[0]);
        console.log(chart.convertToPixel('grid', params.areas[0].range));
    });
    return xName;
};